"use client";

import React, { useState } from "react";
import { RootState } from "@/redux/setupStore";
import { useSelector, useDispatch } from "react-redux";
import { clearSelection } from "@/features/selectedSetSlice";
import { ExerciseSession as PrismaExerciseSession } from "@prisma/client";
import { handleAddSet, handleDeleteSet } from "@/actions/addSessionAction";

export default function SessionForm({
  id,
  order,
  workoutId,
  typeId,
}: PrismaExerciseSession) {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const dispatch = useDispatch();

  const currentState = useSelector((state: RootState) => state.set);

  const decrementWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeight((preWeight) => preWeight - 5);
  };

  const incrementWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeight((preWeight) => preWeight + 5);
  };

  const decrementReps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReps((preReps) => preReps - 1);
  };

  const incrementReps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReps((preReps) => preReps + 1);
  };

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReps(0);
    setWeight(0);
  };

  const deleteSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentState.isSelected) {
      handleDeleteSet(currentState.selectedSet);
      dispatch(clearSelection());
    }
  };

  const addSet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Adding a Set");
  };

  return (
    <section className="w-96 flex flex-col items-center pt-5">
      <form action="">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 w-80">
            <div className="text-sm border-b font-bold pb-1 border-blue-400">
              WEIGHT (kgs)
            </div>
            <div className="flex flex-row self-center">
              <span className="flex flex-row items-center gap-5">
                <button
                  onClick={decrementWeight}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  -
                </button>
                <input
                  className="bg-transparent border-b text-center text-xl w-24"
                  type="number"
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
                <button
                  onClick={incrementWeight}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  +
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-80">
            <div className="text-sm border-b font-bold pb-1 border-blue-400">
              REPS
            </div>
            <div className="flex flex-row self-center">
              <span className="flex flex-row items-center gap-5">
                <button
                  onClick={decrementReps}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  -
                </button>
                <input
                  className="bg-transparent border-b text-center text-xl w-24"
                  type="number"
                  name="reps"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                />
                <input type="hidden" name="sessionId" value={id} />
                <button
                  onClick={incrementReps}
                  className="w-8 h-8 bg-gray-500 text-xl"
                >
                  +
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <button
              formAction={async (formData) => {
                await handleAddSet(formData);
              }}
              className="flex-1 bg-green-700 py-1 rounded-sm font-bold"
            >
              SAVE
            </button>
            {!currentState.isSelected ? (
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-700 py-1 rounded-sm font-bold"
              >
                CLEAR
              </button>
            ) : (
              <button
                onClick={deleteSelected}
                className="flex-1 bg-red-700 py-1 rounded-sm font-bold"
              >
                DELETE
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
