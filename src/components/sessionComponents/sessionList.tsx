import React from "react";
import SetRow from "./setRow";

import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";

type SessionListProps = {
  sets: PrismaExerciseSet[];
};

export default function SessionList({ sets }: SessionListProps) {
  const sortedSets = sets.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <>
      <section className="w-full py-5">
        {sortedSets.map((set, index) => (
          <SetRow key={set.id} {...set} index={index + 1} />
        ))}
      </section>
    </>
  );
}
