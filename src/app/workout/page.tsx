import { handleReturnFullWorkoutByDate } from "@/actions/gymDataAction";
import MyCard from "@/components/generalComponents/myCard";
import { Workout } from "@prisma/client";
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

export default async function Workout() {
  // 2023-10-27 16:48:23.122
  const date = new Date("2023-10-27");
  // console.log(date);

  const workout = (await handleReturnFullWorkoutByDate(
    date
  )) as WorkoutWithExercisesAndPerson | null;

  if (!workout) return <div>Workouts not found</div>;

  const exerciseSessions = workout.exercises;

  return <div>Just WORKOUT route</div>;
}
