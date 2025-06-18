
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;
    console.log(token);
    

    if (!token) {
      res.status(401).send({ success: false, message: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECKEY as string);
    req.user = decoded;
    console.log(req.user+'middleware');
    

    next();
  } catch (error) {
    res.status(401).send({ success: false, message: 'Invalid token' });
  }
};
