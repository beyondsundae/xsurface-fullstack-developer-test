import type { Application } from "express";
import productsRouter from "./products/products.route.js";

export function registerRoutes(app: Application): void {
  app.use("/products", productsRouter);
}

