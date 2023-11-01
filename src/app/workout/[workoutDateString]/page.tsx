import { handleReturnWorkoutByDate } from "@/actions/addSessionAction";
import MyCard from "@/components/generalComponents/myCard";
import React from "react";
import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
  ExerciseType as PrismaExerciseType,
  Workout as PrismaWorkout,
  Person as PrismaPerson,
} from "@prisma/client";
import SessionList from "@/components/sessionComponents/reduxSessionComponents/sessionList";

type ExerciseSetWithSession = PrismaExerciseSet & {
  session: PrismaExerciseSession;
};

type ExerciseSessionWithSetsAndType = PrismaExerciseSession & {
  sets: ExerciseSetWithSession[];
  type: PrismaExerciseType;
};

type WorkoutWithExercisesAndPerson = PrismaWorkout & {
  exercises: ExerciseSessionWithSetsAndType[];
  person: PrismaPerson;
};

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

  if (!workout) return <div>Workout not found</div>;

  const exerciseSessions = workout.exercises;

  // console.log(exerciseSessions);

  return (
    <div className="min-w-[400px]">
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
    </div>
  );
}
