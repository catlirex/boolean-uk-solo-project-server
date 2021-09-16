const { saveChannel } = require("./service");

const createChannel = async (req, res) => {
  const newChannel = req.body;
  const user = req.currentUser;

  try {
    const createdChannel = await saveChannel(newChannel, user.id);
    res.json(createdChannel);
  } catch (e) {
    res.status(401).json({ error: "Channel id existed" });
  }
};
module.exports = { createChannel };
