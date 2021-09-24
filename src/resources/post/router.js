const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const {
  createPost,
  getAllPost,
  getPostForOneChannel,
} = require("./controller");

const postRouter = Router();

postRouter.route("/").post(loginAuth, createPost);
postRouter.route("/").get(getAllPost);
postRouter.route("/channel/:channelId").get(getPostForOneChannel);

module.exports = postRouter;
