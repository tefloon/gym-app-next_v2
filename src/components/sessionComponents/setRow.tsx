"use client";

import React, { ChangeEvent, useState } from "react";
import { ExerciseSet as PrismaExerciseSet } from "@prisma/client";
import { RowControlType } from "@/lib/types";
import { handleToggleCompleted } from "@/actions/gymDataAction";
import { useAtom } from "jotai/react";
import { selectedRowAtom } from "@/features/jotaiAtoms";

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
  const [completed, setCompleted] = useState(wasCompleted);
  const [row, setRow] = useAtom(selectedRowAtom);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    handleToggleCompleted(id, !wasCompleted);
    setCompleted(!completed);
  };

  const handleOnSelectRow = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      return; // Exit early if checkbox was clicked
    }
    setRow(id);
    // dispatch(toggleSelected(id));
  };

  const commonSpanClassnames =
    "py-2 border-b border-slate-800 flex flex-row justify-between w-full select-none cursor-pointer hover:bg-slate-900";

  const selectedSpanClasses = "bg-slate-600 hover:bg-slate-700";

  let spanClass =
    row.selectedRow === id
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
        <input
          name="isCompleted"
          type="checkbox"
          checked={completed}
          onChange={(e) => handleOnChange(e, id)}
        />
      </div>
    </span>
  );
}
