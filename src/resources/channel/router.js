const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const {
  createChannel,
  getChannelDetails,
  createTopTenChannels,
  delChannel,
} = require("./controller");

const channelRouter = Router();

channelRouter.route("/").post(loginAuth, createChannel);
channelRouter.route("/").get(createTopTenChannels);

channelRouter.route("/:id").get(getChannelDetails);
channelRouter.route("/:id").delete(loginAuth, delChannel);

module.exports = channelRouter;
