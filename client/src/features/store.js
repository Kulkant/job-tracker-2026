import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import jobReducer from "./slices/jobSlice.js";
import allJobsReducer from "./slices/allJobsSlice.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});

export default store;
