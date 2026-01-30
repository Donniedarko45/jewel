import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['bracelet', 'pendant'],
        required: [true, 'Product type is required']
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0,
        default: null
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: 0,
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    images: [{
        url: String,
        publicId: String
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    isSale: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Virtual for checking if product has sale price
productSchema.virtual('hasSalePrice').get(function () {
    return this.originalPrice && this.originalPrice > this.price;
});

// Pre-save middleware to update inStock based on quantity
productSchema.pre('save', function (next) {
    this.inStock = this.quantity > 0;
    this.isSale = this.originalPrice && this.originalPrice > this.price;
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
