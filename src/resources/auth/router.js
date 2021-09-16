const Router = require("express");
const {
  loginUser,
  logOutUser,
  createUser,
  loginCheck,
} = require("./controller");

const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/signup").post(createUser);

authRouter.route("/logout").get(logOutUser);

authRouter.route("/loginCheck").get(loginCheck);

module.exports = authRouter;
