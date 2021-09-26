const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const {
  createPost,
  getAllPost,
  getPostForOneChannel,
  updatePost,
  getPostDetail,
} = require("./controller");

const postRouter = Router();

postRouter.route("/").post(loginAuth, createPost);
postRouter.route("/").get(getAllPost);
postRouter.route("/channel/:channelId").get(getPostForOneChannel);
postRouter.route("/:postId").patch(loginAuth, updatePost);
postRouter.route("/:postId").get(getPostDetail);

module.exports = postRouter;
