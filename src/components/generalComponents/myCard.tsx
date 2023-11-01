"use client";

import React from "react";
import { IconContext } from "react-icons";
import { BsCheckCircleFill } from "react-icons/bs";

type MyCardProps = {
  title?: string;
  onClick?: (argument?: any) => void;
  children: React.ReactNode;
};

export default function MyCard({ title, onClick, children }: MyCardProps) {
  const handleOnClick = () => {
    if (!onClick) return;

    onClick();
  };

  const commonDivClasses = "flex flex-col rounded my-4";
  const divClasses = !onClick
    ? commonDivClasses
    : commonDivClasses + " cursor-pointer hover:bg-slate-800";

  const top = title ? (
    <>
      <div className="flex flex-row p-2 border-b border-cyan-800">
        <p className="text-xs uppercase flex-1">{title}</p>

        <BsCheckCircleFill style={{ color: "#16a34a" }} />
      </div>
    </>
  ) : null;

  return (
    <div className={divClasses} onClick={handleOnClick}>
      {top}

      <div className="px-3">{children}</div>
    </div>
  );
}
