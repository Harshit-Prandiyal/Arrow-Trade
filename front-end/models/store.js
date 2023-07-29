import { configureStore } from "@reduxjs/toolkit";
import PortfolioSliceReducer from "./PortfolioSlice";
import WatchlistSliceReducer from './WatchlistSlice';
export const store = configureStore({
    reducer:{
        MyPortfolio:PortfolioSliceReducer,
        MyWatchlist : WatchlistSliceReducer,
    }
});