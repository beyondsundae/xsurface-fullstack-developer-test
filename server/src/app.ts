import "dotenv/config";
import type { Application, Request, Response } from "express";
import express from "express";
import { connectDB } from "./config/db.js";
import { registerMiddlewares } from "./middlewares/index.js";

const app: Application = express();

await connectDB();

/* -------------------------------- register -------------------------------- */
registerMiddlewares(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

const port = process.env.PORT;
app.listen(port, () => {});
