const { default: mongoose, Schema } = require("mongoose");

const userOrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    orders: {
        type: Array,
        require:true
    },
    trans_id: {
        type: String,
        require:true
    },
    total:{
        type:Number,
        require:true
    }
}, {timestamps:true})

let UserOrder = mongoose.models.userOrder || mongoose.model('userOrder', userOrderSchema); 
module.exports = UserOrder