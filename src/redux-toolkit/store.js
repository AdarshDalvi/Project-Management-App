import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import selectedProjectIndexReducer from './selectedProjectIndex';

const store = configureStore({
    reducer: {
        project: projectReducer,
        projectIndex: selectedProjectIndexReducer,
    },
});

export default store;
