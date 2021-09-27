const {
  saveChannel,
  findChannel,
  findTopChannels,
  removeChannel,
} = require("./service");
const dbClient = require("../../utils/database");
const { findConnection } = require("../user/service");

const createChannel = async (req, res) => {
  const newChannel = req.body;
  const user = req.currentUser;

  try {
    const createdChannel = await saveChannel(newChannel, user.id);

    const channelDetail = await findChannel(createdChannel.id);
    res.json(channelDetail);
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

const delChannel = async (req, res) => {
  const channelId = req.params.id;
  const user = req.currentUser;

  try {
    const getRole = await findConnection(user.id, channelId);
    const isOwner = getRole[0].role === "owner";
    if (!isOwner) return res.status(401).json({ error: "not channel owner" });

    const removedChannel = await removeChannel(channelId);
    res.json(removedChannel);
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: "internal server error" });
  }
};
module.exports = {
  createChannel,
  getChannelDetails,
  createTopTenChannels,
  delChannel,
};
