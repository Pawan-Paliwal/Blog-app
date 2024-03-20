import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.get("/test", test);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
