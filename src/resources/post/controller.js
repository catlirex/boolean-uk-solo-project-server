const {
  savePost,
  findSortedPost,
  findOnePost,
  patchPost,
  findTopPosts,
  findPostDetail,
} = require("./service");

const createPost = async (req, res) => {
  const newPost = req.body;
  const user = req.currentUser;

  try {
    const createdPost = await savePost(newPost, user.id);
    const newPostWithDetail = await findOnePost(createdPost.id);
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
    const updatePostWithDetail = await findOnePost(updatedPost.id);
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
    res.status(400).json({ error: "internal server error" });
  }
};
module.exports = {
  createPost,
  getAllPost,
  getPostForOneChannel,
  updatePost,
  getPostDetail,
};
