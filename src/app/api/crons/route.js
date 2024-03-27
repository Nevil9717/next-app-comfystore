import { Cart, User } from "@/app/utils/models";
import { sendWelcomeEmail } from "@/app/utils/sendEmail";
import { NextResponse } from "next/server";

const handler = async (req) => {
  if (req.method === "GET") {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(
      currentDate.getTime() - 5 * 24 * 60 * 60 * 1000
    ); // Calculate the date 5 days ago
    const cartDetail = await Cart.find({ updatedAt: { $lt: fiveDaysAgo } });
    if (!cartDetail) NextResponse.json({ message: "Cart not found" });
    cartDetail?.map(async (cart) => {
      const userId = cart.userId;
      const userMail = await User.findOne({ _id: userId }, { email: 1 });
      await sendWelcomeEmail(
        userMail,
        "Your have item in your cart for more than 5 Days. Please check it out."
      );
    });

    return NextResponse.json({ message: "GET request received" });
  }
};

export { handler as GET };

