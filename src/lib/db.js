const mongoose = require('mongoose')
const connection = {}; 

const connectWithMongo = async () =>{
    const mongodbURI = process.env.MONGODB_URI; 
    if(connection.isConnected){
        console.log("Use existing connection")
        return ; 
    }
    console.log("Ready to connect in index.js")
    const db = await mongoose.connect(mongodbURI); 
    connection.isConnected = db.connections[0].readyState; 
    console.log("Connected with DB")
}

export default connectWithMongo;

