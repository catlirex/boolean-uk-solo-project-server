const { savePost } = require("./service");

const createPost = async (req, res) => {
  const newPost = req.body;
  const user = req.currentUser;

  try {
    const createdPost = await savePost(newPost, user.id);
    res.json(createdPost);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Missing Post Title" });
  }
};
const getAllPost = async (req, res) => {};
const getPostForOneChannel = async (req, res) => {};

module.exports = { createPost, getAllPost, getPostForOneChannel };
