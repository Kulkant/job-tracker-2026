import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../controllers/job.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, createJob).get(protect, getAllJobs);
router.route("/:id").patch(protect, updateJob).delete(protect, deleteJob);

export default router;
