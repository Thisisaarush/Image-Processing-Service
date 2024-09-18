const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3")
const fs = require("fs")

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

// Upload file to S3 bucket
const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream,
    ContentType: file.mimetype,
  }

  try {
    const command = new PutObjectCommand(uploadParams)
    const data = await s3Client.send(command)
    console.log("File uploaded successfully", data)

    // Return the URL of the uploaded file on S3
    return {
      message: "File uploaded successfully",
      url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.filename}`,
    }
  } catch (error) {
    console.error("Error uploading file", error)
    return null
  }
}

// Download file from S3 bucket
const getFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }

  try {
    const data = await s3Client.send(new GetObjectCommand(params))
    console.log("File downloaded successfully", data)

    return { message: "File downloaded successfully", data }
  } catch (error) {
    console.error("Error downloading file", error)
    return null
  }
}

// Delete file from S3 bucket
const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }

  try {
    const data = await s3Client.send(new DeleteObjectCommand(params))
    console.log("File deleted successfully", data)

    return { data, message: "File deleted successfully" }
  } catch (error) {
    console.error("Error deleting file", error)
    return null
  }
}

module.exports = {
  uploadToS3,
  getFromS3,
  deleteFromS3,
}
