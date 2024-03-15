import mongoose from "mongoose";

const catagoriesSchema = new mongoose.Schema({
  catagoriesName: {
    type: String,
    required: true,
  },
});

const Catagories =
  mongoose.models.Catagories || mongoose.model("Catagories", catagoriesSchema);

export default Catagories;
