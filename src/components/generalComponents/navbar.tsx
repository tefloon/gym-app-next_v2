import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex flex-row justify-around gap-10 p-5 sticky bg-cyan-800 text-slate-100">
        <li>
          <div className="px-10 py-1 text-center w-56">
            <Link className="text-center" href="/">
              Home
            </Link>
          </div>
        </li>
        <li>
          <div className="px-10 py-1 text-center w-56">
            <Link href="/add-session">Add Session</Link>
          </div>
        </li>
        <li>
          <div className="px-10 py-1 text-center w-56">
            <Link href="/test">Logout</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
