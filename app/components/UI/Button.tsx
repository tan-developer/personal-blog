"use client";

import clsx from "clsx";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: SubmitHandler<FieldValues>;
  secondary?: boolean;
  danger?: boolean;
  disable?: boolean;
  className?:string
}

const Button: React.FC<ButtonProps> = ({
  children,
  danger,
  disable,
  fullWidth,
  onClick,
  secondary,
  type,
  className
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      className={clsx(
        `
          border-gray-700
          border
          py-1 px-4
          hover:bg-gray-200 
          transition
          rounded-md
          text-gray-500
          font-medium
          font-sans
          hover:text-black
          mt-4
      `,
        disable && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-white" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-black  focus-visible:outline-sky-600"
      ) + " " + className}
    >
      {children}
    </button>
  );
};

export default Button;
