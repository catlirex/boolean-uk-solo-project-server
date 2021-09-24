const { validateToken } = require("../../utils/authGenerator");

function loginAuth(req, res, next) {
  const token = req.cookies.token;
  console.log("token", token);
  const userData = token && validateToken(token);
  console.log("userData", userData);
  if (userData) {
    req.currentUser = userData;
    next();
  } else res.status(401).json("You need to be logged in to access this data");
}

module.exports = loginAuth;
