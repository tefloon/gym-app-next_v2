import React from "react";
import {
  ExerciseSessionWithSetsAndType,
  WorkoutWithExercisesAndPerson,
} from "@/lib/types";
import MyCard from "../generalComponents/myCard";

type ExistingWorkoutType = {
  exerciseSessions: ExerciseSessionWithSetsAndType[];
};

export default function ExistingWorkoutComponent({
  exerciseSessions,
}: ExistingWorkoutType) {
  return (
    <div className="w-full">
      <>
        {exerciseSessions.map((session) => (
          <MyCard key={session.id} title={session.type.name}>
            {session.sets.map((set, index) => (
              <span
                key={set.id}
                className="py-2 border-b border-slate-600 flex flex-row justify-between w-full select-none last:border-b-0 cursor-pointer hover:bg-slate-900"
              >
                <div>
                  <span className="font-bold text-md px-5">{index + 1}</span>
                </div>
                <div className="flex flex-row items-baseline justify-center grow">
                  <span className="font-bold text-md">{set.weight}</span>
                  <span className="text-xs font-extralight pl-1">kg</span>
                </div>
                <div className="flex flex-row items-baseline justify-center w-16">
                  <span className="font-bold text-md">{set.reps}</span>
                  <span className="text-xs font-extralight pl-1">reps</span>
                </div>
              </span>
            ))}
          </MyCard>
        ))}
      </>
    </div>
  );
}
