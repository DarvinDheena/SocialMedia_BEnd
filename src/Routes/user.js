const express = require('express');
const { getUser, getUserFriends, addRemoveFriend } = require('../Controllers/user');
const { verifyToken } = require('../middleware/verifyToken');
const userRouter = express.Router();


//READ 
userRouter.get('/:id' ,verifyToken , getUser );
userRouter.get('/:id/friends' ,verifyToken , getUserFriends);

//UPDATE 
userRouter.patch('/:id/:friendId' ,verifyToken , addRemoveFriend);


module.exports ={
    userRouter 
}