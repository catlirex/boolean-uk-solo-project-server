const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const {
  getUserChannel,
  getOneUserChannelConnection,
  joinChannel,
  leaveChannel,
  getUserPosts,
} = require("./controller");

const userRouter = Router();
userRouter.route("/channelList").get(loginAuth, getUserChannel);
userRouter
  .route("/:channelId/channelConnection")
  .get(loginAuth, getOneUserChannelConnection);

userRouter.route("/:channelId/joinChannel").post(loginAuth, joinChannel);
userRouter.route("/:channelId/leaveChannel").delete(loginAuth, leaveChannel);
userRouter.route("/myPost").get(loginAuth, getUserPosts);

module.exports = userRouter;
