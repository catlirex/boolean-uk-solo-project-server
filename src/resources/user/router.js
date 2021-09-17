const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const { getUserChannel } = require("./controller");

const userRouter = Router();
userRouter.route("/channelList").get(loginAuth, getUserChannel);

module.exports = userRouter;
