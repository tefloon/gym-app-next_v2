import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
  ExerciseType as PrismaExerciseType,
  Workout as PrismaWorkout,
} from "@prisma/client";

import {
  handleReturnSession,
  handleReturnWorkoutDatesByUser,
} from "@/actions/addSessionAction";

import MyCalendar from "@/components/calendarComponents/calendar";
import SessionView from "@/components/sessionComponents/sessionView";
import { ExerciseSessionWithSetsAndType } from "@/lib/types";

type AddSessionProps = {
  workoutId: string;
  exerciseTypeId: number;
};

export default async function AddSession() {
  // const WorkoutId = createId();
  const WorkoutId = "c65ef181-4f7e-46e8-91e4-a34cc7584607";
  const SessionId = "030b7acd-ed30-4e02-aaca-da29e0a582af";
  const TypeID = 1;

  const currentSessionData = (await handleReturnSession(
    SessionId
  )) as ExerciseSessionWithSetsAndType;

  const dates =
    (await handleReturnWorkoutDatesByUser("antoni.gawlikowski@gmail.com")) ||
    [];

  return (
    <div className="w-96">
      <MyCalendar dates={dates} />
      <SessionView {...currentSessionData} />
    </div>
  );
}
