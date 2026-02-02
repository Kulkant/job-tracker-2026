import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    createdBy: {
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
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },

    jobDescription: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "Remote", //Remote , hybrid or city
    },
    salary: {
      type: String, // 5LPA - 8LPA
      default: "Not disclosed",
    },
    aiAnalysis: {
      matchScore: {
        type: Number,
        default: 0,
      },
      missingKeywords: {
        type: [String], //["Docker" , "Redis" , "System Design"]
        default: [],
      },
      tips: {
        type: String,
        default: "Run AI analysis to get tips",
      },
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
