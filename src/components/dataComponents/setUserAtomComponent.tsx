"use client";

import React from "react";
import { useAtom } from "jotai";
import { currentUserAtom } from "@/features/jotaiAtoms";

import { Person as PrismaPerson } from "@prisma/client";

type SetAtomsProps = {
  user: PrismaPerson;
};

export default function SetUserAtomComponent({ user }: SetAtomsProps) {
  const [, setCurrentUser] = useAtom(currentUserAtom);
  setCurrentUser(user);

  return <h1 className="hidden"> Set Atoms Component</h1>;
}
