const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const { getUserChannel, getOneUserChannelConnection } = require("./controller");

const userRouter = Router();
userRouter.route("/channelList").get(loginAuth, getUserChannel);
userRouter
  .route("/:channelId/channelConnection")
  .get(loginAuth, getOneUserChannelConnection);

module.exports = userRouter;
