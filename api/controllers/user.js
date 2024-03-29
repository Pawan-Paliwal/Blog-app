import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
      },
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json("Done update!");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("accesss_token").status(200).json("User has been Signout");
  } catch (error) {
    next(error);
  }
};
