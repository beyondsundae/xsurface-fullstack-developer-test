import {
  deleteImageFromS3,
  uploadImageToS3,
} from "@/services/s3-client/s3-client.services.js";
import {
  Router,
  type Router as ExpressRouter,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import multer from "multer";

const router: ExpressRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const file = req?.file;

    try {
      const result = await uploadImageToS3({
        file,
        payload: { ...body },
      });

      res.send(result);
    } catch (error) {

      next(error);
    }
  }
);

router.post(
  "/delete",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const result = await deleteImageFromS3({ ...body });

      res.send(result);
    } catch (error) {

      next(error);
    }
  }
);

export default router;
