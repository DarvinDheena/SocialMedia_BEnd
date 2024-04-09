const Post = require('../models/post');
const User = require('../models/user');

//CREATE
const   createPost =  async ( request,response ) => {
    try {
        const { userId , description , picturePath } = request.body ;
        await User.findById(userId)
            .then( async (user) => {
                const post = new Post({
                    userId ,
                    firstName : user.firstName ,
                    lastName : user.lastName,
                    location : user.location ,
                    description ,
                    userPicturePath : user.picturePath ,
                    picturePath ,
                    comments : []
                })
                await post.save();
                await Post.find()
                    .then((posts) => {
                        response.status(200).json(posts);
                    })
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
        const { id } = request.params;
    const { userId } = request.body;
    await Post.findById(id)
        .then(async (post) => {
            const isLiked = post.likes ;
            if (isLiked) {
                post.likes = false ;
            } else {
                post.likes = true ;
            }
            await Post.findByIdAndUpdate(
                id , 
                { likes : post.likes })
                    .then((updatedPost) => {
                        response.status(200).json(updatedPost)
                    })
        })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}


const commentPost = async(request,response) => {
    try {
        const { id } = request.params;
    const { newComment } = request.body;
    await Post.findById(id)
        .then(async (post) => {
            let newComments = post.comments.concat(newComment);
            await Post.findByIdAndUpdate(id ,
                {
                    comments : newComments
                })
                .then((post) => {
                    response.status(200).json(post);
                })
        })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}

module.exports = {
    getAllPosts,
    getUserPosts,
    likePost,
    createPost,
    commentPost
}