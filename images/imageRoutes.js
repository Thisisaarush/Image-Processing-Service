const express = require("express")
const authMiddleware = require("../auth/authMiddleware")
const multer = require("multer")
const {
  uploadImageController,
  transformImageController,
  getImageController,
  deleteImageController,
  listImagesController,
} = require("./imageController")

const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Routes for images
router.get("/", authMiddleware, listImagesController)
router.get("/:id", getImageController)
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadImageController
)
router.post("/transform/:id", authMiddleware, transformImageController)
router.delete("/:id", authMiddleware, deleteImageController)

module.exports = router
