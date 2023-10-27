"use client";

import { RootState, store } from "@/redux/setupStore";
import React, { ChangeEvent, useEffect, useOptimistic, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ExerciseSet as PrismaExerciseSet,
  ExerciseSession as PrismaExerciseSession,
} from "@prisma/client";
import {
  handleAddSet,
  handleDeleteSet,
  handleToggleCompleted,
} from "@/actions/addSessionAction";
import { clearSelection, toggleSelected } from "@/features/selectedSetSlice";
import { createId } from "@paralleldrive/cuid2";

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
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const dispatch = useDispatch();
  const [optimisticSets, addOptimisticSet] = useOptimistic(
    sets,
    (state, newSet: PrismaExerciseSet) => {
      return [...state, newSet].sort((a, b) => {
        return a.order - b.order;
      });
    }
  );
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    sets.map((set) => set.wasCompleted)
  );

  const currentState = useSelector((state: RootState) => state.set);

  const decrementWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeight((preWeight) => preWeight - 2.5);
  };

  const incrementWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeight((preWeight) => preWeight + 2.5);
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    const completedSetsCopy = [...completedSets];

    const indexOfTheSet = sets.findIndex((set) => set.id === id);
    const currentStateOfTheSet = sets.find(
      (set) => set.id === id
    )?.wasCompleted;

    completedSetsCopy[indexOfTheSet] = !completedSetsCopy[indexOfTheSet];

    setCompletedSets(completedSetsCopy);

    handleToggleCompleted(id, !currentStateOfTheSet);
  };

  const handleOnSelectRow = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      return; // Exit early if checkbox was clicked
    }
    dispatch(toggleSelected(id));
  };

  const commonSpanClassnames =
    "py-2 border-b border-slate-600 flex flex-row justify-between w-full select-none";

  const selectedSpanClasses = "bg-slate-400";

  return (
    <>
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
                    value={(Math.round(weight * 100) / 100).toFixed(2)}
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
                  const newSetId = createId();

                  addOptimisticSet({
                    id: newSetId,
                    order: Math.max(...sets.map((set) => set.order)) + 1,
                    reps: reps,
                    weight: weight,
                    wasCompleted: false,
                    sessionId: id,
                  });
                  handleAddSet(formData, newSetId);
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
      <section className="w-full py-5">
        {optimisticSets.map((set, index) => (
          <span
            className={
              currentState.selectedSet === set.id
                ? commonSpanClassnames + " " + selectedSpanClasses
                : commonSpanClassnames
            }
            onClick={(e) => handleOnSelectRow(e, set.id)}
          >
            <div>
              <span className="font-bold text-md px-5">{index}</span>
            </div>
            <div className="flex flex-row items-baseline justify-center grow">
              <span className="font-bold text-md">{set.weight}</span>
              <span className="text-xs font-extralight pl-1">kg</span>
            </div>
            <div className="flex flex-row items-baseline justify-center w-16">
              <span className="font-bold text-md">{set.reps}</span>
              <span className="text-xs font-extralight pl-1">reps</span>
            </div>
            <div className="px-3">
              <input
                name="isCompleted"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={completedSets[index]}
                onChange={(e) => handleOnChange(e, set.id)}
              />
            </div>
          </span>
        ))}
      </section>
    </>
  );
}

// return (
//   <Provider store={store}>
//     <SessionForm {...sessionFormProps} />
//     <SessionList sets={sets} />

//   </Provider>
// );
