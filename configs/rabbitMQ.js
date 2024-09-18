const amqp = require("amqplib/callback_api")
const { transformImage } = require("../images/imageService")

const connectToRabbitMQ = () => {
  // Connect to RabbitMQ server
  amqp.connect("amqp://host.docker.internal", (err, connection) => {
    if (err) {
      console.error("Failed to connect to RabbitMQ 🚫", err)
      return
    }

    console.log("Connected to RabbitMQ Successfully 🚀")

    // Create a channel to communicate with queue
    connection.createChannel((err, channel) => {
      if (err) {
        console.error("Failed to create channel", err)
        return
      }
      console.log("Channel created 🚀")

      const queue = "image-processing"
      channel.assertQueue(queue, {
        durable: true,
      })

      // Consume messages from the queue
      channel.consume(queue, async (message) => {
        try {
          const { id, transformations } = JSON.parse(message.content.toString())
          console.log(`Processing image with id: ${id}`)
          await transformImage(id, transformations)
          channel.ack(message)
        } catch (error) {
          console.error("Failed to process image", error)
          channel.reject(message, true)
        }
      })
      console.log("Waiting for messages in the image_processing queue...")
    })
  })
}

module.exports = connectToRabbitMQ
