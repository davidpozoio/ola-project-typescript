import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multimedia/");
  },
  filename: (req, file, cb) => {
    file.mimetype;
    cb(null, crypto.randomUUID() + ".jpg");
  },
});

const MAX_SIZE = 3 * 1024 * 1024; // 3mb

export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
  limits: { fieldSize: MAX_SIZE },
});
