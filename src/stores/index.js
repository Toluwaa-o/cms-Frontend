import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import ReportSlice from "./ReportSlice";
import UiSlice from "./UiSlice";

const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        report: ReportSlice.reducer,
        ui: UiSlice.reducer
    }
})

export default store