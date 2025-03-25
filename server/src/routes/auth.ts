import { Router, RequestHandler } from 'express';
import { hash, compare } from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../index';
import { generateToken } from '../middleware/auth';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string(),
});

type RegisterBody = z.infer<typeof registerSchema>;
type LoginBody = z.infer<typeof loginSchema>;

// Register user
const registerHandler: RequestHandler<{}, {}, RegisterBody> = async (req, res) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        error: {
          message: 'User already exists',
          status: 400,
        },
      });
      return;
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      user,
      token,
    });
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

    res.status(500).json({
      error: {
        message: 'Error creating user',
        status: 500,
      },
    });
  }
};

// Login user
const loginHandler: RequestHandler<{}, {}, LoginBody> = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        error: {
          message: 'Invalid credentials',
          status: 401,
        },
      });
      return;
    }

    // Check password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        error: {
          message: 'Invalid credentials',
          status: 401,
        },
      });
      return;
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
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

    res.status(500).json({
      error: {
        message: 'Error logging in',
        status: 500,
      },
    });
  }
};

// Routes
router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;