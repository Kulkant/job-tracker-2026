import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
