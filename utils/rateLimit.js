const { rateLimit } = require("express-rate-limit")
const { RedisStore } = require("rate-limit-redis")
const redisClient = require("../configs/redis")

const transformLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // time window in milliseconds
  max: 10, // Limit each IP to few requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  store: new RedisStore({
    client: redisClient,
  }),
})
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  store: new RedisStore({
    client: redisClient,
  }),
})

module.exports = { transformLimiter, uploadLimiter }
