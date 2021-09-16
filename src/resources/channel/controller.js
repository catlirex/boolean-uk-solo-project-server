const { saveChannel } = require("./service");

const createChannel = async (req, res) => {
  const newChannel = req.body;
  try {
    const createdChannel = await saveChannel(newChannel);
    res.json(createdChannel);
  } catch (e) {
    res.status(401).json({ error: "Channel id existed" });
  }
};
module.exports = { createChannel };
