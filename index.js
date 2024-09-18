const express = require("express")
const mongoose = require("mongoose")
const redisClient = require("./configs/redis")
const connectToRabbitMQ = require("./configs/rabbitMQ")
const authRoutes = require("./auth/authRoutes")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

// Routes
app.use("/auth", authRoutes)

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Successfully 🚀")

    // Connect to Redis and RabbitMQ
    redisClient.connect()
    connectToRabbitMQ()

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err)
  })
