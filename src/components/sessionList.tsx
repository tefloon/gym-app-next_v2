import React from "react";
import SetRow from "./setRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/setupStore";
import { toggleSelected } from "@/features/selectedSetSlice";
import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";
import { Session } from "inspector";

type SessionListProps = {
  sets: PrismaExerciseSet[];
};

export default function SessionList({ sets }: SessionListProps) {
  return (
    <section className="w-full py-5">
      {sets.map((set, index) => (
        <SetRow key={set.id} {...set} index={index + 1} />
      ))}
    </section>
  );
}
