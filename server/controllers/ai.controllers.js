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
      Act as an expert Technical Recruiter and ATS (Applicant Tracking System) optimizer.

      Job Description: ${job.jobDescription}

      Candidate Resume: ${userResume}

      TASK:
      Analyze the match between the resume and the job description.
      Identify critical gaps that would cause an automatic rejection.
      OUTPUT INSTRUCTIONS:
      Return a JSON object ONLY. No markdown, no explanations outside the JSON.
      Structure:
      {
        "matchScore": (integer 0-100),
        "missingKeywords": ["keyword1", "keyword2", "keyword3"], (List top 5 technical skills found in JD but missing in Resume),
        "tips": "One specific, actionable sentence on how to improve the resume for this specific role. Mention exactly where to add the missing keywords."
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
    return res
      .status(500)
      .json({ message: "AI error failed", error: error.message });
  }
};
