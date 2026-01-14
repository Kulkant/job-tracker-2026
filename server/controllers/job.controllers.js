import Job from "../model/job.model.js";

export const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user;
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
    console.error("CREATE JOB ERROR:", error); // <--- important
    return res.status(500).json({
      success: false,
      message: "Job creation failed",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user });
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
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job doesn't exist. Please provide corret Id" });
    }

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .status({ success: false, message: "Not authorized" });
    }

    res.status(200).json({ success: false, message: "Job deleted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Job deletiion failed",
      error: error.message,
    });
  }
};
