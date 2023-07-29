import { createSlice } from "@reduxjs/toolkit";

const WatchlistSlice = createSlice({
  name: "Watchlist",
  initialState: [],
  reducers: {
    addToWatchlist: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        state.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state = state.splice(itemIndex, 1);
      }
    },
  },
});
export const { addToWatchlist, removeFromWatchlist } = WatchlistSlice.actions;
export default WatchlistSlice.reducer;
