const dbClient = require("../../utils/database");

const findChannelList = async (id) => {
  try {
    const result = await dbClient.channel_User.findMany({
      where: { userId: id },
      include: { channel: true },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

const findConnection = async (userId, channelId) => {
  try {
    const result = await dbClient.channel_User.findMany({
      where: { userId, channelId },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

module.exports = { findChannelList, findConnection };
