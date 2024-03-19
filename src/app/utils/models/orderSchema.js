import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
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
  personalDetail: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  shippingAddress: {
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  paymentMethod: {
    cardNumber: { type: String, required: true },
    exp: { type: String, required: true },
    cvv: { type: Number, required: true },
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
