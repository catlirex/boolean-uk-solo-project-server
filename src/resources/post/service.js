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
        include: {
          _count: { select: { comment: true } },
          user: { select: { avatar: true, email: true } },
        },
      });
    if (sort === "vote")
      result = await dbClient.post.findMany({
        where: { channelId: id },
        orderBy: [{ vote: "desc" }],
        include: {
          _count: { select: { comment: true } },
          user: { select: { avatar: true, email: true } },
        },
      });
    if (sort === "hot")
      result = await dbClient.post.findMany({
        where: { channelId: id },
        orderBy: [{ comment: { _count: "desc" } }],
        include: {
          _count: { select: { comment: true } },
          user: { select: { avatar: true, email: true } },
        },
      });
    if (!sort)
      result = await dbClient.post.findMany({
        where: { channelId: id },
        include: {
          _count: { select: { comment: true } },
          user: { select: { avatar: true, email: true } },
        },
      });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Internal server error");
  }
};

const findOnePost = async (id) => {
  try {
    const result = await dbClient.post.findMany({
      where: { id },
      include: {
        _count: { select: { comment: true } },
        user: { select: { avatar: true, email: true } },
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("post not found");
  }
};

const patchPost = async (id, toUpdatePost) => {
  try {
    const updated = await dbClient.post.update({
      where: { id: parseInt(id) },
      data: { ...toUpdatePost },
    });
    return updated;
  } catch (e) {
    console.log(e);
    throw new Error("Fail to update");
  }
};

const findTopPosts = async () => {
  try {
    const result = await dbClient.post.findMany({
      orderBy: [{ vote: "desc" }],
      include: {
        _count: { select: { comment: true } },
        user: { select: { avatar: true, email: true } },
      },
      take: 10,
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

const findPostDetail = async (id) => {
  try {
    const result = await dbClient.post.findUnique({
      where: { id },
      include: {
        _count: { select: { comment: true } },
        user: { select: { avatar: true, email: true } },
        comment: {
          include: {
            user: { select: { avatar: true, email: true } },
            reply: {
              include: { user: { select: { avatar: true, email: true } } },
            },
          },
        },
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("post not found");
  }
};

const createComment = async (userId, postId, comment) => {
  try {
    const createdPost = await dbClient.comment.create({
      data: {
        content: comment.content,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
    return createdPost;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

const createReply = async (userId, commentId, reply) => {
  try {
    const createdPost = await dbClient.reply.create({
      data: {
        content: reply.content,
        user: { connect: { id: userId } },
        Comment: { connect: { id: commentId } },
      },
    });
    return createdPost;
  } catch (e) {
    console.log(e);
    throw new Error("internal server error");
  }
};

module.exports = {
  savePost,
  findSortedPost,
  findOnePost,
  patchPost,
  findTopPosts,
  findPostDetail,
  createComment,
  createReply,
};
