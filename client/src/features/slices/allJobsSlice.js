import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.jobs;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "allJobs/delteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`/api/v1/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return jobId;
    } catch (error) {
      return rejectWithValue(error?.resposne?.data?.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  "allJobs/updateJob",
  async ({ jobData, jobId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(`/api/v1/jobs/${jobId}`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.job;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getStats = createAsyncThunk(
  "allJobs/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/v1/jobs/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: {
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
    jobs: [],
    totalJobs: 0,
    totalPages: 1,
    page: 1,
    error: "",
    isEditing: false,
    editJobData: null,
    stats: {},
    monthlyApplications: [],
  },
  reducers: {
    setEditJob: (state, action) => {
      state.isEditing = true;
      state.editJobData = action.payload;
    },
    clearEditJob: (state) => {
      state.isEditing = false;
      state.editJobData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
        state.totalJobs = action.payload.length;
        state.totalPages = Math.ceil(action.payload.length / 5);
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isDeleting = true;
        state.error = "";
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
        state.totalJobs = state.jobs.length;
        state.totalPages = Math.ceil(state.jobs.length / 5);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })
      .addCase(updateJob.pending, (state) => {
        state.isUpdating = true;
        state.error = "";
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.jobs = state.jobs.map((job) =>
          job._id == action.payload._id ? action.payload : job
        );
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      .addCase(getStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.defaultStats;
        state.monthlyApplications = action.payload.monthlyApplications;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEditJob, clearEditJob } = allJobsSlice.actions;
export default allJobsSlice.reducer;
