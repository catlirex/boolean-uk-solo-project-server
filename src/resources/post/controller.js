const {
  savePost,
  findSortedPost,
  patchPost,
  findTopPosts,
  findPostDetail,
  createComment,
  createReply,
  removePost,
} = require("./service");

const createPost = async (req, res) => {
  const newPost = req.body;
  const user = req.currentUser;

  try {
    const createdPost = await savePost(newPost, user.id);
    const newPostWithDetail = await findPostDetail(createdPost.id);
    res.json(newPostWithDetail);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Missing Post Title" });
  }
};

const getPostForOneChannel = async (req, res) => {
  const { channelId } = req.params;
  const { sort } = req.query;
  try {
    const postList = await findSortedPost(channelId, sort);
    res.json(postList);
  } catch (e) {
    console.log(e);
    res.status(501).json({ error: "internal server error" });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const toUpdatePost = req.body;
  try {
    const updatedPost = await patchPost(postId, toUpdatePost);
    const updatePostWithDetail = await findPostDetail(updatedPost.id);
    res.json(updatePostWithDetail);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Fail to update" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const topPosts = await findTopPosts();

    res.json(topPosts);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "internal server error" });
  }
};

const getPostDetail = async (req, res) => {
  const { postId } = req.params;
  try {
    const postDetail = await findPostDetail(parseInt(postId));

    res.json(postDetail);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
};

const postNewComment = async (req, res) => {
  const { postId } = req.params;
  const user = req.currentUser;
  const newComment = req.body;
  try {
    const createdComment = await createComment(
      user.id,
      parseInt(postId),
      newComment
    );

    const updatedPostDetail = await findPostDetail(createdComment.postId);
    res.json(updatedPostDetail);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
};

const postNewReply = async (req, res) => {
  const { commentId } = req.params;
  const user = req.currentUser;
  const newReply = req.body;

  try {
    const createdReply = await createReply(
      user.id,
      parseInt(commentId),
      newReply
    );
    res.json(createdReply);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const user = req.currentUser;
  try {
    const toDelPost = await findPostDetail(parseInt(postId));
    if (toDelPost.userId !== user.id)
      return res.status(401).json({ error: "you are not post owner" });
    const deletedPost = await removePost(toDelPost.id);
    return res.json(deletedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPostForOneChannel,
  updatePost,
  getPostDetail,
  postNewComment,
  postNewReply,
  deletePost,
};
