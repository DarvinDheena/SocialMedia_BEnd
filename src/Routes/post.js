const express = require('express');
const { getAllPosts, getUserPosts, likePost, commentPost } = require('../Controllers/post');
const { verifyToken } = require('../middleware/verifyToken');
const postRouter = express.Router();
const multer = require('multer');
const path = require('path');

// READ 
postRouter.get('/',verifyToken  , getAllPosts);
postRouter.get('/:userId', verifyToken ,getUserPosts);

//UPDATE 
postRouter.patch('/:id/like', verifyToken,likePost)
postRouter.patch('/:id/comment' , verifyToken,commentPost);



module.exports = {
    postRouter
}