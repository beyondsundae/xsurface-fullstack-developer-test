import type { IProductFilterInput } from "@/services/products/interface.js";
import {
  createProduct,
  findProducts,
  getProduct,
} from "@/services/products/products.service.js";
import {
  formatFilterTransform,
  formatOptionTransform,
  type IQueryOptions,
} from "@/utils/utils.js";
import {
  Router,
  type Request,
  type Response,
  type Router as ExpressRouter,
  type NextFunction,
} from "express";

const router: ExpressRouter = Router();

router.get(
  "/:code",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req?.params?.code as string;

    try {
      const result = await getProduct(code);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/find", async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.body as IProductFilterInput;
  const options = req.query as IQueryOptions;

  try {
    console.log("[/find] 🔥 filters", filters);
    console.log("[/find] 🤖 options", options);

    const formattedFilter = formatFilterTransform(filters);
    const formattedOption = formatOptionTransform(options);
    console.log(
      " formattedFilter %s formattedOption %s",
      formattedFilter,
      formattedOption
    );

    const result = await findProducts(formattedFilter, formattedOption);
    console.log("🍩 test", result);

    res.json(result);
  } catch (error) {
    console.log("🐿️ error", error);

    next(error);
  }
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    console.log("[/createProduct] 🦆 body", body);

    try {
      const test = await createProduct({ ...body });
      console.log("[/create-product] 🍕 test", test);

      res.send("post create-product");
    } catch (error) {
      console.log("🐿️ error", error);

      next(error);
    }
  }
);

// update, delete

export default router;
