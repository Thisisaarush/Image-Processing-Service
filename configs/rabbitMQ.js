const amqb = require("amqplib/callback_api")

const connectToRabbitMQ = () => {
  amqb.connect("amqp://localhost", (err, connection) => {
    if (err) {
      console.error("Failed to connect to RabbitMQ", err)
      return
    }

    console.log("Connected to RabbitMQ Successfully 🚀")

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
      channel.consume(queue, async (message) => {
        const { id, transformations } = JSON.parse(message.content.toString())
        console.log(`Processing image with id: ${id}`)

        // todo: Process the image here

        channel.ack(message)
      })
    })
  })
}

module.exports = connectToRabbitMQ
