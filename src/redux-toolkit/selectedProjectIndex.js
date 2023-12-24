import { createSlice } from '@reduxjs/toolkit';

const storedIndex = JSON.parse(localStorage.getItem('projectIndex'));
const initialState = {
    selectedIndex: Number.isInteger(storedIndex) ? storedIndex : null,
};

const selectedProjectIndexSlice = createSlice({
    name: 'projectIndex',
    initialState,
    reducers: {
        updateSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload;
            localStorage.setItem(
                'projectIndex',
                JSON.stringify(state.selectedIndex)
            );
        },
    },
});

export const { updateSelectedIndex } = selectedProjectIndexSlice.actions;
export default selectedProjectIndexSlice.reducer;
