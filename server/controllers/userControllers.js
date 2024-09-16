import { User } from "../models/userModels.js";

export const addUser = async (request, response) => {
  try {
    const { name, email, type, password, confirm_password } = request.body;

    if (!name || !email || !type || !password || !confirm_password) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields!" });
    }
    if (password !== confirm_password) {
      return response.status(400).send({ message: "Passwords do not match!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response
        .status(400)
        .send({ message: "User already exists with this email!" });
    }

    const newUser = {
      name,
      email,
      password,
      type,
    };
    const user = await User.create(newUser);

    return response.status(201).send({ message: "registered" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both name and password!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message:
          "Email is incorrect. Please enter the correct email you used in registration!",
      });
    }

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(404).send({
        message:
          "Password is incorrect. Please enter the correct password you used in registration!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
