import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  colorName: {
    type: String,
    required: true,
  },
});

const Color = mongoose.models.Color || mongoose.model("Color", colorSchema);

export default Color;
