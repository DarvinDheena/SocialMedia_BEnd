const User = require('../models/user');
// READ Operations

const getUser = async ( request , response ) => {
    try {
        const { id } = request.params ;
        await User.findById(id)
            .then((user) => {
                response.status(200).json(user);
            })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}
const getUserFriends = async ( request , response ) => {
    try {
        const { id } = request.params
        console.log(id);
        await User.findById(id)
            .then (async (user) => {
                await Promise.all( user.friends.map((id) => User.findById(id)) )
                    .then((friends) => {
                        const formattedFriends = friends.map(
                            ({_id , firstName , lastName ,occupation , location ,picturePath }) => {
                                return { _id , firstName , lastName , occupation , location , picturePath   }
                            } )
                        response.status(200).json(formattedFriends);
                    })
            })
    } catch (error) {
        response.status(400).json({message : error });
    }
} 

const addRemoveFriend =  async ( request,response) => {
    try {
        const { id , friendId } = request.params ;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId );
            friend.friends = friend.friends.filter((id) => id !== id );
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await friend.save();
        await user.save()   
            .then(async (user) => { 
                await Promise.all( user.friends.map((id) => User.findById(id)) )
                    .then((friends) => {
                        const formattedFriends = friends.map(
                            ({_id , firstName , lastName ,occupation , location ,picturePath }) => {
                                return { _id , firstName , lastName , occupation , location , picturePath   }
                            } )
                        response.status(200).json(formattedFriends);
                    })
            })
    } catch (error) {
        response.status(400).json({message : error });
    }
}

module.exports = {
    getUser,
    getUserFriends ,
    addRemoveFriend
}