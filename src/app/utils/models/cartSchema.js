import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      productQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
});
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
