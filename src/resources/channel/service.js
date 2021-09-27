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

const findTopChannels = async () => {
  try {
    const result = await dbClient.channel.findMany({
      orderBy: [{ post: { _count: "desc" } }, { user: { _count: "desc" } }],
      include: { _count: { select: { post: true, user: true } } },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Channel doesn't existed");
  }
};

const removeChannel = async (channelId) => {
  try {
    const result = await dbClient.channel.delete({
      where: { id: channelId },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Internal server error");
  }
};

module.exports = { saveChannel, findChannel, findTopChannels, removeChannel };
