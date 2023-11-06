import React from "react";
import { handleReturnWorkoutByDate } from "@/actions/gymDataAction";
import { WorkoutWithExercisesAndPerson } from "@/lib/types";
import WorkoutView from "@/components/workoutComponents/workoutView";
import { DateTime } from "luxon";

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

  // Starting with this moment we operate on a sessionStorage version
  const dateLocal = DateTime.fromISO(params.workoutDateString).toLocaleString();

  return (
    <>
      <h1 className="mt-5 text-2xl">{dateLocal}</h1>
      <WorkoutView workout={workout} />
    </>
  );
}
