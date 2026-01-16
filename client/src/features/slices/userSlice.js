import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";

// Register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.post("/auth/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await customFetch.post("/auth/login", userData);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

//update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUserData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await customFetch.patch(
        "/auth/update",
        updatedUserData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  isUpdating: false,
  isUpdateSuccess: false,
  profileForm: {
    name: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    changeField: (state, action) => {
      const { name, value } = action.payload;
      state.profileForm[name] = value;
    },
    setProfileFormFromUser: (state) => {
      if (state.user) {
        state.profileForm = {
          name: state.user.name || "",
          email: state.user.email || "",
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.user.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.user.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUpdating = true;
        state.message = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = action.payload;
        state.profileForm = {
          name: action.payload.name,
          email: action.payload.email,
        };
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.isUpdateSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdating = false;
        state.message = action.payload;
        state.isUpdateSuccess = false;
      });
  },
});

export const { logout, reset, changeField, setProfileFormFromUser } =
  userSlice.actions;
export default userSlice.reducer;
