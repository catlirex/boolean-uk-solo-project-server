const Router = require("express");
const { createChannel } = require("./controller");

const channelRouter = Router();

channelRouter.route("/").post(createChannel);

module.exports = channelRouter;
