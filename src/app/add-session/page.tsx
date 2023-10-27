import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

import { handleReturnSession } from "@/actions/addSessionAction";

import SessionFull from "@/components/sessionFull";

export default async function AddSession() {
  // const WorkoutId = createId();
  const WorkoutId = "c65ef181-4f7e-46e8-91e4-a34cc7584607";
  const SessionId = "030b7acd-ed30-4e02-aaca-da29e0a582af";
  const TypeID = 1;

  type SetsType = {
    sets: PrismaExerciseSet[];
  };

  const currentSession = (await handleReturnSession(
    SessionId
  )) as PrismaExerciseSession & SetsType;

  const props = {
    ...currentSession,
  };

  return (
    <div className="w-96">
      Siema
      <SessionFull {...props} />
    </div>
  );
}
