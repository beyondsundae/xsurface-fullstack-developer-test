"use server";

import {
    DeleteObjectCommand,
    DeleteObjectCommandOutput,
    GetObjectCommand,
    ListObjectsV2Command,
    ListObjectsV2CommandOutput,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// export default async function s3Url(req, res) {
//   const url = await generateUploadUrl();
//   res.send({ url });
// }

type UploadImageToS3Payload = {
  bucket: string;
  key: string;
};

type S3ParamsPayload = {
  Key?: string;
  Bucket?: string;
};

export async function getAllObjectsSignedUrls({
  Bucket,
}: S3ParamsPayload): Promise<{ key: string; url: string }[]> {

  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    // List all objects in the bucket
    const listCommand = new ListObjectsV2Command({ Bucket });

    const listObjectsOutput: ListObjectsV2CommandOutput = await s3.send(
      listCommand
    );

    const signedUrls = await Promise.all(
      (listObjectsOutput.Contents || []).map(async (object) => {
        if (object.Key) {
          const getObjectCommand = new GetObjectCommand({
            Bucket,
            Key: object.Key,
          });
          const url = await getSignedUrl(s3, getObjectCommand, {
            expiresIn: 3600,
          });
          return { key: object.Key, url };
        }
        return null;
      })
    );

    // Filter out any null results (in case an object didn't have a Key for some reason)
    return signedUrls.filter(
      (item): item is { key: string; url: string } => item !== null
    );
  } catch (error) {
    console.error("Error retrieving objects from S3:", error);
    throw new Error(`Failed to upload image to S3. ${error}`);
  }
}

export async function uploadImageToS3(
  formData: FormData,
  payload: UploadImageToS3Payload
): Promise<string> {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const { bucket, key } = payload;
  const result: string[] = [];

  try {
    const files = formData.getAll("file") as File[];

    const response = (await Promise.all(
      files
        .map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          const fileUploadParams = {
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: file.type,
          };

          const imageParam = new PutObjectCommand(fileUploadParams);
          const test = await s3.send(imageParam);
          const { $metadata } = test || {};
          const { httpStatusCode, totalRetryDelay, attempts } = $metadata || {};

          if (httpStatusCode === 200) {
            const combinedURL = `${process.env.NEXT_PUBLIC_BUCKET_PRODUCTS_BASE_URL}/${key}`;
            return combinedURL;
          }

          return result;
        })
        ?.flatMap((each) => each)
    )) as string[];

    // revalidatePath("/");
    return response?.[0];
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw new Error(`Failed to upload image to S3. ${error}`);
  }
}

export async function deleteImageFromS3({
  Bucket,
  Key,
}: S3ParamsPayload): Promise<DeleteObjectCommandOutput> {
  const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new DeleteObjectCommand({ Bucket, Key });

  console.log(command);

  try {
    const res = await s3.send(command);
    // revalidatePath("/");

    console.log(res);
    return res;
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw new Error(`Failed to upload image to S3. ${error}`);
  }
}
