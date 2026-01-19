import axios, { AxiosRequestConfig } from "axios";
import { FieldType } from "../containers/products/create";

export const useS3Hooks = () => {
  const uploadS3fileApi = async ({ formData }: { formData: unknown }) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3-client/upload`,
      formData
    );
  };

  const deleteS3fileApi = async ({ key }: { key: string }) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3-client/delete`,
      {
        Bucket: process.env.NEXT_PUBLIC_BUCKET!,
        Key: key,
      }
    );
  };

  return { uploadS3fileApi, deleteS3fileApi };
};

export const useApiHooks = () => {
  const createProductApi = async ({
    uploadedURL,
    values,
  }: {
    uploadedURL: string[];
    values: FieldType;
  }) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/create`,
      {
        images: uploadedURL,
        ...values,
      }
    );
  };

  const findProducts = async ({
    formatQueryString,
    formatFilterSearch,
  }: {
    formatQueryString?: unknown | any;
    formatFilterSearch?: unknown | any;
  }) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products${formatQueryString}`,
      {
        ...(formatFilterSearch && {
          filter: JSON.stringify(formatFilterSearch),
        }),
      } as unknown as AxiosRequestConfig<unknown>
    );
  };

  return { createProductApi, findProducts };
};
