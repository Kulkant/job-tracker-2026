import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
// Create a job
export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user; // read token from Redux
      if (!token) throw new Error("No token found");

      const { data } = await customFetch.post("/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  },
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    company: "",
    role: "",
    status: "Applied",
    statusOptions: ["Applied", "Interview", "Offer", "Rejected"],
    jobDescription: "",
    salary: "",
    location: "Remote",
    isLoading: false,
    error: "",
    isSuccess: false,
  },
  reducers: {
    clearValues: (state) => {
      state.company = "";
      state.role = "";
      state.status = "Applied";
      state.jobDescription = "";
      state.location = "Remote";
      state.salary = "";
      state.isSuccess = false;
    },
    changeField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const job = action.payload.job;

        state.company = job.company;
        state.role = job.role;
        state.status = job.status;
        state.jobDescription = job.jobDescription;
        state.salary = job.salary;
        state.location = job.location;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearValues, changeField } = jobSlice.actions;
export default jobSlice.reducer;
