"use client";

import React from "react";
import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";
import SessionFull from "./sessionFull";
import { Provider } from "react-redux";
import { store } from "@/redux/setupStore";

type SessionListProps = {
  sets: PrismaExerciseSet[];
};

type SessionFullProps = PrismaExerciseSession & SessionListProps;

export default function SessionProviderLayer(
  sessionFullProps: SessionFullProps
) {
  return (
    <>
      <Provider store={store}>
        <SessionFull {...sessionFullProps} />
      </Provider>
    </>
  );
}
