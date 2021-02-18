import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: String,
  description: Array,
  img: String,
  originalPrice: Number,
  rating: Number,
  seller: String,
  discount: Number,
  stock: Boolean,
  totalStock: Number,
});
export default mongoose.model("products", productSchema);
