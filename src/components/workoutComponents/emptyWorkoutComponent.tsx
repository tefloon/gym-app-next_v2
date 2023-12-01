"use client";

import { useEffect, useState } from "react";
import {
  ExerciseSessionWithSetsAndType,
  WorkoutWithExercisesAndPerson,
} from "@/lib/types";
import { createId } from "@paralleldrive/cuid2";
import {
  handleCreateWorkout,
  handleReturnFullWorkoutId,
} from "@/actions/gymDataAction";
import { currentUserAtom } from "@/features/jotaiAtoms";
import { useAtom } from "jotai";

import SessionView from "../sessionComponents/sessionView";

type EmptyWorkoutProps = {
  dateString?: string;
};

export default function EmptyWorkoutComponent({
  dateString,
}: EmptyWorkoutProps) {
  // const [currentUser] = useAtom(currentUserAtom);
  // const [currentWorkoutId, setCurrentWorkoutId] = useState("");

  // const emptySession: ExerciseSessionWithSetsAndType = {
  //   id: "",
  //   order: 0,
  //   workoutId: workoutId,
  //   typeId: -1,
  //   type: {
  //     id: -1,
  //     name: "",
  //     personalBest: null,
  //   },
  //   sets: [],
  // };

  // useEffect(() => {
  //   console.log(
  //     `Date String in useEffect in EmptyWorkoutCmponent: ${dateString}`
  //   );
  //   async function createWorkout() {
  //     const newWorkoutId = await handleCreateWorkout(
  //       currentUser.id,
  //       dateString
  //     );
  //     if (!(newWorkoutId instanceof Error)) {
  //       setCurrentWorkoutId(newWorkoutId as string);
  //     }
  //   }
  //   createWorkout();
  // }, []);

  // const handleAddExercise = async () => {
  //   // Add a session to the workout
  // };

  return (
    <div className="w-[200px] flex flex-col items-center mt-5 gap-3">
      {/* <SessionView {...currentWorkout.exercises} /> */}
      {/* <div>{currentWorkoutId}</div> */}
      <div className="block h-56"></div>
      <button className="w-full bg-green-700 py-2 px-5  rounded-sm font-bold uppercase text-sm">
        Add Exercise
      </button>
      <button className="w-full bg-blue-700 py-2 px-5 rounded-sm font-bold uppercase text-sm">
        Copy Workout
      </button>
    </div>
  );
}
