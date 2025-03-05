"use client";
import { useSession } from "next-auth/react";

export default function About() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      {session?.user ? <p>{session?.user.id}</p> : <p>not logged in</p>}
    </div>
  );
}
