import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice containing reducers for employees list
 */
export const employeesSlice = createSlice({
  name: "employees",
  initialState: { employeesList: [] },
  reducers: {
    addEmployee: (state, action) => {
      state.employeesList = [...state.employeesList, action.payload];
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
