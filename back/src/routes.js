const userRouter = require('./services/user/user.router');
const postRouter = require('./services/post/post.router');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/posts', postRouter);
};
