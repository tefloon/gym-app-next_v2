import { handleReturnUserAndWorkoutDatesByEmail } from "@/actions/gymDataAction";
import MyCalendar from "@/components/calendarComponents/calendar";
import SetAtomsComponent from "@/components/dataComponents/setAtomsComponent";

export default async function Home() {
  try {
    const user = await handleReturnUserAndWorkoutDatesByEmail(
      "antoni.gawlikowski@gmail.com"
    );
    return (
      <div className="w-[400px] py-12">
        <MyCalendar dates={user.dates} />
        <SetAtomsComponent
          user={{ id: user.id, email: user.email, name: user.name }}
        />
      </div>
    );
  } catch (error) {
    if ((error as Error).message === "User not found") {
      return <MyCalendar dates={[]} />;
    }
  }
}
