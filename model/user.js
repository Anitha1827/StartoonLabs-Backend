import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  gender: {
    type: "string",
    required: true,
  },
  count: {
    type: Number,
  },
  lastLoginDate: {
    type: "string",
  },
});

let User = mongoose.model("User", userSchema);
export { User };
