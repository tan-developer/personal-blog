"use client";

import Button from "@/app/components/UI/Button";
import Input from "@/app/components/UI/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useForm,
  FieldValues,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "react-hot-toast";


const ContactForm: React.FC = () => {
  const router = useRouter();
  const method = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const onSubmit :SubmitHandler<FieldValues>  = (data) => {
    const Id = toast.loading("Sending mail.........")

    axios.post('/api/mail' , data)
    .then(() => {
      toast.dismiss(Id)
      toast.success("Email sended !")
      router.push('/')
    })
    .catch(() => {
      toast.dismiss(Id)
      toast.success("Fail to send mail , something wrong happen  !")
      router.refresh();
    })
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          errors={errors}
          id="name"
          label="Your name"
        />
        <Input
          register={register}
          errors={errors}
          id="email"
          label="Your email"
          type="email"
        />

        <div className="w-full font-sans">
          <label
            htmlFor="subject"
            className="
              
               text-sm   
               font-medium   
               text-gray-300  
              "
          >
            Subject
          </label>
          <div className="mt-1 mb-2 py-2">
            <select
              {...register("subject" , {required : true})}
              name="subject"
              id="subject"
              className="
                w-full
                border
                border-gray-700
                rounded-lg
                bg-black
                font-sans
                py-2 pl-4 pr-5
                focus:outline-none
                appearance-none
            "
            >
              <option value="">―― </option>
              <option value="General">General</option>
              <option value="Project Request">Project Request</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="w-full font-sans">
          <label
            htmlFor="subject"
            className="
              
               text-sm   
               font-medium   
               text-gray-300  
              "
          >
            Message
          </label>

          <div className="mt-1 mb-2 py-2">
            <textarea
              {...register("message" , {required : true})}
              name="message"
              id="message"
              cols={30}
              rows={10}
              className="
            w-full
            border
            border-gray-700
            rounded-lg
            bg-black
            font-sans
            py-2 pl-4 pr-5
            focus:outline-none
            appearance-nones
          "
            ></textarea>
          </div>
        </div>
        <Button type="submit" className="py-2 px-4">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
