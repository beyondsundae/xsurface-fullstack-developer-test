import type { IProductFilterInput } from "../services/products/interface.js";

export interface IQueryOptions {
  currentPage?: string;
  pageLimit?: string;
  sort?: string;
  // searchText?: string
}

export interface IMongoStringFilter {
  equal?: string;
  in?: string[];
  contains?: string;
  in_contains?: string;
}

export interface IMongoNumberFilter {
  equal?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
}

export interface IMongoDateFilter {
  equal?: Date;
  gt?: Date;
  gte?: Date;
  lt?: Date;
  lte?: Date;
}

export const formatOptionTransform = (params: IQueryOptions) => {
  let result: Record<string, string | number> = {};
  if (params?.currentPage) {
    result = {
      ...result,
      skip:
        (Number(params?.currentPage || 1) - 1) * Number(params["pageLimit"]),
    }; // 0 - 9 // by limit is 10
  }

  if (params?.pageLimit) {
    result = { ...result, limit: Number(params?.pageLimit) };
  }

  if (params?.sort) {
    result = { ...result, sort: params?.sort };
  }

  return result;
};

export const formatFilterTransform = (filter: IProductFilterInput) => {
  let result: Record<string, any> = {};

  if (filter?.OR) {
    result = {
      ...result,
      $or: filter?.OR?.map((each) => formatFilterTransform(each)),
    };
  }

  if (filter?.code) {
    result = {
      ...result,
      code: mongooseStringFilterTransform(filter?.code),
    };
  }

  if (filter?.productName) {
    result = {
      ...result,
      productName: mongooseStringFilterTransform(filter?.productName),
    };
  }

  if (filter?.searchText) {
    result = {
      ...result,
      searchText: mongooseStringFilterTransform(filter?.searchText),
    };
  }

  if (filter?.price) {
    result = {
      ...result,
      price: mongooseNumberFilterTransform(filter?.price),
    };
  }

  // if(params?.searchText){
  //     result = {...result, searchText: params?.searchText}
  // }

  return result;
};

export const mongooseNumberFilterTransform = (
  filter: IMongoNumberFilter
): Record<string, number> => {
  let mongooseFilter: Record<string, number> = {};

  if (filter?.equal) {
    mongooseFilter = { ...mongooseFilter, $eq: filter.equal };
  }
  if (filter?.gt) {
    mongooseFilter = { ...mongooseFilter, $gt: filter.gt };
  }
  if (filter?.gte) {
    mongooseFilter = { ...mongooseFilter, $gte: filter.gte };
  }
  if (filter?.lt) {
    mongooseFilter = { ...mongooseFilter, $lt: filter.lt };
  }
  if (filter?.lte) {
    mongooseFilter = { ...mongooseFilter, $lte: filter.lte };
  }

  return mongooseFilter;
};

export const mongooseDateFilterTransform = (
  filter: IMongoDateFilter
): Record<string, Date> => {
  let mongooseFilter: Record<string, Date> = {};

  if (filter?.equal) {
    mongooseFilter = { ...mongooseFilter, $eq: filter.equal };
  }
  if (filter?.gt) {
    mongooseFilter = { ...mongooseFilter, $gt: filter.gt };
  }
  if (filter?.gte) {
    mongooseFilter = { ...mongooseFilter, $gte: filter.gte };
  }
  if (filter?.lt) {
    mongooseFilter = { ...mongooseFilter, $lt: filter.lt };
  }
  if (filter?.lte) {
    mongooseFilter = { ...mongooseFilter, $lte: filter.lte };
  }

  return mongooseFilter;
};

export const getRegExp = (value: string) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
};

export const mongooseStringFilterTransform = (
  filter: IMongoStringFilter
): Record<string, string | string[] | RegExp | any> => {
  let mongooseFilter: Record<string, string | string[] | RegExp | RegExp[]> =
    {};

  if (filter?.equal) {
    mongooseFilter = { ...mongooseFilter, $eq: filter?.equal };
  }
  if (filter?.in) {
    mongooseFilter = { ...mongooseFilter, $in: filter?.in };
  }

  if (filter?.contains) {
    mongooseFilter = {
      ...mongooseFilter,
      $regex: getRegExp(filter.contains),
    };
  }

  if (filter?.in_contains) {
    const textArray = filter.in_contains
      .trim()
      .split(" ")
      .join(",")
      .trim()
      .split(",")
      .filter((each) => each.trim())
      .map((each) => getRegExp(each));

    mongooseFilter = {
      ...mongooseFilter,
      $in: [...textArray],
    };
  }

  return mongooseFilter;
};
