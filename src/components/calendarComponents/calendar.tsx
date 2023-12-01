"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "./myBasicCalendarStyle.css";
import "./markedDateStyle.css";
import { formatDate } from "@/lib/utilFunctions";

import { useRouter } from "next/navigation";

import { useAtom } from "jotai";
import { workoutAtom } from "@/features/jotaiAtoms";
import { handleReturnWorkoutBasicsByDate } from "@/actions/gymDataAction";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type MyCalendarProps = {
  dates: Date[];
  // handleSelectedDateChange: (date: string) => void;
};
export default function MyCalendar({ dates }: MyCalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [, setSelectedWorkout] = useAtom(workoutAtom);
  const router = useRouter();

  const datesSet = new Set(
    dates.map((date) => date.toLocaleDateString("pl-PL"))
  );

  const handleDateChange = async (
    v: Value,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!v) return;

    if (Array.isArray(v)) {
      // value is [ValuePiece, ValuePiece]
      console.error("Received a date range, expected a single date.");
    } else {
      let dateString = "";
      console.log(v.toISOString());
      try {
        const basicWorkoutData = await handleReturnWorkoutBasicsByDate(v);
        if (!(basicWorkoutData instanceof Error)) {
          setSelectedWorkout({ ...basicWorkoutData });
          dateString = basicWorkoutData.date;
        }
      } catch {
        // Move the date manipulation to the server action
        dateString = formatDate(v);
      } finally {
        router.push(`/workout/${dateString}`);
      }
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
