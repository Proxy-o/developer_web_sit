import React from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { eduForm, proForm } from "../types";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useFormPersist from "react-hook-form-persist";
import { Textarea } from "components/ui/textarea";

export default function ProForm() {
  const { data } = useSession();
  const { mutate: addInfo, isLoading } = api.developer.addProject.useMutation();
  const utils = api.useContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<proForm>();

  useFormPersist("proForm", { watch, setValue });

  const onSubmit: SubmitHandler<proForm> = (devinfo) => {
    addInfo(
      { ...devinfo, userId: data?.user?.id || "" },
      {
        onSuccess: () => {
          toast.success("Education information added");
        },
      }
    );
  };
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto "
    >
      <div className="mt-4 ">
        <div className="w-full">
          <Label>
            <strong className="text-red-500">*</strong>Title
          </Label>
          <Input
            placeholder="Title"
            {...register("title", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.title && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
        <div className="mt-4 w-full">
          <Label>
            <strong className="text-red-500">*</strong>Description
          </Label>
          <Textarea
            placeholder="Description"
            {...register("description", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.description && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Demo Link
        </Label>
        <Input
          type="url"
          placeholder="DEMO Link"
          {...register("demo_link", {
            required: true,
            maxLength: 20,
            minLength: 2,
            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
          })}
        />
        {errors.demo_link && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Repo Link
        </Label>
        <Input
          type="url"
          placeholder="Repo Link"
          {...register("code_repo", {
            required: true,
            maxLength: 20,
            minLength: 2,
            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
          })}
        />
        {errors.code_repo && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>

      <div className="mt-6 flex w-full justify-center ">
        <Button type="submit" disabled={isLoading} className="">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  );
}
