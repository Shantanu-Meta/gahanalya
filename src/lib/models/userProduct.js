const { default: mongoose, Schema } = require("mongoose");

const userProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    source: {
        type: String,
        required: true, // Corrected typo: "require" to "required"
    }
}, { timestamps: true });

// Apply index to the schema
userProductSchema.index({ source: 1 }, { unique: false });

let UserProduct = mongoose.models.userProduct || mongoose.model('userProduct', userProductSchema); 
module.exports = UserProduct;
