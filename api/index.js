import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();

//Routes imported here !
import userRoutes from "../api/routes/user.js";
import authroutes from "../api/routes/auth.js";
import postroutes from "../api/routes/post.js";

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/auth", authroutes);
app.use("/api/post", postroutes);

mongoose
  .connect(
    "mongodb+srv://21114843:rZIMcoipzqLCvwPZ@blog-app.ubt9iue.mongodb.net/blog-app?retryWrites=true&w=majority&appName=blog-app"
  )
  .then(() => {
    console.log("mongoDB connected sucessfully!");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || " internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
