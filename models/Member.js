import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    name_extensions: { type: String },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    contact: { type: String, required: true },
    status: { type: String, required: true },
    position: { type: String, required: true, default: "" },
    contribution: { type: String, required: true, default: "0" },
    absences: { type: String, required: true, default: "0" },
    profession: { type: String, required: true },
    feedback: { type: String, required: true, default: "" },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password should be at least 6 characters"],
      select: false,
    },
    // …no datejoined here…
  },
  {
    timestamps: { createdAt: "datejoined", updatedAt: "updatedAt" },
  }
);

const Member = mongoose.models.member || mongoose.model("member", memberSchema);
export default Member;
