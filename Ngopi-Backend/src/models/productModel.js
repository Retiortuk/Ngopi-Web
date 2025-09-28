import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true, default: 0},
        image: {type: String, required: true},
        isFeatured: {type: Boolean, required: true, default: false},
        isAvailable: {type: Boolean, require: true, default: true}
    },
    {timestamps: true}
)

const Product = mongoose.model('Product', productSchema);
export default Product;