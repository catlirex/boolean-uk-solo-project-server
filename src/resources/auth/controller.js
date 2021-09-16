const { findUserWithValidation, createdWithHash } = require("./service");
const { createToken } = require("../../utils/authGenerator");

const loginUser = async (req, res) => {
  const userCreds = req.body;

  try {
    const loggedUser = await findUserWithValidation(userCreds);

    const token = createToken({
      id: loggedUser.id,
      email: loggedUser.email,
    });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        avatar: loggedUser.avatar,
        email: loggedUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "password/email incorrect" });
  }
};

const logOutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ user: null });
};

const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const savedUser = await createdWithHash(newUser);

    const token = createToken({
      id: savedUser.id,
      email: savedUser.email,
    });
    res.cookie("token", token, { httpOnly: true });

    res.json({
      user: {
        avatar: savedUser.avatar,
        email: savedUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "email exists" });
  }
};

module.exports = { loginUser, logOutUser, createUser };
