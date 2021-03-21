import mongoose from "mongoose";
const mensWearSchema = mongoose.Schema({
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
  size: Array,
  color: Array,
  deliveredBy: Number,
});
export default mongoose.model("menswear", mensWearSchema);
