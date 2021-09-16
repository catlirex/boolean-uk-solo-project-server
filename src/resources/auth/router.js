const Router = require("express");
const { loginUser, logOutUser, createUser } = require("./controller");

const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/signup").post(createUser);

authRouter.route("/logout").get(logOutUser);

module.exports = authRouter;
