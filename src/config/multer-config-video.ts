import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multimedia/");
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomUUID() + ".mp4");
    return;
  },
});

const MAX_SIZE = 60 * 1024 * 1024; // 3mb

export const uploadVideo = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowwedVideoMimetypes = ["video/mp4"];

    const size: string = req.headers["content-length"] as string;

    if (parseInt(size) > MAX_SIZE) {
      cb(null, false);
      return;
    }

    if (allowwedVideoMimetypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
  limits: { fieldSize: MAX_SIZE },
});
