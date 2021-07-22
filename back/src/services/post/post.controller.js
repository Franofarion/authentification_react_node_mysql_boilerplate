const db = require('../../config/dbConfig');

const getAllPosts = async (req, res) => {
  try {
    console.log('req.user', req.user);
    const posts = await db.query('SELECT * FROM posts');
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const createOnePost = async (req, res) => {
  try {
    const { title, content, creator } = req.body;
    const [insertedPost] = await db.query(
      'INSERT INTO (title, content, creator) VALUES (?, ?, ?)',
      [title, content, creator]
    );

    const post = {
      id: insertedPost.insertId,
      title,
      content,
      creator,
    };

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPosts,
  createOnePost,
};
