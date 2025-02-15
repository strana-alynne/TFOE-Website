import mongoose, { Schema } from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    name_extensions: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    datejoined: {
      type: Date,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    contribution: {
      type: String, // Changed from Number to String
      required: true,
    },
    absences: {
      type: String, // Changed from Number to String
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Member = mongoose.models.member || mongoose.model("member", memberSchema);

export default Member;
