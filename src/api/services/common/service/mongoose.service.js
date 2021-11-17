const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
const connectWithRetry = () => {
    try{
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://127.0.0.1:27017/twiteedb", options)
    .then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
    }catch(e)
    {
        console.log(e);
    }

};

connectWithRetry();

exports.mongoose = mongoose;