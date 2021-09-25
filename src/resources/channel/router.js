const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const {
  createChannel,
  getChannelDetails,
  createTopTenChannels,
} = require("./controller");

const channelRouter = Router();

channelRouter.route("/").post(loginAuth, createChannel);
channelRouter.route("/").get(createTopTenChannels);

channelRouter.route("/:id").get(getChannelDetails);

module.exports = channelRouter;
