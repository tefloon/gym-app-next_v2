"use client";

import React from "react";
import SessionForm from "./sessionForm";
import SessionList from "./sessionList";
import { ExerciseSessionWithSetsAndType } from "@/lib/types";
import { useAtom } from "jotai";
import { selectedSessionAtom, workoutAtom } from "@/features/jotaiAtoms";
import { useRouter } from "next/navigation";

// TODO: add skeleton, before children load
export default function SessionView({
  id,
  order,
  workoutId,
  typeId,
  sets,
  type,
}: ExerciseSessionWithSetsAndType) {
  const sessionFormProps = {
    id: id,
    order: order,
    workoutId: workoutId,
    typeId: typeId,
  };

  const [, setSelectedSession] = useAtom(selectedSessionAtom);
  const [currentWorkout] = useAtom(workoutAtom);
  const router = useRouter();

  const handleOnClick = () => {
    setSelectedSession({ isSelected: false, selectedSessionId: "" });

    router.push(`/workout/${currentWorkout.date}`);
  };

  return (
    <>
      <h2 className="text-center text-md uppercase pt-5 pb-3">{type.name}</h2>
      <SessionForm {...sessionFormProps} />
      <SessionList sets={sets} />
      <button onClick={handleOnClick}>Back</button>
    </>
  );
}
