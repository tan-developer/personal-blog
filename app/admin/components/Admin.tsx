import { signOut } from "next-auth/react";
import Link from "@/app/components/UI/Link";
import { Session } from "next-auth";
import { User } from "@prisma/client";

interface AdminProps {
  user : User | null
}

const Admin: React.FC<AdminProps> = ({user}) => {

  return (
    <div className="flex">
      <div className="flex text-lg">
        <p>{user?.name}</p>
        &nbsp;/&nbsp;
        <Link
          onClick={() => signOut()}
          href="#"
          blank={false}
          className="text-main-blue italic underline"
        >
          logout
        </Link>
      </div>
    </div>
  );
};

export default Admin;
