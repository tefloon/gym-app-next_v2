import React from "react";
import { IconContext } from "react-icons";
import { BsCheckCircleFill } from "react-icons/bs";

type MyCardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function MyCard({ title, children }: MyCardProps) {
  const top = title ? (
    <>
      <div className="flex flex-row p-2 border-b border-cyan-800">
        <p className="text-xs uppercase flex-1">{title}</p>

        <BsCheckCircleFill style={{ color: "#16a34a" }} />
      </div>
    </>
  ) : null;

  return (
    <div className="flex flex-col rounded my-4">
      {top}

      <div className="px-3">{children}</div>
    </div>
  );
}
