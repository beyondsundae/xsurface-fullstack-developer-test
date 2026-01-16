import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import type {
  S3DeletedResult,
  S3ParamsPayload,
  S3UploadPayload,
} from "./interface.js";

export const uploadImageToS3 = async ({
  file,
  payload,
}: S3UploadPayload): Promise<string | null> => {
  const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const { bucket, key } = payload;

  try {
    if (!file || !file.buffer) {
      throw new Error("No file provided for upload");
    }
    const fileUploadParams = {
      Bucket: bucket,
      Key: key,
      Body: file?.buffer,
      ContentType: file.mimetype,
    };

    const imageParam = new PutObjectCommand(fileUploadParams);
    const test = await s3.send(imageParam);
    const { $metadata } = test || {};
    const { httpStatusCode } = $metadata || {};

    if (httpStatusCode === 200) {
      const combinedURL = `${process.env.BUCKET_PRODUCTS_BASE_URL}/${key}`;
      return combinedURL;
    }

    return null;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw new Error(`Failed to upload image to S3. ${error}`);
  }
};

export const deleteImageFromS3 = async ({
  Bucket,
  Key,
}: S3ParamsPayload): Promise<Promise<S3DeletedResult>> => {
  const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY! as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! as string,
    },
  });
  const returnObject = {
    key: Key,
    status: false,
  } as { key: string; status: boolean };

  const command = new DeleteObjectCommand({ Bucket, Key });

  try {
    const res = await s3.send(command);

    const { $metadata } = res || {};
    const { httpStatusCode, totalRetryDelay, attempts } = $metadata || {};

    if (httpStatusCode === 204) {
      returnObject["status"] = Boolean(httpStatusCode === 204);

      return returnObject;
    }

    return returnObject;
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw new Error(`Failed to upload image to S3. ${error}`);
  }
};

// export async function getAllObjectsSignedUrls({
//     Bucket,
//   }: S3ParamsPayload): Promise<{ key: string; url: string }[]> {

//     const s3 = new S3Client({
//       region: process.env.NEXT_PUBLIC_AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
//         secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
//       },
//     });

//     try {
//       // List all objects in the bucket
//       const listCommand = new ListObjectsV2Command({ Bucket });

//       const listObjectsOutput: ListObjectsV2CommandOutput = await s3.send(
//         listCommand
//       );


//       const signedUrls = await Promise.all(
//         (listObjectsOutput.Contents || []).map(async (object) => {
//           if (object.Key) {
//             const getObjectCommand = new GetObjectCommand({
//               Bucket,
//               Key: object.Key,
//             });
//             const url = await getSignedUrl(s3, getObjectCommand, {
//               expiresIn: 3600,
//             });
//             return { key: object.Key, url };
//           }
//           return null;
//         })
//       );


//       // Filter out any null results (in case an object didn't have a Key for some reason)
//       return signedUrls.filter(
//         (item): item is { key: string; url: string } => item !== null
//       );
//     } catch (error) {
//       console.error("Error retrieving objects from S3:", error);
//       throw new Error(`Failed to upload image to S3. ${error}`);
//     }
//   }
