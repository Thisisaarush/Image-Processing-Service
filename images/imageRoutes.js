const express = require("express")
const authMiddleware = require("../auth/authMiddleware")
const multer = require("multer")
const redisClient = require("../configs/redis")
const rateLimit = require("express-rate-limit")
const RateLimitRedisStore = require("rate-limit-redis")

const {
  uploadImageController,
  transformImageController,
  getImageController,
  deleteImageController,
  listImagesController,
} = require("./imageController")

const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Rate limiting for image transformations
const transformLimiter = rateLimit({
  store: new RateLimitRedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to few transform requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})

// Rate limiting for image uploads
const uploadLimiter = rateLimit({
  store: new RateLimitRedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to few upload requests per windowMs
  message: "Too many upload requests from this IP, please try again later.",
})

// Routes for images
router.get("/", authMiddleware, listImagesController)
router.get("/:id", getImageController)
router.post(
  "/upload",
  authMiddleware,
  uploadLimiter,
  upload.single("image"),
  uploadImageController
)
router.post(
  "/transform/:id",
  authMiddleware,
  transformLimiter,
  transformImageController
)
router.delete("/:id", authMiddleware, deleteImageController)

module.exports = router
