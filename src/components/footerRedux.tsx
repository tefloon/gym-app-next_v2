"use client";

import React from "react";
import { RootState } from "@/redux/setupStore";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelected } from "@/features/selectedSetSlice";

export default function FooterRedux() {
  const currentState = useSelector((state: RootState) => state.set);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <button onClick={() => dispatch(toggleSelected(5))}>Toggle 5</button>
      </div>
      <div>Is selected? {currentState.isSelected}</div>
      <div>What is selected? {currentState.selectedSet}</div>
    </>
  );
}
