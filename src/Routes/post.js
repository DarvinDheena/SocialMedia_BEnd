const express = require('express');
const { getAllPosts, getUserPosts, likePost } = require('../Controllers/post');
const { verifyToken } = require('../middleware/verifyToken');
const postRouter = express.Router();

// READ 
postRouter.get('/',verifyToken  , getAllPosts);
postRouter.get('/:userId/posts', verifyToken ,getUserPosts);

//UPDATE 
postRouter.patch('/:id/like', verifyToken ,likePost)


module.exports = {
    postRouter
}