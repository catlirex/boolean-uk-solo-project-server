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

module.exports = { savePost };
