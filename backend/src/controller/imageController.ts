import { Router } from "express";
import path from "path";
import express, { Request, Response } from "express";
import { Multer } from "multer";
import multer from "multer";

const router = Router();

//app.use(express.json());

const storage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "./images"); // Replace with the actual path to store the uploaded files
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload: Multer = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size: 5MB
  },
});

router.post(
  "/",
  upload.single("image"),
  function (req: Request, res: Response) {
    const imagePath = req.file?.path;
    if (imagePath) {
      res.json({ path: imagePath.substring(7) });
    } else {
      res.status(400).json({ error: "Image upload failed" });
    }
  }
);

router.get("/:filename", function (req: Request, res: Response) {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../../images", filename);
  res.sendFile(filePath);
});

export default router;
