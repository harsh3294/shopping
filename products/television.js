import mongoose from "mongoose";
const televisionSchema = mongoose.Schema({
  name: String,
  description: Array,
  img: String,
  originalPrice: Number,
  rating: Number,
  seller: String,
  discount: Number,
  stock: Boolean,
  totalStock: Number,
  category: String,
  deliveredBy: Number,
});
export default mongoose.model("television", televisionSchema);
