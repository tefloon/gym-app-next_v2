import {
  handleReturnUserAndWorkoutDatesByEmail,
  handleReturnWorkoutBasicsByDate,
} from "@/actions/gymDataAction";
import MyCalendar from "@/components/calendarComponents/calendar";
import SetUserAtomComponent from "@/components/dataComponents/setUserAtomComponent";
import SetWorkoutAtomComponent from "@/components/dataComponents/setWorkoutAtomComponent";
import { DateTime } from "luxon";

export default async function Home() {
  // const handleSelectedDateChange = async (date: string) => {
  // };

  // const basicWorkoutData = await handleReturnWorkoutBasicsByDate(
  //   new Date()
  // ) as {id: string, date: Date}

  // const dateString = DateTime.fromJSDate(basicWorkoutData.date)
  //   .setZone("Europe/Warsaw")
  //   .toFormat("yyyy-MM-dd")
  //   .toString();

  try {
    const user = await handleReturnUserAndWorkoutDatesByEmail(
      "antoni.gawlikowski@gmail.com"
    );
    return (
      <div className="w-[400px] py-12">
        <MyCalendar
          // handleSelectedDateChange={handleSelectedDateChange}
          dates={user.dates}
        />
        <SetUserAtomComponent
          user={{ id: user.id, email: user.email, name: user.name }}
        />
        {/* <SetWorkoutAtomComponent workoutBasics={{id: basicWorkoutData.id, dateString: dateString}}/> */}
      </div>
    );
  } catch (error) {
    return <div>Nothing to see here...</div>;
  }
}
