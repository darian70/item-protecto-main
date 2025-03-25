import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions, JwtPayload as BaseJwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../index';

interface CustomJwtPayload extends BaseJwtPayload {
  userId: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: parseInt(env.JWT_EXPIRES_IN, 10) || '7d',
  };
  return jwt.sign({ userId }, env.JWT_SECRET as Secret, options);
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Not authorized to access this route',
          status: 401,
        },
      });
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET as Secret) as CustomJwtPayload;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (!user) {
      return res.status(401).json({
        error: {
          message: 'User not found',
          status: 401,
        },
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Not authorized to access this route',
        status: 401,
      },
    });
  }
};

// Optional auth middleware - doesn't require authentication but will add user to request if token is valid
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, env.JWT_SECRET as Secret) as CustomJwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true },
    });

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    next();
  }
};