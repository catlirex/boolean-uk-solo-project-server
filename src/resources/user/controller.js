const { findChannelList, findConnection } = require("./service");

const getUserChannel = async (req, res) => {
  const user = req.currentUser;
  try {
    const channelList = await findChannelList(user.id);
    if (channelList.length) res.json({ data: channelList });
    else res.json({ data: null });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOneUserChannelConnection = async (req, res) => {
  const user = req.currentUser;
  const { channelId } = req.params;
  try {
    const connectStatus = await findConnection(user.id, channelId);
    if (connectStatus.length === 0) res.json({ connection: null });
    else res.json({ connection: connectStatus[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserChannel, getOneUserChannelConnection };
