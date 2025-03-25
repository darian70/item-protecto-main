import { Router, RequestHandler } from 'express';
import { z } from 'zod';
import { protect } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Validation schemas
const warrantySchema = z.object({
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  type: z.string(),
  provider: z.string(),
  terms: z.string().optional(),
  productId: z.string(),
});

type WarrantyBody = z.infer<typeof warrantySchema>;

// Create warranty
const createWarranty: RequestHandler<{}, {}, WarrantyBody> = async (req, res) => {
  try {
    const warrantyData = warrantySchema.parse(req.body);

    // Check if product exists and belongs to user
    const product = await prisma.product.findFirst({
      where: {
        id: warrantyData.productId,
        userId: req.user!.id,
      },
    });

    if (!product) {
      res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
      return;
    }

    // Check if warranty already exists for this product
    const existingWarranty = await prisma.warranty.findUnique({
      where: {
        productId: warrantyData.productId,
      },
    });

    if (existingWarranty) {
      res.status(400).json({
        error: {
          message: 'Warranty already exists for this product',
          status: 400,
        },
      });
      return;
    }

    const warranty = await prisma.warranty.create({
      data: {
        ...warrantyData,
        userId: req.user!.id,
      },
    });

    res.status(201).json(warranty);
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
        message: 'Error creating warranty',
        status: 500,
      },
    });
  }
};

// Get warranty details
const getWarranty: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    const warranty = await prisma.warranty.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
      include: {
        product: true,
      },
    });

    if (!warranty) {
      res.status(404).json({
        error: {
          message: 'Warranty not found',
          status: 404,
        },
      });
      return;
    }

    res.json(warranty);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching warranty',
        status: 500,
      },
    });
  }
};

// Update warranty
const updateWarranty: RequestHandler<{ id: string }, {}, WarrantyBody> = async (req, res) => {
  try {
    const { id } = req.params;
    const warrantyData = warrantySchema.parse(req.body);

    // Check if warranty exists and belongs to user
    const existingWarranty = await prisma.warranty.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!existingWarranty) {
      res.status(404).json({
        error: {
          message: 'Warranty not found',
          status: 404,
        },
      });
      return;
    }

    // Check if product exists and belongs to user
    const product = await prisma.product.findFirst({
      where: {
        id: warrantyData.productId,
        userId: req.user!.id,
      },
    });

    if (!product) {
      res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
      return;
    }

    const warranty = await prisma.warranty.update({
      where: { id },
      data: warrantyData,
      include: {
        product: true,
      },
    });

    res.json(warranty);
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
        message: 'Error updating warranty',
        status: 500,
      },
    });
  }
};

// Delete warranty
const deleteWarranty: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if warranty exists and belongs to user
    const warranty = await prisma.warranty.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!warranty) {
      res.status(404).json({
        error: {
          message: 'Warranty not found',
          status: 404,
        },
      });
      return;
    }

    await prisma.warranty.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error deleting warranty',
        status: 500,
      },
    });
  }
};

// Routes
router.use(protect as RequestHandler);
router.post('/', createWarranty);
router.get('/:id', getWarranty);
router.put('/:id', updateWarranty);
router.delete('/:id', deleteWarranty);

export default router;