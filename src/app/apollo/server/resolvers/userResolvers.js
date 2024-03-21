import getRole from "../../../utils/getRole";
import { User } from "../../../utils/models";
import { sendWelcomeEmail } from "../../../utils/sendEmail";

const createUser = async (_, { input }) => {
  try {
    const user = new User(input);
    if (!user) return new Error("User not created");
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const content = `Your OTP Code is ${otpCode}`;
    await sendWelcomeEmail(user.email, content);
    user.otpCode = otpCode;
    user.role = await getRole("Customer");
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
const resendOTP = async (_, { email }) => {
  console.log("🚀 ~ resendOTP ~ email:", email);
  try {
    const user = await User.findOne({ email });
    if (!user) return new Error("User not found");
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const content = `Your OTP Code is ${otpCode}`;
    await sendWelcomeEmail(user.email, content);
    user.otpCode = otpCode;
    await user.save();
    return user;
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

export const userResolvers = {
  Query: {
    getUsers,
  },

  Mutation: {
    loginUser,
    createUser,
    verifyUser,
    resendOTP,
  },
};
