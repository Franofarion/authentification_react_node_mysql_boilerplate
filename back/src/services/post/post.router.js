const postRouter = require('express').Router();

const { getAllPosts, createOnePost } = require('./post.controller');

const { checkauthentication } = require('../../middlewares/authentication');

postRouter.use(checkauthentication);

postRouter.get('/', getAllPosts);
postRouter.post('/', createOnePost);

module.exports = postRouter;
