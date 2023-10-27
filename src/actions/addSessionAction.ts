"use server";

import prisma from "@/lib/prisma";

export const addSession = async (formData: FormData, workoutId: string) => {
  const content = formData.get("content"); // content to nazwa inputu
};

export const addSet = async (formData: FormData, sessionID: string) => {
  const content = formData.get("content"); // content to nazwa inputu
};
