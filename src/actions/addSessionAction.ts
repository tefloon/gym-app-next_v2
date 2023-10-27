"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const handleReturnSession = async (sessionId: string) => {
  const session = await prisma.exerciseSession.findFirst({
    where: {
      id: sessionId,
    },
    include: {
      sets: true,
    },
  });

  return session;
};

export const handleDeleteSet = async (setId: string) => {
  const session = await prisma.exerciseSet.delete({
    where: {
      id: setId,
    },
  });
};

export const handleDeleteSession = async (sessionId: string) => {
  const session = await prisma.exerciseSession.delete({
    where: {
      id: sessionId,
    },
  });

  return session;
};

export const handleAddSet = async (formData: FormData) => {
  const sessionId = formData.get("sessionId"); // content to nazwa inputu
  const weight = formData.get("weight") || 0; // content to nazwa inputu
  const reps = formData.get("reps") || 0; // content to nazwa inputu

  const createSet = await prisma.exerciseSet.create({
    data: {
      weight: +weight,
      reps: +reps,
      sessionId: sessionId as string,
    },
  });

  revalidatePath("/add-session");
};
