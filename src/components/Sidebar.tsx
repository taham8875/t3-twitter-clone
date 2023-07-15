import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const session = useSession();
  const user = session.data?.user;

  console.log("session", session, "user", user);

  return (
    <nav className="sticky top-0   px-2 py-4">
      <ul className="flex flex-col items-center  gap-2  ">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`}>Profile</Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>Log in</button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>Log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
