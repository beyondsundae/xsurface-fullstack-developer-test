import type { IMongoNumberFilter, IMongoStringFilter } from "@/utils/utils.js";

export interface IProductInput {
  isActive: boolean;
  images: string[];
  name: string;
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
  name?: IMongoStringFilter;
  code?: IMongoStringFilter;
  price?: IMongoNumberFilter;
  // dimension: DimensionInput;
  // weight: number;
}
//   export interface DimensionInput {
//     length: number;
//     width: number;
//     height: number;
//     unit: string;
//   }
