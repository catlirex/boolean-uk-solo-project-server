const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const { createChannel, getChannelDetails } = require("./controller");

const channelRouter = Router();

channelRouter.route("/").post(loginAuth, createChannel);
channelRouter.route("/:id").get(getChannelDetails);

module.exports = channelRouter;
