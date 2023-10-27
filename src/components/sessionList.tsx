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

// const sets = [
//   {
//     id: "kasia",
//     sessionId: "abc",
//     weight: 50,
//     reps: 10,
//     wasCompleted: false,
//   },
//   {
//     id: "basia",
//     sessionId: "abc",
//     weight: 50,
//     reps: 9,
//     wasCompleted: false,
//   },
//   {
//     id: "tomek",
//     sessionId: "abc",
//     weight: 50,
//     reps: 8,
//     wasCompleted: false,
//   },
//   {
//     id: "bozena",
//     sessionId: "abc",
//     weight: 50,
//     reps: 7,
//     wasCompleted: false,
//   },
// ];

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
