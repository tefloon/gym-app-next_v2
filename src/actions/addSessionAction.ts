"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    },
  });

  return session;
};

export const handleDeleteSet = async (setId: string) => {
  const session = await prisma.exerciseSet.delete({
    where: {
      id: setId as string,
    },
  });

  revalidatePath("/add-session");
};

export const handleDeleteSession = async (sessionId: string) => {
  const session = await prisma.exerciseSession.delete({
    where: {
      id: sessionId,
    },
  });

  return session;
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

export const handleAddSet = async (formData: FormData, newSetId: string) => {
  const sessionId = formData.get("sessionId"); // content to nazwa inputu
  const weight = formData.get("weight") || 0; // content to nazwa inputu
  const reps = formData.get("reps") || 0; // content to nazwa inputu

  try {
    const createSet = await prisma.exerciseSet.create({
      data: {
        id: newSetId,
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
