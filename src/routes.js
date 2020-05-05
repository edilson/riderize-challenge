const express = require('express');

const PostController = require('./controllers/PostController');

const routers = express.Router();

routers.route('/posts').post(PostController.create).get(PostController.list);
routers
  .route('/posts/:id')
  .put(PostController.update)
  .delete(PostController.delete)
  .get(PostController.findById);

module.exports = routers;
