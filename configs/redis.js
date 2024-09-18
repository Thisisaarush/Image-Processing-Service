const redis = require("redis")
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

redisClient.on("connect", () => {
  console.log("Connected to Redis Successfully 🚀")
})

module.exports = redisClient
