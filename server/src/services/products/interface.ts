import type { Product } from "@/models/products/products.schema.js";
import type { IMongoNumberFilter, IMongoStringFilter } from "@/utils/utils.js";
import type { Model } from "mongoose";

export interface IProductInput {
  isActive: boolean;
  images: string[];
  productName: string;
  code: string;
  price: number;
  categories?: string[];
  attributes?: string[];
  unit: string;
  description: string;
  dimension: IDimensionInput;
  weight: number;
}
export interface IDimensionInput {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface IProductFilterInput {
  OR?: [IProductFilterInput];
  productName?: IMongoStringFilter;
  code?: IMongoStringFilter;
  price?: IMongoNumberFilter;
  searchText?: IMongoStringFilter;
  // dimension: DimensionInput;
  // weight: number;
}
//   export interface DimensionInput {
//     length: number;
//     width: number;
//     height: number;
//     unit: string;
//   }

export interface ResultFindProduct {
  products: Model<Product>[]
  count: number
}