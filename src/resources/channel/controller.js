const { saveChannel, findChannel, findTopChannels } = require("./service");
const dbClient = require("../../utils/database");

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

const getChannelDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const channelDetail = await findChannel(id);
    res.json(channelDetail);
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: "Channel doesn't exits" });
  }
};

const createTopTenChannels = async (req, res) => {
  try {
    const topList = await findTopChannels();
    res.json(topList);
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: "internal server error" });
  }
};
module.exports = { createChannel, getChannelDetails, createTopTenChannels };
