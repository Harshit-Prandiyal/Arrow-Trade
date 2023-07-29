import { createSlice } from "@reduxjs/toolkit";

const PortfolioSlice = createSlice({
  name: "Portfolio",
  initialState: [],
  reducers: {
    addToPortfolio: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        state.push(action.payload);
      }
    },
    removeFromPortfolio: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state = state.splice(itemIndex, 1);
      }
    },
  },
});
export const { addToPortfolio, removeFromPortfolio } = PortfolioSlice.actions;
export default PortfolioSlice.reducer;
