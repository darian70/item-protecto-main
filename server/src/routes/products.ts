import { Router, RequestHandler } from 'express';
import { z } from 'zod';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { protect } from '../middleware/auth';
import { prisma } from '../index';
import { env } from '../config/env';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Validation schemas
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  purchaseDate: z.string().transform(str => new Date(str)),
  price: z.number().positive('Price must be positive'),
});

type ProductBody = z.infer<typeof productSchema>;

// Create product
const createProduct: RequestHandler<{}, {}, ProductBody> = async (req, res) => {
  try {
    const productData = productSchema.parse(req.body);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const product = await prisma.product.create({
      data: {
        ...productData,
        imageUrl,
        userId: req.user!.id,
      },
      include: {
        warranty: true,
      },
    });

    res.status(201).json(product);
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
        message: 'Error creating product',
        status: 500,
      },
    });
  }
};

// Get user's products
const getUserProducts: RequestHandler = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        warranty: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error fetching products',
        status: 500,
      },
    });
  }
};

// Update product
const updateProduct: RequestHandler<{ id: string }, {}, ProductBody> = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = productSchema.parse(req.body);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Check if product exists and belongs to user
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        userId: req.user!.id,
      },
    });

    if (!existingProduct) {
      res.status(404).json({
        error: {
          message: 'Product not found',
          status: 404,
        },
      });
      return;
    }

    // Delete old image if new one is uploaded
    if (imageUrl && existingProduct.imageUrl) {
      const oldImagePath = path.join(env.UPLOAD_DIR, path.basename(existingProduct.imageUrl));
      await fs.unlink(oldImagePath).catch(() => {});
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(imageUrl && { imageUrl }),
      },
      include: {
        warranty: true,
      },
    });

    res.json(product);
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
        message: 'Error updating product',
        status: 500,
      },
    });
  }
};

// Delete product
const deleteProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists and belongs to user
    const product = await prisma.product.findFirst({
      where: {
        id,
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

    // Delete product image if exists
    if (product.imageUrl) {
      const imagePath = path.join(env.UPLOAD_DIR, path.basename(product.imageUrl));
      await fs.unlink(imagePath).catch(() => {});
    }

    // Delete product and associated warranty
    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Error deleting product',
        status: 500,
      },
    });
  }
};

// Ensure uploads directory exists
fs.mkdir(env.UPLOAD_DIR, { recursive: true }).catch(() => {});

// Routes
router.use(protect as RequestHandler); // Type assertion for middleware
router.post('/', upload.single('image'), createProduct);
router.get('/', getUserProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;