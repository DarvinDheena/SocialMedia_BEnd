const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');


const Register = async (request , response ) => {
    try {
        const { 
            firstName , lastName , email , password , picturePath , location , occupation , friends 
        } = request.body 

        const passwordHash = await  bcrypt.hash(password , 10 );

        const newUser  = new User ({
            firstName ,
            lastName ,
            email ,
            password : passwordHash ,
            picturePath , 
            location ,
            occupation ,
            friends 
        } )
        await newUser.save()
            .then ((user) => {
                response.status(200).json(user);
            })
    } catch (error) {
        response.status(400).json({message : error });
    }
}

const Login = async ( request , response ) => {
    try {
        const { email , password } = request.body 
        await User.findOne({ email })
            .then(async (user) => {
                if (!user) {
                    return response.status(400).json({ message : "User does not exist "})
                }
                const isMatch = await bcrypt.compare(password , user.password) ;
                if (!isMatch) {
                    return response.status(400).json({ message : "Password didnot match "})
                }
                const token = jwt.sign( {id : user._id} ,config.JWT_SECRET);
                response.status(200).json({ token , user });
            })
    } catch (error) {
        response.status(400).json({ message : error });
    }
}

module.exports = {
    Register ,
    Login 
}