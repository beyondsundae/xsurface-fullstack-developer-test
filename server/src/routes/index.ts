import type { Application } from "express";
import productsRouter from "./products/products.route.js";
import s3ClientRouter from "./s3-client/s3-client.route.js";

export function registerRoutes(app: Application): void {
  app.use("/products", productsRouter);
  app.use("/s3-client", s3ClientRouter);
}

