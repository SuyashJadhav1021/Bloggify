const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
require("express-async-errors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const catRouter = require("./routes/categories");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(
  cors({
    origin:
      "https://bloggify-backend-pzqclpt5o-suyashs-projects-bceb91d4.vercel.app",
  })
);

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/categories", catRouter);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
