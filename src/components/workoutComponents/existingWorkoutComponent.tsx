"use client";

import React from "react";
import {
  ExerciseSessionWithSetsAndType,
  WorkoutWithExercisesAndPerson,
} from "@/lib/types";
import MyCard from "../generalComponents/myCard";
import { useRouter } from "next/navigation";
import {
  selectedRowAtom,
  selectedSessionAtom,
  workoutAtom,
} from "@/features/jotaiAtoms";
import { useAtom } from "jotai";
import SessionView from "../sessionComponents/sessionView";

type ExistingWorkoutType = {
  exerciseSessions: ExerciseSessionWithSetsAndType[];
};

export default function ExistingWorkoutComponent({
  exerciseSessions,
}: ExistingWorkoutType) {
  const [selectedSession, setSelectedSession] = useAtom(selectedSessionAtom);
  const [currentWorkout, setCurrentWorkout] = useAtom(workoutAtom);

  const handleSessionClick = (session: ExerciseSessionWithSetsAndType) => {
    setSelectedSession({ isSelected: true, selectedSessionId: session.id });
  };

  const sesionToShow = exerciseSessions.find(
    (item) => item.id === selectedSession.selectedSessionId
  );

  return (
    <div className="w-full">
      {sesionToShow ? (
        <SessionView {...sesionToShow} />
      ) : (
        <>
          {exerciseSessions.map((session) => (
            <MyCard
              key={session.id}
              title={session.type.name}
              onClick={() => handleSessionClick(session)}
            >
              {session.sets.map((set, index) => (
                <span
                  key={set.id}
                  className="py-2 border-b border-slate-600 flex flex-row justify-between w-full select-none last:border-b-0"
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
      )}
    </div>
  );
}
