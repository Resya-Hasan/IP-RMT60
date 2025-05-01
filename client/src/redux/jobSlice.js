import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import http from "../helpers/http"
import handleError from "../helpers/handleError"

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get("/jobs")
      return data
    } catch (err) {
      handleError(err)
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const jobReducer = jobSlice.reducer
