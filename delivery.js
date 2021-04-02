import mongoose from "mongoose";
const deliverySchema = mongoose.Schema({
  orderid: String,
  placedBy: Array,
});
export default mongoose.model("delivery", deliverySchema);
