import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const { data } = await axios.get("/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.jobs);
      return data.jobs;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    totalPages: 1,
    page: 1,
    error: "",
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
      });
  },
});

export default allJobsSlice.reducer;
