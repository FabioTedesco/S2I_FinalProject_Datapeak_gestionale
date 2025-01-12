import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, deleteUser, createUser } from "../../services/auth";

const initialState = {
  users: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore");
    }
  }
);

export const deleteOperatore = createAsyncThunk(
  "auth/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore");
    }
  }
);

export const createOperatore = createAsyncThunk(
  "auth/createUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await createUser(user);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Errore");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteOperatore.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // Create User
      .addCase(createOperatore.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export const { setStatus } = adminSlice.actions;
export default adminSlice.reducer;
