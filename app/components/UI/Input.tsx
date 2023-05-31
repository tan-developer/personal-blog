
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import {useState} from 'react'

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disable?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  errors,
  register,
  disable,
}) => {
  return (
    <div
      className="w-full font-sans"
    >
      <label
        htmlFor={id}
        className="
        
        "
      >
        {label}
      </label>
      <div className="mt-1 mb-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disable}
          {...register(id, { required })}
          className={clsx(
            `
              w-full
              border
              border-gray-700
              rounded-lg
              bg-black
              font-sans
              py-2 pl-4 pr-4
              focus:outline-none
            `,
            errors && "focus:ring-rose-500",
            disable && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};
export default Input;
