import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pushWatchlist } from "../util/user";

function addStock({ state, stockId }) {
  const newState = state.map((item) => ({ ...item }));
  const itemIndex = newState.findIndex((item) => item.id === stockId);
  if (itemIndex === -1) {
    newState.push({ id: stockId });
  }
  return newState;
}
function remStock({ state, stockId }) {
  const newState = state.map((item) => ({ ...item }));
  const itemIndex = newState.findIndex((item) => item.id === stockId);
  if (itemIndex !== -1) {
    newState.splice(itemIndex, 1);
  }
  return newState;
}
export const updateWatchlist = createAsyncThunk(
  "watchlist/update",
  async ({ stockId, actionType }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user._id;

    const watchlist =
      actionType === "add"
        ? addStock({ state: state.MyWatchlist, stockId })
        : remStock({ state: state.MyWatchlist, stockId });

    const response = await pushWatchlist({ watchlist, userId });
    return response;
  }
);

const WatchlistSlice = createSlice({
  name: "Watchlist",
  initialState: [],
  reducers: {
    setWatchlist: (state, action) => {
      return action.payload;
    },
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
        state.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateWatchlist.fulfilled, (state, action) => {
        return action.payload.user.watchlist;
      })
      .addCase(updateWatchlist.rejected, (state, action) => {
        console.log("Watchlist update failed");
      });
  },
});
export const { addToWatchlist, removeFromWatchlist, setWatchlist } =
  WatchlistSlice.actions;
export default WatchlistSlice.reducer;
