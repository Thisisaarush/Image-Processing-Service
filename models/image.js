const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  metadata: { type: Object },
})

module.exports = mongoose.model("Image", imageSchema)
