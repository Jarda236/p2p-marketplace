import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../client";
import { Request, Response, NextFunction } from 'express';
import { User } from "../../models";
import { UserRepository } from "../../repository";
require('dotenv').config();

export interface AuthenticatedRequest extends Request {
    user?: User; 
  }

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const userId = decoded.userId;

      const user = await UserRepository.getSingle(userId);

      if(user.isErr){
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user.value!;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  