const { findChannelList } = require("./service");

const getUserChannel = async (req, res) => {
  const user = req.currentUser;
  const channelList = await findChannelList(user.id);
  if (channelList.length) res.json({ data: channelList });
  else res.json({ data: null });
};

module.exports = { getUserChannel };
