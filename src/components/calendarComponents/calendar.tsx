"use client";

import { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./myBasicCalendarStyle.css";
import "./markedDateStyle.css";
import {
  handleReturnWorkoutByDate,
  handleReturnWorkoutsByUser,
} from "@/actions/addSessionAction";
import { useRouter } from "next/navigation";
import { DateTime } from "luxon";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type MyCalendarProps = {
  dates: Date[];
};
export default function MyCalendar({ dates }: MyCalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const router = useRouter();

  const datesSet = new Set(
    dates.map((date) => date.toLocaleDateString("pl-PL"))
  );

  const handleDateChange = (
    v: Value,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!v) return;

    if (Array.isArray(v)) {
      // value is [ValuePiece, ValuePiece]
      console.error("Received a date range, expected a single date.");
    } else {
      // value is ValuePiece
      // Now you can manipulate the date value
      const dateInLocal = DateTime.fromJSDate(v)
        .setZone("Europe/Warsaw")
        .toFormat("yyyy-MM-dd")
        .toString();

      console.log(`wtf: ${dateInLocal}`);
      router.push(`/workout/${dateInLocal}`);
    }
  };

  return (
    <>
      <div>
        <Calendar
          locale="pl"
          onChange={(v, e) => handleDateChange(v, e)}
          value={value}
          tileClassName={({ date, view }) => {
            const dateString = date.toLocaleDateString("pl-PL");
            if (datesSet.has(dateString)) {
              return "markedDate";
            }
          }}
        />
      </div>
    </>
  );
}
