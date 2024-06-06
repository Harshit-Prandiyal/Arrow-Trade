import { configureStore } from "@reduxjs/toolkit";
import PortfolioSliceReducer from "./PortfolioSlice";
import WatchlistSliceReducer from './WatchlistSlice';
import authSliceReducer from "./authSlice";

export const store = configureStore({
    reducer:{
        MyPortfolio:PortfolioSliceReducer,
        MyWatchlist : WatchlistSliceReducer,
        auth: authSliceReducer,
    }
});