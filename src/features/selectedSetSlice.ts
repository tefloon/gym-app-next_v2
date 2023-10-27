import { createSlice, nanoid } from "@reduxjs/toolkit";

export const selectedSetSlice = createSlice({
  name: "selectedSet",
  initialState: {
    isSelected: false,
    selectedSet: "",
  },
  reducers: {
    toggleSelected: (state, action) => {
      const newSelectedSet = action.payload;

      // we selected an already selected state
      if (state.isSelected && newSelectedSet === state.selectedSet) {
        state.selectedSet = "";
        state.isSelected = false;
      } else {
        state.isSelected = true;
        state.selectedSet = action.payload;
      }
    },
    clearSelection: (state) => {
      state.isSelected = false;
      state.selectedSet = "";
    },
  },
});

export const { toggleSelected, clearSelection } = selectedSetSlice.actions;

export default selectedSetSlice.reducer;
