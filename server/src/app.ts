import express from 'express';
import type { Request, Response, Application } from 'express';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { registerMiddlewares } from './middlewares/index.js';
import { registerRoutes } from './routes/index.js';

const app: Application = express();

await connectDB();

/* -------------------------------- register -------------------------------- */
registerMiddlewares(app);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
