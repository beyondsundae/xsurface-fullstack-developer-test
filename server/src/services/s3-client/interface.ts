export type UploadImageToS3Payload = {
  bucket: string;
  key: string;
};

export type S3ParamsPayload = {
  Key?: string;
  Bucket?: string;
};

export type S3DeletedResult = {
  key?: string;
  status: boolean;
};

export type S3UploadPayload = {
  file: Express.Multer.File | undefined;
  payload: UploadImageToS3Payload;
};
