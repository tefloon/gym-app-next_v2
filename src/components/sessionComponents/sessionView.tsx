"use client";

import React from "react";
import SessionForm from "./sessionForm";
import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
  ExerciseType as PrismaExerciseType,
} from "@prisma/client";
import SessionList from "./sessionList";

type SetsListType = {
  sets: PrismaExerciseSet[];
};

type SessionFullProps = PrismaExerciseSession & SetsListType & { name: string };

// TODO: add skeleton, before children load
export default function SessionView({
  id,
  order,
  workoutId,
  typeId,
  sets,
  name,
}: SessionFullProps) {
  const sessionFormProps = {
    id: id,
    order: order,
    workoutId: workoutId,
    typeId: typeId,
  };
  // tak dla beki
  return (
    <>
      <h2 className="text-center text-xl pt-5">{name}</h2>
      <SessionForm {...sessionFormProps} />
      <SessionList sets={sets} />
    </>
  );
}
