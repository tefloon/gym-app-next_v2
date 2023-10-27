"use client";

import { store } from "@/redux/setupStore";
import React from "react";
import { Provider } from "react-redux";
import SessionForm from "./sessionForm";
import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";
import SessionList from "./sessionList";

type SessionListProps = {
  sets: PrismaExerciseSet[];
};

type SessionFullProps = PrismaExerciseSession & SessionListProps;

export default function SessionFull({
  id,
  order,
  workoutId,
  typeId,
  sets,
}: SessionFullProps) {
  const sessionFormProps = {
    id: id,
    order: order,
    workoutId: workoutId,
    typeId: typeId,
  };

  return (
    <Provider store={store}>
      <SessionForm {...sessionFormProps} />
      <SessionList sets={sets} />
    </Provider>
  );
}
