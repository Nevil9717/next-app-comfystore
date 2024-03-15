import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: String,
    default: null,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  sku: {
    type: String,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  // colors: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Color",
  //   },
  // ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagories",
  },
  pictures: [
    {
      type: String,
    },
  ],
  freeShipping: {
    type: Boolean,
    default: false,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
