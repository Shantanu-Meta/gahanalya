const { default: mongoose, Schema } = require("mongoose");

const productSchema = new Schema({
    name:{
        type: String, 
        require: true, 
    },
    description:{
        type: String, 
        require: true
    },
    price:{
        type: Number, 
        require: true, 
    }, 
    tag:{ // gold or silver
        type:String, 
        require: true, 
    },
    image:{
        type:String, 
        reuired:true,
    },
    size:{
        type:String,
        reuired:true,
    }
}, {timestamps:true})

let Product = mongoose.models.Product || mongoose.model('Product', productSchema); 
module.exports = Product