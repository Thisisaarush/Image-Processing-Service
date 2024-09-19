const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, Token is required!" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.userId
    if (!req.userId) {
      return res.status(401).json({ error: "Invalid token, userId not found" })
    }

    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

module.exports = authMiddleware
