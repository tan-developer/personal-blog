"use client";

import Admin from "./Admin";
import Button from "@/app/components/UI/Button";
import { useRouter } from 'next/navigation';

import { BiPlus } from "react-icons/bi";
import { User } from "@prisma/client";

interface UserProps {
  user : User | null
}

const User: React.FC<UserProps> = ({user}) => {
  const router = useRouter();
  
  return (
    <>
      {user?.email && (
        <div className="">
          <Admin user={user} />

          <Button
            onClick={() => router.push(`/admin/post`)}
            className="
            flex 
            text-center 
            items-center 
            justify-center 
            font-sans 
            font-semibold 
            active:translate-y-1
            "
          >
            <BiPlus size={15} />
            <p> &nbsp; POST</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default User;
