import mongoose from "mongoose";
const deliverySchema = mongoose.Schema({
  orderid: String,
});
export default mongoose.model("delivery", deliverySchema);
