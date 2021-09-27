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

const connectUserChannel = async (userId, channelId, extraData) => {
  const data = {
    channel: { connect: { id: channelId } },
    user: { connect: { id: userId } },
  };
  if (extraData.role) data.role = extraData.role;
  try {
    const result = await dbClient.channel_User.create({
      data,
    });

    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

const delConnection = async (id) => {
  try {
    const result = await dbClient.channel_User.delete({
      where: { id },
    });

    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

const findAllPosts = async (id) => {
  try {
    const result = await dbClient.post.findMany({
      where: { userId: id },
      include: {
        _count: { select: { comment: true } },
        user: { select: { avatar: true, email: true } },
      },
    });

    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

module.exports = {
  findChannelList,
  findConnection,
  connectUserChannel,
  delConnection,
  findAllPosts,
};
