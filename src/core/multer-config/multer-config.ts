import { Request } from "express";
import multer, { diskStorage, FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const storage = diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "./images/");
  },

  filename: (
    request: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(
      null,
      new Date().toISOString().replace(/:|\./g, "") + "-" + file.originalname
    );
  },
});

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Invalid file type: " + file.mimetype));
  }
};

export const limits = {
  fileSize: 1024 * 1024 * 8,
};

export const uploadFile = multer({ storage, limits, fileFilter });
