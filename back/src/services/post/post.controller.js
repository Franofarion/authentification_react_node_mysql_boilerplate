const db = require('../../config/dbConfig');

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.query(
      'SELECT p.id, p.title, p.content, u.full_name as creator FROM posts p INNER JOIN `users` as u ON p.creator = u.id;'
    );
    return res.status(200).json(posts[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const createOnePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    const [insertedPost] = await db.query(
      'INSERT INTO posts (title, content, creator) VALUES (?, ?, ?)',
      [title, content, user.id]
    );

    const newPost = await db.query(
      'SELECT p.id, p.title, p.content, u.full_name as creator FROM posts p INNER JOIN `users` as u ON p.creator = u.id WHERE p.id = ?',
      [insertedPost.insertId]
    );

    return res.status(200).json(newPost[0][0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPosts,
  createOnePost,
};
