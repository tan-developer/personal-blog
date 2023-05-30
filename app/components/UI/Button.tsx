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
}

const Button: React.FC<ButtonProps> = ({
  children,
  danger,
  disable,
  fullWidth,
  onClick,
  secondary,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      className={clsx(
        `
          border
          py-1 px-4
          hover:bg-gray-200 
          transition
          rounded-md
          text-black
          font-medium
          mt-4
      `,
        disable && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-black",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && !danger && "bg-white  focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
