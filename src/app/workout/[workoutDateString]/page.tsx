import { handleReturnWorkoutByDate } from "@/actions/addSessionAction";
import React from "react";
import EmptyWorkoutComponent from "@/components/workoutComponents/emptyWorkoutComponent";
import { WorkoutWithExercisesAndPerson } from "@/lib/types";
import ExistingWorkoutComponent from "@/components/workoutComponents/existingWorkoutComponent";

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
    return (
      <>
        <div>Invalid date</div>
        <div>{params.workoutDateString}</div>
      </>
    );
  }

  const date = new Date(params.workoutDateString);

  const workout = (await handleReturnWorkoutByDate(
    date
  )) as WorkoutWithExercisesAndPerson | null;

  // if (!workout) return <div>Workout not found</div>;

  const exerciseSessions = workout ? workout.exercises : [];

  return (
    <div className="min-w-[400px] flex flex-col items-center">
      {workout ? (
        <ExistingWorkoutComponent exerciseSessions={exerciseSessions} />
      ) : (
        <EmptyWorkoutComponent />
      )}
    </div>
  );
}
