const dbClient = require("../../utils/database");

const saveChannel = async (channelData, userId) => {
  try {
    const createdChannel = await dbClient.channel.create({
      data: {
        ...channelData,
        user: { create: { role: "owner", userId } },
      },
    });
    return createdChannel;
  } catch (e) {
    console.log(e);
    throw new Error("Channel id existed");
  }
};

module.exports = { saveChannel };
