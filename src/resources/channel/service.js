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

const findChannel = async (id) => {
  try {
    const result = await dbClient.channel.findUnique({
      where: { id },
      include: { _count: { select: { post: true, user: true } } },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Channel doesn't existed");
  }
};

module.exports = { saveChannel, findChannel };
