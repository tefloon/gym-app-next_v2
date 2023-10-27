import React from "react";
import SetRow from "./setRow";
import { SetType, RowControlType } from "@/lib/types";

const sets = [
  {
    id: "kasia",
    sessionId: "abc",
    weight: 50,
    reps: 10,
  },
  {
    id: "basia",
    sessionId: "abc",
    weight: 50,
    reps: 9,
  },
  {
    id: "tomek",
    sessionId: "abc",
    weight: 50,
    reps: 8,
  },
  {
    id: "bozena",
    sessionId: "abc",
    weight: 50,
    reps: 7,
  },
];

export default function SessionList({
  index,
  isRowSelected,
  selectedRow,
}: RowControlType) {
  const rowControl = {
    index: index,
    isRowSelected: isRowSelected,
    selectedRow: selectedRow,
  };

  const combinedProps = [...sets].map((obj, index) => ({
    index: rowControl.index,
    isRowSelected: isRowSelected,
    selectedRow: selectedRow,
    ...obj, // Use spread operator to merge properties
  }));

  return (
    <section className="w-full py-5">
      {combinedProps.map((s, index) => (
        <SetRow key={s.id} {...s} index={index + 1} />
      ))}
    </section>
  );
}
