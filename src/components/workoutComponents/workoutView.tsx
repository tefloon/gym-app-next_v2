"use client";

import React, { useEffect } from "react";
import ExistingWorkoutComponent from "./existingWorkoutComponent";
import EmptyWorkoutComponent from "./emptyWorkoutComponent";
import { WorkoutWithExercisesAndPerson } from "@/lib/types";
import { useAtom } from "jotai";
import { workoutAtom, selectedSessionAtom } from "@/features/jotaiAtoms";
import { DateTime } from "luxon";

type WorkoutViewType = {
  workout: WorkoutWithExercisesAndPerson | null;
};

export default function WorkoutView({ workout }: WorkoutViewType) {
  const CURRENT_WORKOUT_KEY = "currentWorkout";
  const [, setCurrentWorkout] = useAtom(workoutAtom);

  if (!workout) {
    return <EmptyWorkoutComponent />;
  }

  sessionStorage.setItem(CURRENT_WORKOUT_KEY, JSON.stringify(workout));

  const localWorkout = sessionStorage.getItem(CURRENT_WORKOUT_KEY);

  const exerciseSessions = workout.exercises;

  useEffect(() => {
    const workoutDateString = DateTime.fromJSDate(workout.date)
      .setZone("Europe/Warsaw")
      .toFormat("yyyy-MM-dd")
      .toString();

    setCurrentWorkout({
      id: workout.id,
      dateString: workoutDateString,
    });
  }, []);

  // setTest({
  //   dateString: "aslkdjasld",
  //   id: "aisuijdh",
  // });

  return (
    <div className="min-w-[400px] flex flex-col items-center">
      <ExistingWorkoutComponent exerciseSessions={exerciseSessions} />
    </div>
  );
}
