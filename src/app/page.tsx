import { handleReturnWorkoutDatesByUser } from "@/actions/gymDataAction";
import MyCalendar from "@/components/calendarComponents/calendar";
export default async function Home() {
  const dates =
    (await handleReturnWorkoutDatesByUser("antoni.gawlikowski@gmail.com")) ||
    [];

  return (
    <div className="w-[400px] py-12">
      <MyCalendar dates={dates} />
    </div>
  );
}
