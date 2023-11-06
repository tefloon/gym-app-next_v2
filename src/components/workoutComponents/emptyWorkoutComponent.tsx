"use client";

import React from "react";

export default function EmptyWorkoutComponent() {
  return (
    <div className="w-[200px] flex flex-col items-center mt-5 gap-3">
      <div className="block h-56"></div>
      <button className="w-full bg-green-700 py-2 px-5  rounded-sm font-bold uppercase text-sm">
        Add Exercise
      </button>
      <button className="w-full bg-blue-700 py-2 px-5 rounded-sm font-bold uppercase text-sm">
        Copy Workout
      </button>
    </div>
  );
}
