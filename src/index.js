require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./resources/auth/router");
const channelRouter = require("./resources/channel/router");
const userRouter = require("./resources/user/router");
const postRouter = require("./resources/post/router");

const app = express();

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* SETUP ROUTES */
app.use(authRouter);

app.use("/channel", channelRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
