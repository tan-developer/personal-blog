"use client";
import Prisma from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldUploadButton, getCldImageUrl } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCardImage } from "react-icons/bs";
import Image from "next/image";
import {HiOutlinePaperClip} from 'react-icons/hi'

const UpLoad: React.FC = () => {
  const { data } = useSession();
  const [buffer, setBuffer] = useState<number>(0);

  const [images, setImages] = useState<Prisma.Image[]>();

  const handleUpload: (result: any) => void = (result: any) => {
    axios
      .post(`/api/image_uploader`, {
        url: result.info.secure_url as string,
        email: data?.user?.email as string,
      })
      .then(() => {
        toast.success("Upload successfully !");
        setBuffer(buffer + 1);
      });
  };

  useEffect(() => {
    data &&
      axios
        .post(`/api/image`, {
          email: data.user?.email,
          limit: 10,
        })
        .then((res) => {
          setImages(res.data);
        });
  }, [data, buffer]);
  return (
    <>
      <ul className="">
        <label htmlFor="" className="mb-2">
          Images :
        </label>
        {images?.map((element) => (
          <li
            onClick={() => {
              navigator.clipboard.writeText(element.url)
              toast("Copied to clipboard" , {
                duration : 1000,
                icon  : <HiOutlinePaperClip />
              })
            }}
            key={element.authorId}
            className="
              border 
              border-gray-700 
              rounded-md 
              py-1 
              px-2 
              mb-2
              active:border-gray-300
              hover:border-main-blue
              cursor-pointer
              flex
          "
          >
            <div className="">
              <Image
                className="
              aspect-square
              "
                src={element.url}
                alt=""
                sizes="20"
                width={20}
                height={20}
              />
            </div>
            <p className="w-full overflow-hidden whitespace-nowrap ml-2 text-ellipsis">
              {element.url}
            </p>
          </li>
        ))}
      </ul>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="f4c6bx4o"
      >
        <button className="border py-1 px-2 rounded-md flex justify-center items-center mb-4 font-sans border-gray-700 my-2 ">
          <BsCardImage />
          <strong className="ml-2 font-normal">Upload</strong>
        </button>
      </CldUploadButton>
    </>
  );
};

export default UpLoad;
