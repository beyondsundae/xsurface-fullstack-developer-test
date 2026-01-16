// Remove .js extension
import { uploadImageToS3 } from "./s3-client.services.js";

describe('uploadImageToS3', () => {
  it('throws when no file is provided', async () => {
    await expect(
      uploadImageToS3({
        file: undefined,
        payload: { bucket: 'test-bucket', key: 'products/test.jpg' },
      })
    ).rejects.toThrow('No file provided for upload');
  });
});