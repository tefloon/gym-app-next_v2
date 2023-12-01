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
  dateString: string;
};

export default function WorkoutView({ workout, dateString }: WorkoutViewType) {
  const [, setCurrentWorkout] = useAtom(workoutAtom);

  // const dateStringISO = new Date(dateString).toISOString();

  // console.log(`Date String in WorkoutView: ${dateStringISO}`);

  if (!workout) {
    return <EmptyWorkoutComponent />;
  }

  const exerciseSessions = workout.exercises;
  console.log(exerciseSessions);

  useEffect(() => {
    const workoutDateString = DateTime.fromJSDate(workout.date)
      .setZone("Europe/Warsaw")
      .toFormat("yyyy-MM-dd")
      .toString();

    setCurrentWorkout({
      id: workout.id,
      date: workoutDateString,
    });
  }, []);

  return (
    <div className="min-w-[400px] flex flex-col items-center">
      <ExistingWorkoutComponent exerciseSessions={exerciseSessions} />
    </div>
  );
}
