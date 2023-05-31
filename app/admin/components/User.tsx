"use client";

import { useSession } from "next-auth/react";
import Admin from "./Admin";
import Button from "@/app/components/UI/Button";
import { useRouter } from 'next/navigation';

import { AiOutlinePlus } from "react-icons/ai";

const User: React.FC = () => {
  const router = useRouter();
  const { data, status, update } = useSession();

  return (
    <>
      {status === "authenticated" && (
        <div className="">
          <Admin data={data} />

          <Button
            onClick={() => router.push(`/admin/post`)}
            className="
            flex 
            text-center 
            items-center 
            justify-center 
            font-sans 
            font-normal 
            active:translate-y-1"
          >
            <AiOutlinePlus size={15} />
            <p> &nbsp; POST</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default User;
