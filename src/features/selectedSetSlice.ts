import { createSlice, nanoid } from "@reduxjs/toolkit";

export const selectedSetSlice = createSlice({
  name: "selectedSet",
  initialState: {
    isSelected: false,
    selectedSet: -1,
  },
  reducers: {
    toggleSelected: (state, action) => {
      const newSelectedSet = action.payload;

      // we selected an already selected state
      if (state.isSelected && newSelectedSet === state.selectedSet) {
        state.selectedSet = -1;
        state.isSelected = false;
      } else {
        state.isSelected = true;
        state.selectedSet = action.payload;
      }
    },
  },
});

export const { toggleSelected } = selectedSetSlice.actions;

export default selectedSetSlice.reducer;
