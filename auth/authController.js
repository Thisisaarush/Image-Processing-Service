const User = require("../models/user")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const user = require("../models/user")
const dotenv = require("dotenv")

dotenv.config()

const register = async (req, res) => {
  const { email, password } = req.body

  try {
    const userExits = await User.findOne({ email })
    if (userExits) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" })
    }

    const hashedPassword = await argon2.hash(password)
    const user = new User({ email, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({ token, message: "User created successfully" })
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userExits = await User.findOne({ email })
    if (!userExits) {
      return res
        .status(401)
        .json({ error: "User with this email doesn't exists" })
    }

    const passwordValid = await argon2.verify(userExits.password, password)
    if (!passwordValid) {
      return res.status(401).json({ error: "Wrong password" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(200).json({
      token,
      message: "Login successful",
    })
  } catch (err) {
    return res.status(401).json({ error: "Failed to login", err })
  }
}

module.exports = { register, login }
