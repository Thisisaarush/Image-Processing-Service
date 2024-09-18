const redis = require("redis")
const dotenv = require("dotenv")

dotenv.config()

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

module.exports = redisClient
