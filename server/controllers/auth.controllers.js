import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User exits already. Please logIn" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      message: "User Registeration successfull",
      user: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User Registeration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, maessage: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Email both required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
      },
      { new: true }
    );

    console.log(updatedUser);

    res.status(200).json({
      success: true,
      message: "User updation Successfull",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User updation falied",
      error: error.message,
    });
  }
};
