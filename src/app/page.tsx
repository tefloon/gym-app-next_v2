import Link from "next/link";

export default async function Home() {
  const dateString = "2023-10-27";

  return (
    <div>
      Home
      <Link href={`/workout/${dateString}`}>Klik</Link>
    </div>
  );
}
