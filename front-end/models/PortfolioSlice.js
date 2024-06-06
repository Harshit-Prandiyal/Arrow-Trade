import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pushPortfolio } from "../util/user";
import { updateBalance } from "./authSlice";

function buyStock({ state, stockId, current_price }) {
  const newState = state.map((item) => ({ ...item }));
  const itemIndex = newState.findIndex((item) => item.id === stockId);
  if (itemIndex === -1) {
    newState.push({ id: stockId, qty: 1, price: current_price });
  } else {
    newState[itemIndex].qty += 1;
  }
  return newState;
}
function sellStock({ state, stockId }) {
  const newState = state.map((item) => ({ ...item }));
  const itemIndex = newState.findIndex((item) => item.id === stockId);
  if (itemIndex !== -1) {
    if (newState[itemIndex].qty <= 1) newState.splice(itemIndex, 1);
    else newState[itemIndex].qty -= 1;
  }
  return newState;
}
function getPrice(state, stockId){
  const itemIndex = state.findIndex((item) => item.id === stockId);
  if(itemIndex !== -1){
    return state[itemIndex].price;
  }
  return -1;
}
export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ stockId, current_price, actionType }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user._id;
    const current_balance =
      actionType === "buy"
        ? parseFloat(state.auth.user.balance) - parseFloat(current_price)
        : parseFloat(state.auth.user.balance) + parseFloat(current_price);
        const portfolio =
      actionType === "buy"
        ? buyStock({
            state: state.MyPortfolio,
            stockId,
            current_price,
          })
        : sellStock({ state: state.MyPortfolio, stockId });
    let totalGain=state.auth.user.totalGain;let totalLoss=state.auth.user.totalLoss;
    if(actionType==="sell"){
      let price = getPrice(state.MyPortfolio,stockId);
      if(price===-1)  price=current_price;
      if(current_price>price) totalGain+=current_price-price;
      if(current_price<price) totalLoss+=price-current_price;
    }
    const response = await pushPortfolio({
      portfolio,
      userId,
      current_balance,
      totalGain,
      totalLoss
    });
    return response;
  }
);

const PortfolioSlice = createSlice({
  name: "Portfolio",
  initialState: [],
  reducers: {
    setPortfolio: (state, action) => {
      return action.payload;
    },
    addToPortfolio: (state, action) => {
      const itemId = action.payload.id;
      const cryptoPrice = action.payload.current_price;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        state.push({ id: itemId, qty: 1, price: cryptoPrice });
      } else {
        state[itemIndex].qty = state[itemIndex].qty + 1;
      }
    },
    removeFromPortfolio: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        if (state[itemIndex].qty <= 1) state.splice(itemIndex, 1);
        else state[itemIndex].qty = state[itemIndex].qty - 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        return action.payload.user.portfolio;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        console.log("Portfolio update failed");
        console.log(action.payload);
      });
  },
});
export const { addToPortfolio, removeFromPortfolio, setPortfolio } =
  PortfolioSlice.actions;
export default PortfolioSlice.reducer;
