import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fieldsare required!" });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const NewUser = new User({ username, email, password: hashPassword });
  try {
    await NewUser.save();
    res.json("signup sucessfull !");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
