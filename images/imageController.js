const {
  uploadImage,
  transformImage,
  getImage,
  deleteImage,
  listImages,
} = require("./imageService")

const uploadImageController = async (req, res) => {
  try {
    const { file } = req
    const { id } = req.user

    if (!file || !id) {
      return res.status(400).json({ message: "File and Id are required" })
    }

    const imageUrl = await uploadImage(file, id)
    res.status(201).json({ imageUrl, message: "Image uploaded successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message })
  }
}

const transformImageController = async (req, res) => {
  try {
    const { id } = req.params
    const { transformations } = req.body

    if (!id || !transformations) {
      return res
        .status(400)
        .json({ message: "Id and transformations are required" })
    }

    const imageUrl = await transformImage(id, transformations)
    res
      .status(200)
      .json({ imageUrl, message: "Image transformed successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error transforming image", error: error.message })
  }
}

const getImageController = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: "Id is required" })
    }

    const image = await getImage(id)
    res.status(200).json({ image, message: "Image retrieved successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting image", error: error.message })
  }
}

const deleteImageController = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: "Id is required" })
    }

    await deleteImage(id)
    res.status(200).json({ message: "Image deleted successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting image", error: error.message })
  }
}

const listImagesController = async (req, res) => {
  try {
    const { id } = req.user
    const { page, limit } = req.query

    if (!id) {
      return res.status(400).json({ message: "Id is required" })
    }

    const images = await listImages(id, page, limit)
    res.status(200).json({ images, message: "Images listed successfully" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error listing images", error: error.message })
  }
}

module.exports = {
  uploadImageController,
  transformImageController,
  getImageController,
  deleteImageController,
  listImagesController,
}
