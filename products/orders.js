import mongoose from "mongoose";
const ordersSchema = mongoose.Schema({
  uid: String,
  date: String,
  orderList: Array,
  status: Number,
  deliveredDate: String,
  placedBy: Array,
});
export default mongoose.model("orders", ordersSchema);
