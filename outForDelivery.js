import mongoose from "mongoose";
const outForDeliverySchema = mongoose.Schema({
  orderid: String,
  placedBy: Array,
  deliveryBoyUid: String,
  //   firstname: String,
  //   lastname: String,
});
export default mongoose.model("outForDelivery", outForDeliverySchema);
