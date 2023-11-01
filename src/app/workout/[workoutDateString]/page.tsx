import { handleReturnWorkoutByDate } from "@/actions/addSessionAction";
import React from "react";
import EmptyWorkoutComponent from "@/components/workoutComponents/emptyWorkoutComponent";
import { WorkoutWithExercisesAndPerson } from "@/lib/types";
import ExistingWorkoutComponent from "@/components/workoutComponents/existingWorkoutComponent";
import { useAtom } from "jotai";
import { workoutAtom } from "@/features/jotaiAtoms";
import WorkoutView from "@/components/workoutComponents/workoutView";

export default async function WorkoutByDate({
  params,
}: {
  params: { workoutDateString: string };
}) {
  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(dateString);
  };

  if (!params.workoutDateString || !isValidDate(params.workoutDateString)) {
    return <div>Invalid date: {params.workoutDateString}</div>;
  }

  const date = new Date(params.workoutDateString);

  const workout = (await handleReturnWorkoutByDate(
    date
  )) as WorkoutWithExercisesAndPerson | null;

  // let workoutLocal = workout ? JSON.stringify(workout) : null

  // Starting with this moment we operate on a sessionStorage version

  return <WorkoutView workout={workout} />;
}
