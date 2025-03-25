import { Router, RequestHandler } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';
import { protect } from '../middleware/auth';
import { prisma } from '../index';
import { env } from '../config/env';

const router = Router();
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

// Validation schemas
const chatMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  productId: z.string().optional(),
});

type ChatMessageBody = z.infer<typeof chatMessageSchema>;

interface ChatMessage {
  role: string;
  content: string;
  userId: string;
  productId?: string | null;
  createdAt: Date;
}

// Helper function to get product context
async function getProductContext(productId: string, userId: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      userId,
    },
    include: {
      warranty: true,
    },
  });

  if (!product) return null;

  return {
    name: product.name,
    description: product.description,
    purchaseDate: product.purchaseDate.toISOString(),
    warranty: product.warranty ? {
      provider: product.warranty.provider,
      type: product.warranty.type,
      startDate: product.warranty.startDate.toISOString(),
      endDate: product.warranty.endDate.toISOString(),
    } : null,
  };
}

// Send message to AI
const sendMessage: RequestHandler<{}, {}, ChatMessageBody> = async (req, res) => {
  try {
    const { content, productId } = chatMessageSchema.parse(req.body);

    // Store user message
    await prisma.chatMessage.create({
      data: {
        content,
        role: 'user',
        userId: req.user!.id,
        productId,
      },
    });

    // Get product context if productId is provided
    let context = '';
    if (productId) {
      const productContext = await getProductContext(productId, req.user!.id);
      if (productContext) {
        context = `Context: This conversation is about a product named "${productContext.name}" purchased on ${productContext.purchaseDate}.`;
        if (productContext.warranty) {
          context += ` It has a ${productContext.warranty.type} warranty from ${productContext.warranty.provider} valid from ${productContext.warranty.startDate} to ${productContext.warranty.endDate}.`;
        }
      }
    }

    // Get recent chat history
    const recentMessages = await prisma.chatMessage.findMany({
      where: {
        userId: req.user!.id,
        productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: `You are a helpful assistant for Item Protecto, a product warranty management system. ${context}` },
      ...recentMessages.reverse().map((msg: ChatMessage) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Store AI response
    const storedResponse = await prisma.chatMessage.create({
      data: {
        content: aiResponse,
        role: 'assistant',
        userId: req.user!.id,
        productId,
      },
    });

    res.json(storedResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: {
          message: error.errors[0].message,
          status: 400,
        },
      });
      return;
    }

    console.error('Chat error:', error);
    res.status(500).json({
      error: {
        message: 'Error processing chat message',
        status: 500,
      },
    });
  }
};

// Get chat history
const getChatHistory: RequestHandler<{}, {}, {}, { productId?: string }> = async (req, res) => {
  try {
    const { productId } = req.query;

    const messages = await prisma.chatMessage.findMany({
      where: {
        userId: req.user!.id,
        ...(productId && { productId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching chat history',
        status: 500,
      },
    });
  }
};

// Routes
router.use(protect as RequestHandler);
router.post('/', sendMessage);
router.get('/', getChatHistory);

export default router;