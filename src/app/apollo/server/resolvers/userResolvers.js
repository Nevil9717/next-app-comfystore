import getRole from "../../../utils/getRole";
import { User } from "../../../utils/models";
import { sendWelcomeEmail } from "../../../utils/sendEmail";
import { stripe } from "../../../../lib/stripe";

const createUser = async (_, { input }) => {
  try {
    const user = new User(input);
    if (!user) return new Error("User not created");
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    await sendWelcomeEmail(user.email, otpCode);
    user.otpCode = otpCode;
    user.role = await getRole("Costumer");
    await user.save();
    return user;
  } catch (error) {
    return new Error(error);
  }
};
const verifyUser = async (_, { input }) => {
  const { email, otpCode } = input;
  try {
    const user = await User.findOne({ email });
    if (!user) return new Error("User not found");
    if (user.otpCode !== otpCode) return new Error("Invalid OTP Code");
    user.isVerified = true;
    await user.save();
    return user;
  } catch (error) {
    return new Error(error);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find({
      role: { $ne: await getRole("Admin") },
    }).populate({ path: "role", select: "roleName" });
    if (!users) return "User not found";
    return users;
  } catch (error) {
    return new Error(error);
  }
};

const loginUser = async (_, { input }) => {
  const { email, password } = input;
  try {
    const user = await User.findOne({ email });
    if (!user) return new Error("User Not Found");
    const isPasswordMatch = await user.isPasswordCorrect(password);
    if (!isPasswordMatch) return new Error("Incorrect Password");
    const token = await user.generateToken();
    return { token };
  } catch (error) {
    return new Error(error);
  }
};
const createPaymentSession = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Product Name",
            },
            unit_amount: 2000, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    return { sessionId: session.id };
  } catch (error) {
    console.error(error);
    return new Error("Failed to create session");
  }
};

export const userResolvers = {
  Query: {
    getUsers,
  },

  Mutation: {
    loginUser,
    createUser,
    verifyUser,
    createPaymentSession,
  },
};
