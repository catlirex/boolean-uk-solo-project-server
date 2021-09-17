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
  }
};

module.exports = { findChannelList };
