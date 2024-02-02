const Post = require('../models/post');
const User = require('../models/user');

//CREATE
const createPost =  async ( request,response ) => {
    try {
        const { userId , description , picturepath } = request.body ;
        await User.findById(userId)
            .then( async (user) => {
                const newPost = new Post({
                    userId ,
                    firstName : user.firstName ,
                    lastName : user.lastname,
                    location : user.location ,
                    description ,
                    userPicturePath : user.picturePath ,
                    picturepath ,
                    likes : {} ,
                    comments : []
                })
                await newPost.save();
            })
        await Post.find()
            .then((posts) => {
                response.status(200).json(posts);
            })
    } catch (error) {
        response.status(400).json({ message : error } );
    }
}

const getAllPosts = async ( request , response ) => {
    try {
        await Post.find()
            .then((posts) => {
                response.status(200).json(posts)
            })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}

const getUserPosts = async (request , response) => {
    try {
        const userId = request.params.userId ;
        await Post.find({ userId })
            .then((posts) => {
                response.status(200).json(posts);
            })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}

const likePost = async (request,response) => {
    try {
        const { id } = req.params;
    const { userId } = req.body;
    await Post.findById(id)
        .then(async (post) => {
            const isLiked = post.likes.get(userId);
            if (isLiked) {
                post.likes.delete(userId);
            } else {
                post.likes.set(userId, true);
            }
            await Post.findByIdAndUpdate(
                id , 
                { likes : post.likes },
                { new : true} )
                    .then((updatedPost) => {
                        response.status(200).json(updatedPost)
                    })
        })
    res.status(200).json(updatedPost);
    } catch (error) {
        response.status(400).json({ message : error });
    }
}

module.exports = {
    getAllPosts,
    getUserPosts,
    likePost,
    createPost
}