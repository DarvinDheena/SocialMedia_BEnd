const jwt = require('jsonwebtoken');

const  verifyToken = async (request,response,next) => {
    try {
        let token  = request.header('Authorization')
        if (!token) {
            return response.status().json({ message : "Token Missing "})
        }
        if (token.startsWith("Bearer ")){
            token =  token.slice(7 , token.length);
        }
        const verified = jwt.verify(token,JWT_SECRET);
        request.user = verified ;   
        next();
    } catch (error) {
        response.status(500).json({ message : error })
    }
}


module.exports = {
    verifyToken
}