const Router = require("express");
const loginAuth = require("../middlewares/loginAuth");
const { createChannel } = require("./controller");

const channelRouter = Router();

channelRouter.route("/").post(loginAuth, createChannel);
// channelRouter.route("/:id").get(getAllPost);

module.exports = channelRouter;
