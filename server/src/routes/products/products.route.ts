import type {
  IProductFilterInput,
  ResultFindProduct,
} from "@/services/products/interface.js";
import {
  createProduct,
  findProducts,
  findProductsMeta,
  getProduct,
} from "@/services/products/products.service.js";
import {
  formatFilterTransform,
  formatOptionTransform,
  type IQueryOptions,
} from "@/utils/utils.js";
import {
  Router,
  type Router as ExpressRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const router: ExpressRouter = Router();

router.get(
  "/:code/show",
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

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const filters = JSON.parse(req.body?.filter) as IProductFilterInput;
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

    const result = (await findProducts(formattedFilter, formattedOption).then(
      async (data) => {
        const meta = await findProductsMeta(
          { ...(Object.keys(formattedFilter)?.length && formattedFilter) },
          { ...(Object.keys(formattedFilter)?.length && formattedOption) }
        );


        return { products: data, count: meta };
      }
    )) as ResultFindProduct;

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

    try {
      const result = await createProduct({ ...body });

      res.send(result);
    } catch (error) {

      next(error);
    }
  }
);

// update, delete

export default router;
