const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const  verifyToken = async (request,response,next) => {
    try {
        let token  = request.header('Authorization')
        if (!token) {
            return response.status().json({ message : "Token Missing "})
        }
        if (token.startsWith("Bearer ")){
            token =  token.slice(7 , token.length);
        }
        try {
            jwt.verify(token , JWT_SECRET )
            next();
        } catch (error) {
            return res.json({ error: 'Token is invalid' });
        }
    } catch (error) {
        response.status(500).json({ message : error });
    }
}


module.exports = {
    verifyToken
}