import {
  Person as PrismaPerson,
  Workout as PrismaWorkout,
  ExerciseSession as PrismaExerciseSession,
  ExerciseSet as PrismaExerciseSet,
  ExerciseType as PrismaExerciseType,
} from "@prisma/client";

export type SetType = {
  id: string;
  sessionId: string;
  weight: number;
  reps: number;
  isCompleted?: boolean;
};

export type RowControlType = {
  index: number;
};

export type WorkoutDetails = PrismaWorkout & {
  sessions: PrismaExerciseSession[];
};

type ExerciseSetWithSession = PrismaExerciseSet & {
  session: PrismaExerciseSession;
};

export type ExerciseSessionWithSetsAndType = PrismaExerciseSession & {
  sets: ExerciseSetWithSession[];
  type: PrismaExerciseType;
};

export type WorkoutWithExercisesAndPerson = PrismaWorkout & {
  exercises: ExerciseSessionWithSetsAndType[];
  person: PrismaPerson;
};
