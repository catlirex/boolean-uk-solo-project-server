const dbClient = require("../../utils/database");

const saveChannel = async (channelData) => {
  try {
    const createdChannel = await dbClient.channel.create({
      data: channelData,
    });
    return createdChannel;
  } catch (e) {
    console.log(e);
    throw new Error("Channel id existed");
  }
};

module.exports = { saveChannel };
