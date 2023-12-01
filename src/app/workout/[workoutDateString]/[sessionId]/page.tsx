import React from "react";

export default async function WorkoutSessionById({
  params,
}: {
  params: { workoutDateString: string; sessionId: string };
}) {
  return (
    <div>
      <h1>{params.workoutDateString}</h1>
      <h3>{params.sessionId}</h3>
    </div>
  );
}
