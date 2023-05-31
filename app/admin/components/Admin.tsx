import { signOut } from "next-auth/react";
import Link from "@/app/components/UI/Link";
import { Session } from "next-auth";

interface AdminProps {
  data : Session
}

const Admin: React.FC<AdminProps> = ({data}) => {
  const {user} = data

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
