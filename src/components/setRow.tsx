"use client";

import React, { ChangeEvent } from "react";
import { SetType, RowControlType } from "@/lib/types";

type SetRowProps = RowControlType & SetType;

export default function SetRow({
  index,
  isRowSelected,
  selectedRow,
  id,
  sessionId,
  weight,
  reps,
  isCompleted = false,
}: SetRowProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the set
  };

  return (
    <span className="py-2 border-b border-slate-600 flex flex-row justify-between w-full">
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
