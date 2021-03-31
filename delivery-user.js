import mongoose from "mongoose";
const deliveryUsersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  uid: String,
});
export default mongoose.model("delivery-user", deliveryUsersSchema);
