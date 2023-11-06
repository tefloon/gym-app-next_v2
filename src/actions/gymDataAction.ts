"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DateTime } from "luxon";
import { createId } from "@paralleldrive/cuid2";
import {
  Person as PrismaPerson,
  Workout as PrismaWorkout,
} from "@prisma/client";

// ==============
//    WORKOUTS
// ==============
export const handleCreateWorkout = async (
  personId: string,
  workoutDate: string
) => {
  const workoutId = createId();
  const date = DateTime.fromISO(workoutDate).toUTC().toJSDate();

  try {
    const createWorkout = await prisma.workout.create({
      data: {
        id: workoutId,
        date: date,
        personId: personId,
      },
    });

    return workoutId;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        error: e,
      };
    }
    throw e;
  }
};

export const handleReturnWorkoutByDate = async (inputDate: Date) => {
  const dateInLocal = DateTime.fromJSDate(inputDate).setZone("Europe/Warsaw");

  if (!dateInLocal.isValid) {
    return new Error("Invalid date");
  }

  const dayStart = dateInLocal.startOf("day").toUTC();
  const dayEnd = dateInLocal.endOf("day").toUTC();

  const workout = await prisma.workout.findFirst({
    where: {
      date: {
        gte: dayStart.toJSDate(),
        lte: dayEnd.toJSDate(),
      },
    },
    include: {
      person: true,
      exercises: {
        include: {
          type: true,
          sets: true,
        },
      },
    },
  });

  return workout;
};

export const handleReturnWorkoutDatesByUser = async (userEmail: string) => {
  const workoutDatesForUser = await prisma.person.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      workouts: true,
    },
  });

  const dates = workoutDatesForUser?.workouts.map((workout) => workout.date);
  return dates;
};

// ==============
//    SESSIONS
// ==============

export const handleReturnSession = async (sessionId: string) => {
  const session = await prisma.exerciseSession.findFirst({
    where: {
      id: sessionId,
    },
    include: {
      sets: {
        orderBy: {
          order: "asc",
        },
      },
      type: true,
    },
  });

  return session;
};

export const handleDeleteSession = async (sessionId: string) => {
  const session = await prisma.exerciseSession.delete({
    where: {
      id: sessionId,
    },
  });

  return session;
};

// ==============
//      SETS
// ==============

export const handleDeleteSet = async (setId: string) => {
  const session = await prisma.exerciseSet.delete({
    where: {
      id: setId as string,
    },
  });

  revalidatePath("/add-session");
};

export const handleAddSet = async (formData: FormData) => {
  const sessionId = formData.get("sessionId"); // sessionId to nazwa <input name>
  const weight = formData.get("weight") || 0;
  const reps = formData.get("reps") || 0;

  try {
    const createSet = await prisma.exerciseSet.create({
      data: {
        weight: +weight,
        reps: +reps,
        sessionId: sessionId as string,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        error: e,
      };
    }
    throw e;
  }

  revalidatePath("/add-session");
};

export const handleToggleCompleted = async (
  setId: string,
  wasCompleted: boolean
) => {
  try {
    const createSet = await prisma.exerciseSet.update({
      where: {
        id: setId,
      },

      data: {
        wasCompleted: wasCompleted,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        error: e,
      };
    }
    throw e;
  }
  // revalidatePath("/add-session");
};

// ==============
//     USERS
// ==============

export const handleReturnUserAndWorkoutDatesByEmail = async (
  userEmail: string
): Promise<PrismaPerson & { dates: Date[] }> => {
  try {
    const userData = await prisma.person.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true, // from Person
        name: true, // from Person
        email: true, // from Person
        workouts: {
          select: {
            date: true, // from Workout
          },
        },
      },
    });

    if (!userData) {
      throw new Error(`User not found`);
    }

    const transformedResult = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      dates: userData.workouts.map((workout) => workout.date),
    };

    return transformedResult;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2001") {
        console.log(`The user with this email cannot be found.`);
      }
    }
    throw e;
  }
};
