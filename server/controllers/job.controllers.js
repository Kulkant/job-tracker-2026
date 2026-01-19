import Job from "../model/job.model.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user._id;
    const { company, role, status, createdBy } = req.body;

    const job = await Job.create({
      createdBy,
      company,
      role,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Job creation failed",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      message: "All jobs fetched",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Jobs fetched failed",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job doesn't exist" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job update failed",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job doesn't exist. Please provide corret Id" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Job deletiion failed",
      error: error.message,
    });
  }
};

//AGGREGATION PIPELINE:
// We group jobs by status to calculate the stats server-side
// This reduces the paylod sent to the server (Performance Organization)

export const showStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
      { $group: { _id: `$status`, count: { $sum: 1 } } },
    ]);

    const objectStats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;

      return acc;
    }, {});

    const defaultStats = {
      applied: objectStats.Applied || 0,
      interview: objectStats.Interview || 0,
      offer: objectStats.Offer || 0,
      declined: objectStats.Declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $group: {
          _id: {
            year: { $year: `$createdAt` },
            month: { $month: `$createdAt` },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 }, //last six months only
    ]);

    //format for frontend (e.g. "Jan 2026")
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = moment()
          .month(month - 1)
          .year(year)
          .format(`MMM Y`);

        return { date, count };
      })
      .reverse(); //show oldest to newest chart

    res.status(200).json({ defaultStats, monthlyApplications });
  } catch (error) {
    return res.status(500).json({ message: `Sever Error` });
  }
};
