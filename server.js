const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Register } = require('./src/Controllers/auth');
const { authRouter } = require('./src/Routes/auth');
const { userRouter } = require('./src/Routes/user');
const { postRouter } = require('./src/Routes/post');
const { verifyToken } = require('./src/middleware/verifyToken');
const { createPost } = require('./src/Controllers/post');

const app = express();


// adding bodyparser 

app.use(express.json());
app.use(cors());
app.use('/assets',express.static(path.join(__dirname,'/public/assets')));
// adding file uploading stroage


const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        return cb(null ,__dirname+"/public/assets");
    },
    filename : (req , file , cb ) => {
        return cb(null , `${file.originalname}`)
    }
})

const upload = multer ({ storage })

// Routes with file Uploading 
app.post('/create',verifyToken , upload.single("picture"),createPost);
app.post('/auth/register',upload.single("picture") , Register );

// Routes 

app.use('/auth' , authRouter);
app.use('/users',userRouter);
app.use('/posts',postRouter);



module.exports = app 