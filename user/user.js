import mongoose from "mongoose";
const usersSchema = mongoose.Schema({
  name: String,
  uid: String,
});
export default mongoose.model("users", usersSchema);
