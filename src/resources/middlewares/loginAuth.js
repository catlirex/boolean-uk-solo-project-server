const { validateToken } = require("../../utils/authGenerator");

function loginAuth(req, res, next) {
  //   const token = req.cookies.token;
  //   const userData = token && validateToken(token);
  //   console.log(userData);
  const userData = { id: 1 };
  if (userData) {
    req.currentUser = userData;
    next();
  } else res.status(401).json("You need to be logged in to access this data");
}

module.exports = loginAuth;
