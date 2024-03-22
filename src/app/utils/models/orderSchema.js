import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productName: { type: String, required: true },
      productQuantity: { type: Number, required: true },
      productImage: { type: String, required: true },
      productPrice: { type: Number, required: true },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  address: {
    shippingAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentDetails: {
    paymentStatus: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    amountTotal: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
