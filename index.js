const mongoose = require('mongoose');
const config = require('./src/utils/config');
const app = require('./server');


console.log('connectiong to DB');

mongoose.connect(`${ config.DB_URL}/SocialMedia`)
    .then(() => {
        console.log('connected to DB')
        app.listen(config.PORT , ()=>{
            console.log(`server listening on port ${ config.PORT }`)
        })
        
    })
    .catch((error)=>{
        console.log(error);
    })

