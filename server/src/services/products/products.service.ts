import ProductModel from "../../models/products/products.model.js";
import type { IProductInput } from "./interface.js";
import type { QueryFilter, HydratedDocument, QueryOptions } from "mongoose";
import type { Product } from "../../models/products/products.schema.js";

export const getProduct = async (
  code: string,
  options?: QueryOptions
): Promise<Product | null> => {
  if (!code) throw new Error("code not found");

  const result = await ProductModel.findOne({ code }, options);
  console.log("[getProduct] 🚀 result", result);
  return result;
};

export const findProducts = async (
  filter: QueryFilter<Product>,
  options?: QueryOptions
): Promise<Product[]> => {
  console.log("🦜 filter: %s and  options: %s", {}, options);
  console.dir(filter, { depth: null });

  let query = ProductModel.find({ ...filter });
  if (options?.limit) query.limit(options?.limit);
  if (options?.skip) query.skip(options?.skip);
  if (options?.sort) query.sort(options?.sort);

  const result = await query.maxTimeMS(2000); //.lean()
  console.log("🍤 result", result);

  return result;
};

export const createProduct = async (
  payload: IProductInput
): Promise<Product> => {
  console.log("[createProduct] 🧁 payload", payload);
  const result = await ProductModel.create({ ...payload });
  console.log("[createProduct] 🥐 result", result);
  return result;
};

export const updateProduct = async ({}) => {
  return;
};

export const deleteProducts = async ({}) => {
  return;
};
