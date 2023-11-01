import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
  ExerciseType as PrismaExerciseType,
  Workout as PrismaWorkout,
} from "@prisma/client";

import {
  handleReturnSession,
  handleReturnWorkoutsByUser,
  handleReturnWorkoutsDatesByUser,
} from "@/actions/addSessionAction";

import MyCalendar from "@/components/calendarComponents/calendar";
import SessionView from "@/components/sessionComponents/sessionView";

type AddSessionProps = {
  workoutId: string;
  exerciseTypeId: number;
};

export default async function AddSession() {
  // const WorkoutId = createId();
  const WorkoutId = "c65ef181-4f7e-46e8-91e4-a34cc7584607";
  const SessionId = "030b7acd-ed30-4e02-aaca-da29e0a582af";
  const TypeID = 1;

  type SetsType = {
    sets: PrismaExerciseSet[];
  };

  const currentSessionData = await handleReturnSession(SessionId);

  // console.log(currentSessionData);

  const { type, ...propsWithoutType } = {
    ...currentSessionData,
  };

  const props = {
    ...propsWithoutType,
    name: currentSessionData?.type.name,
  } as PrismaExerciseSession & SetsType & Pick<PrismaExerciseType, "name">;

  const dates =
    (await handleReturnWorkoutsDatesByUser("antoni.gawlikowski@gmail.com")) ||
    [];

  console.log(dates);

  return (
    <div className="w-96">
      <MyCalendar dates={dates} />
      <SessionView {...props} />
    </div>
  );
}
