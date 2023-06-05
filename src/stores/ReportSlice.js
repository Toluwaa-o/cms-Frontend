import { createSlice } from "@reduxjs/toolkit";

const ReportSlice = createSlice({
  name: "report",
  initialState: {
    report: null,
  },
  reducer: {
    getReport(state, action) {
      state.report = action.payload;
    },
  },
});

export const ReportActions = ReportSlice.actions;
export default ReportSlice;
