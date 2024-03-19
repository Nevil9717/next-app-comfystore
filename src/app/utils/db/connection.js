import mongoose from "mongoose";
import { Role, User } from "../models";
async function setupDefaultRoles() {
  try {
    // Check if roles exist
    const adminRole = await Role.findOne({ roleName: "Admin" });
    const sellerRole = await Role.findOne({ roleName: "Seller" });
    const customerRole = await Role.findOne({ roleName: "Customer" });
    // If roles don't exist, create them
    if (!adminRole) {
      await Role.create({ roleName: "Admin" });
      console.log("Admin created successfully.");
    }
    if (!sellerRole) {
      await Role.create({ roleName: "Seller" });
      console.log("Seller created successfully.");
    }
    if (!customerRole) {
      await Role.create({ roleName: "Customer" });
      console.log("Customer created successfully.");
    }
  } catch (error) {
    console.error("Error setting up default roles:", error);
  }
}
const createFirstAdminUser = async () => {
  try {
    const adminRole = await Role.findOne({ roleName: "Admin" });
    if (adminRole) {
      const existingAdminUser = await User.findOne({ role: adminRole._id });
      if (!existingAdminUser) {
        // Create first admin user if it doesn't exist
        await User.create({
          firstName: "admin",
          lastName: "admin",
          email: "admin@gmail.com",
          password: "admin",
          role: adminRole._id,
          isVerified: true,
        });
        console.log("First admin user created.");
      }
    }
  } catch (error) {
    console.error("Error creating first admin user:", error);
  }
};

export const connectDBHandler = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(async () => {
        await setupDefaultRoles();
        await createFirstAdminUser();
        console.log("db connected successfully🚀");
      })
      .catch((err) => console.log("db connection Error = ", err));
  }

  return handler(req, res);
};

const db = mongoose.connection;
db.once("ready", async () => {
  console.log(`connected to mongo on ${process.env.MONGODB_URL}`);
});
