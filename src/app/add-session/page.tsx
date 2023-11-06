import { handleReturnSession } from "@/actions/gymDataAction";

import MyCalendar from "@/components/calendarComponents/calendar";
import SessionView from "@/components/sessionComponents/sessionView";
import { ExerciseSessionWithSetsAndType } from "@/lib/types";

type AddSessionProps = {
  workoutId: string;
  exerciseTypeId: number;
};

export default async function AddSession() {
  const SessionId = "030b7acd-ed30-4e02-aaca-da29e0a582af";

  const currentSessionData = (await handleReturnSession(
    SessionId
  )) as ExerciseSessionWithSetsAndType;

  return (
    <div className="w-96">
      <SessionView {...currentSessionData} />
    </div>
  );
}
