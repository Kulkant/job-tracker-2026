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
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    company: "",
    role: "",
    status: "Applied",
    statusOptions: ["Applied", "Interview", "Offer", "Rejected"],
    isLoading: false,
    error: "",
    isSuccess: false,
  },
  reducers: {
    clearValues: (state) => {
      state.company = "";
      state.role = "";
      state.status = "Applied";
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
        state.company = action.payload.job.company;
        state.role = action.payload.job.role;
        state.status = action.payload.job.status;
        state.isSuccess = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearValues, changeField } = jobSlice.actions;
export default jobSlice.reducer;
