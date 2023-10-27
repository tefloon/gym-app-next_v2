"use client";

import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/setupStore";
import { toggleSelected } from "@/features/selectedSetSlice";
import { ExerciseSet as PrismaExerciseSet } from "@prisma/client";
import { RowControlType } from "@/lib/types";

type SetRowProps = RowControlType & PrismaExerciseSet;

export default function SetRow({
  index,
  id,
  order,
  wasCompleted = false,
  weight,
  reps,
  sessionId,
}: SetRowProps) {
  const dispatch = useDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log("Oznaczam");
  };

  const handleOnSelectRow = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      return; // Exit early if checkbox was clicked
    }
    dispatch(toggleSelected(index));
  };

  const currentState = useSelector((state: RootState) => state.set);

  const commonSpanClassnames =
    "py-2 border-b border-slate-600 flex flex-row justify-between w-full";

  const selectedSpanClasses = "bg-slate-400";

  let spanClass =
    currentState.selectedSet === index
      ? commonSpanClassnames + " " + selectedSpanClasses
      : commonSpanClassnames;

  return (
    <span className={spanClass} onClick={handleOnSelectRow}>
      <div>
        <span className="font-bold text-md px-5">{index}</span>
      </div>
      <div className="flex flex-row items-baseline justify-center grow">
        <span className="font-bold text-md">{weight}</span>
        <span className="text-xs font-extralight pl-1">kg</span>
      </div>
      <div className="flex flex-row items-baseline justify-center w-16">
        <span className="font-bold text-md">{reps}</span>
        <span className="text-xs font-extralight pl-1">reps</span>
      </div>
      <div className="px-3">
        <input name="isCompleted" type="checkbox" onChange={handleOnChange} />
      </div>
    </span>
  );
}
