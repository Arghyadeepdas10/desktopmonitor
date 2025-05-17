import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../Slice/employeeSlice';
export const Store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
});

