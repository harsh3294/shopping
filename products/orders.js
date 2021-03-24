import mongoose from "mongoose";
const ordersSchema = mongoose.Schema({
  uid: String,
  orderId: String,
  date: String,
  orderList: Array,
  status: Number,
  deliveredDate: String,
  orderTotal: Number,
  placedBy: Array,
});
export default mongoose.model("orders", ordersSchema);
