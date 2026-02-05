import { GoogleGenerativeAI } from "@google/generative-ai";
import Job from "../model/job.model.js";
import User from "../model/user.model.js";

export const analyzeJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);

    if (!job) return res.json(404).json({ message: `Job not found` });

    if (!job.jobDescription)
      return res
        .status(404)
        .json({ message: `Please add a job description first.` });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: `gemini-3-flash-preview` });

    const user = await User.findById(req.user._id);

    const userResume = user.resumeText || "User has notprovided resume";

    const prompt = `
      Act as an ATS(Applicant Tracking System) expert.

      Job Description: ${job.jobDescription}

      Candidate Resume: ${userResume}

      TASK:
      Compare the resume to the job description.
      Return a JSON object ONLY with the following structure.
      {
        "matchscore" : (number between 1-100),
        "missingKeyword": ["array" , "of" , "strings"],
        tips: "A short , brutal advice what to fix"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanText);

    job.aiAnalysis = analysis;
    await job.save();

    return res.status(200).json({ success: true, analysis, jobId });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "AI error failed", error: error.message });
  }
};
