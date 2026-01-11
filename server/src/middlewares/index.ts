import { registerRoutes } from "@/routes/index.js";
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`[loggerMiddleware] ${req.method} ${req.url}`);
  next();
};

export function registerMiddlewares(app: Application): void {
  app.use(express.json());
  app.use(loggerMiddleware);
  registerRoutes(app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('[registerMiddlewares] err')
    console.error(err);

    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  });
}
