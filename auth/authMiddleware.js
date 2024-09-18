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
    // todo: why userId is not stored in req.userId?
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

module.exports = authMiddleware
