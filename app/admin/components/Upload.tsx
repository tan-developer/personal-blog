"use client";
import Prisma from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldUploadButton, getCldImageUrl } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCardImage, BsTrash } from "react-icons/bs";
import Image from "next/image";
import { HiOutlinePaperClip } from "react-icons/hi";
import clsx from "clsx";

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

  // Handler

  const copyHandler = (element : Prisma.Image) => {
      navigator.clipboard.writeText(element.url);
      toast("Copied to clipboard", {
        duration: 1000,
        icon: <HiOutlinePaperClip />,
      });
  }


  const removeHandler = ({id} : Prisma.Image) : void => {
      axios.post('/api/delete/image' , {
        id : id
      })
      .then(() => {
        toast("Image Deleted !", {
          icon : <BsTrash />,
          duration : 2000
        })
        setBuffer(buffer + 1)
      })
      .catch(() => {
        toast.error("Something is wrong 😵");
      })
  }

  return (

    <>
      <ul className="mb-2">
        <div className="mb-2">
          <label htmlFor="">{images?.length! > 0 && "Images :"}</label>
        </div>
        {images?.map((element, index) => (
          <li
            
            key={element.url}
            className={clsx(`
                overflow-hidden
                border 
                border-gray-700 
                rounded-md 
                pt-2
                py-1 
                mb-2
                px-2 
                active:border-gray-300
                hover:border-main-blue
                cursor-pointer
                flex
                transition-all
                animate-fade
                relative
                group
            `)}
          >
            <div className="" onClick={() => copyHandler(element)}>
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
            <p className="w-full overflow-hidden whitespace-nowrap ml-2 text-ellipsis" onClick={() => copyHandler(element)}>
              {element.url}
            </p>

            <button className="
              absolute
              right-0
              top-0
              h-full
              w-fit
              px-2
              mr-1
              bg-black
              opacity-0
              group-hover:!opacity-100
              transition-all
              active:translate-y-[2px]  
             "
             onClick={(e) => {
              removeHandler(element)
              e.preventDefault()

             }}
            ><BsTrash size={20}/></button>
          </li>
        ))}
      </ul>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="f4c6bx4o"
      >
        <span className="border py-1 px-2 rounded-md flex justify-center items-center mb-4 font-sans border-gray-700 my-2 ">
          <BsCardImage />
          <strong className="ml-2 font-normal">Upload</strong>
        </span>
      </CldUploadButton>
    </>
  );
};

export default UpLoad;
