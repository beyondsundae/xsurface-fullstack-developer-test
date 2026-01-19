import { Sorting } from "@/utils/utils.js";
import type { QueryFilter, QueryOptions } from "mongoose";
import ProductModel from "../../models/products/products.model.js";
import type { Product } from "../../models/products/products.schema.js";
import type { IProductInput } from "./interface.js";

export const getProduct = async (
  code: string,
  options?: QueryOptions
): Promise<Product | null> => {
  if (!code) throw new Error("code not found");

  const result = await ProductModel.findOne({ code }, options);
  return result;
};

export const findProducts = async (
  filter: QueryFilter<Product>,
  options?: QueryOptions
): Promise<Product[]> => {
  try {
    if (Object.keys(filter).length) {
      const searchTextArray =
        filter?.["$or"]?.find((each: any) => each?.searchText)?.[
          "searchText"
        ]?.["$in"] || [];

      const cleanTextArray: string[] = [];
      const rawMappedSearchText = searchTextArray
        .map((each: string) => {
          const textWithRemovedSymbol = each
            .toString()
            .replace("/", "")
            .replace("/i", "")
            .trim();

          const textEndClean = textWithRemovedSymbol.split("-")[0] as string;

          cleanTextArray.push(textEndClean);
          return textWithRemovedSymbol;
        })
        .filter((each: string) => String(each).length > 2)
        .map((each: string) => `.*${each}.*`);

      const mappedSearchText = [...new Set(rawMappedSearchText)];

      const searchStage = {
        $search: {
          index: "product_advance_search",
          compound: {
            should: [
              {
                regex: {
                  query: mappedSearchText,
                  path: ["code", "productName"],
                  allowAnalyzedField: true,
                },
              },
            ],
          },
        },
      };

      const pipeline: any[] = [
        searchStage,
        ...(options?.sort && { $sort: options?.sort ?? Sorting.DESC }),
        { $skip: options?.skip ?? 0 },
        { $limit: options?.limit ?? 20 },
      ];

      const result = await ProductModel.aggregate(pipeline, {
        maxTimeMS: 3000,
        allowDiskUse: true,
      })
        .read("secondaryPreferred")
        .exec();

      return result;
    }
  } catch (err: any) {
    console.error("⚠️ Atlas Search failed, falling back to find()", {
      message: err.message,
      code: err.code,
    });
  }

  let query = ProductModel.find({ ...filter });
  if (options?.sort) query.sort(options?.sort);
  if (options?.limit) query.limit(options?.limit);
  if (options?.skip) query.skip(options?.skip);

  const result = await query.maxTimeMS(2000)?.lean();

  return result;
};

export const findProductsMeta = async (
  filter: QueryFilter<Product>,
  options?: QueryOptions
): Promise<Number> => {
  let query = ProductModel.find({ ...filter });
  if (options?.limit) query.limit(options?.limit);
  if (options?.skip) query.skip(options?.skip);
  if (options?.sort) query.sort(options?.sort);

  const result = await query?.countDocuments().maxTimeMS(2000); //.lean()

  return result;
};

export const createProduct = async (
  payload: IProductInput
): Promise<Product> => {
  const result = await ProductModel.create({ ...payload });
  return result;
};

export const updateProduct = async ({}) => {
  return;
};

export const deleteProducts = async ({}) => {
  return;
};
