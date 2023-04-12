const express = require("express");
const router = express.Router();
const {
  getAllFiles,
  uploadFile,
  deleteFile,
} = require("../controllers/FileUploadController");
const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    return cb(null, `${req.body.file_name}`);
  },
});
const upload = multer({ storage: fileStorage });
router.get("/uploads", getAllFiles);
router.post("/uploads", upload.single("file"), uploadFile);
router.delete("/uploads/:id", deleteFile);
module.exports = router;
