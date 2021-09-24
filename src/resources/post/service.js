const dbClient = require("../../utils/database");

const savePost = async (postData, userId) => {
  const { channel, ...post } = postData;
  try {
    const createdPost = await dbClient.post.create({
      data: {
        ...post,
        user: { connect: { id: userId } },
        channel: { connect: { id: channel } },
      },
    });
    return createdPost;
  } catch (e) {
    console.log(e);
    throw new Error("Missing Title");
  }
};

const findSortedPost = async (id, sort) => {
  try {
    let result = null;
    if (sort === "new")
      result = await dbClient.post.findMany({
        where: { channelId: id },
        orderBy: [{ postDate: "desc" }],
        include: { _count: { select: { comment: true } } },
      });
    if (sort === "vote")
      result = await dbClient.post.findMany({
        where: { channelId: id },
        orderBy: [{ vote: "desc" }],
        include: { _count: { select: { comment: true } } },
      });
    if (sort === "hot")
      result = await dbClient.post.findMany({
        where: { channelId: id },
        orderBy: [{ comment: { _count: "desc" } }],
        include: { _count: { select: { comment: true } } },
      });
    if (!sort)
      result = await dbClient.post.findMany({
        where: { channelId: id },
        include: { _count: { select: { comment: true } } },
      });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Internal server error");
  }
};

module.exports = { savePost, findSortedPost };
