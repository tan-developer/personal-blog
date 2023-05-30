"use client";

import { useEffect } from "react";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import axios from "axios";

import React from "react";
import { useForm, Resolver, SubmitHandler, FieldValues } from "react-hook-form";

import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Link from "@/app/components/UI/Link";

export type Variant = "LOGIN" | "REGISTER";

export interface FormValues {
  name?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [variant, setVariant] = React.useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { data, status, update } = useSession();

  console.log(data, status);

  useEffect(() => {
    console.log(status);

    return () => {};
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const registerHandler = (data: FieldValues) => {
    axios.post("/api/register", data);
  };
  const loginHandler = (data: FieldValues) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast.error("Invalid credentials");
      }

      if (callback?.ok && !callback.error) {
        toast.success("Login successfully !");
      }
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.target) {
      switch (variant) {
        case "LOGIN":
          loginHandler(data);
          break;
        case "REGISTER":
          registerHandler(data);
          break;
      }
    }
  };

  const toggleVariant = React.useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  return (
    <div className="">
      {/* {(status === "unauthenticated") && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center "
        >
          <div className="w-1/2">
            {variant === "REGISTER" && (
              <Input
                errors={errors}
                label="Your username :"
                register={register}
                id="name"
              />
            )}
            <Input
              errors={errors}
              label="Email address :"
              register={register}
              id="email"
              type="email"
            />

            <Input
              errors={errors}
              label="Password :"
              register={register}
              id="password"
              type="password"
            />

            <div
              className="text-main-blue underline cursor-pointer"
              onClick={() =>
                setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN")
              }
            >
              {variant === "LOGIN"
                ? "I don't have any account?"
                : "I already having an account?"}
            </div>

            <div className="">
              <Button disable={isLoading} type="submit" onClick={onSubmit}>
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </div>
        </form>
      )} */}

      {/* {(status === "loading") && (
        <p>Loading</p>
      )} */}

      {status === "unauthenticated" && (
        <div className="flex">
          <div className="flex text-lg">
            <p>tan-developer </p>
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
      )}
    </div>
  );
};

export default React.memo(AuthForm);
