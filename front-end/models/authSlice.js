import { createSlice } from "@reduxjs/toolkit";
import { updatePortfolio } from "./PortfolioSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.status;
    },
    updateBalance: (state, action) => {
      state.user = { ...state.user, balance: action.payload.balance };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePortfolio.fulfilled, (state, action) => {
      const user = action.payload.user ;
      state.user = { ...state.user, balance: user.balance , totalGain:user.totalGain , totalLoss: user.totalLoss };
    });
  },
});
export const { setUser, setAuthenticated, updateBalance } = authSlice.actions;
export default authSlice.reducer;
