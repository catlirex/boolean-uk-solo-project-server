const {
  findChannelList,
  findConnection,
  connectUserChannel,
  delConnection,
  findAllPosts,
} = require("./service");

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

const joinChannel = async (req, res) => {
  const user = req.currentUser;
  const { channelId } = req.params;
  const extraData = req.body;
  try {
    const newConnection = await connectUserChannel(
      user.id,
      channelId,
      extraData
    );
    res.json(newConnection);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

const leaveChannel = async (req, res) => {
  const user = req.currentUser;
  const { channelId } = req.params;
  try {
    const toDeleteItem = await findConnection(user.id, channelId);
    const deletedItem = await delConnection(toDeleteItem[0].id);
    res.json(deletedItem);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserPosts = async (req, res) => {
  const user = req.currentUser;
  try {
    const postsList = await findAllPosts(user.id);
    res.json(postsList);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getUserChannel,
  getOneUserChannelConnection,
  joinChannel,
  leaveChannel,
  getUserPosts,
};
