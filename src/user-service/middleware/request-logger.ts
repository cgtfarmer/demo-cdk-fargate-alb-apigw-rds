import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.originalUrl}`);

  next();
}

export default requestLogger;