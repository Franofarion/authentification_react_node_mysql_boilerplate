const postRouter = require('express').Router();

const { getAllPosts, createOnePost } = require('./post.controller');

const {checkAuthentification} = require('../../middlewares/authentification');

postRouter.use(checkAuthentification)

postRouter.get('/', getAllPosts);
postRouter.post('/', createOnePost);

module.exports = postRouter;
