import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employees',
    initialState: [],
    reducers: {
        addEmployee: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
