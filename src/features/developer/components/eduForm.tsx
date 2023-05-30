import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { eduForm } from "../types";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useFormPersist from "react-hook-form-persist";

const EduForm = () => {
  const { data } = useSession();
  const { mutate: addInfo, isLoading } = api.developer.addEduInfo.useMutation();
  const utils = api.useContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<eduForm>();

  useFormPersist("eduForm", { watch, setValue });

  const onSubmit: SubmitHandler<eduForm> = (devinfo) => {
    addInfo(
      { ...devinfo, userId: data?.user?.id || "" },
      {
        onSuccess: () => {
          toast.success("My first toast");
          utils.developer.getEducation
            .invalidate({ userId: data?.user?.id || "" })
            .catch(console.error);
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
      <div className="mt-4 flex gap-2">
        <div className="w-full">
          <Label>
            <strong className="text-red-500">*</strong>School
          </Label>
          <Input
            placeholder="school"
            {...register("school", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.school && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
        <div className="w-full">
          <Label>
            <strong className="text-red-500">*</strong>Degree
          </Label>
          <Input
            placeholder="Degree"
            {...register("degree", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.degree && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Field
        </Label>
        <Input
          placeholder="Field"
          {...register("field", {
            required: true,
            maxLength: 20,
            minLength: 2,
          })}
        />
        {errors.field && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Start Year
        </Label>
        <Input
          placeholder="YYYY-MM-DD"
          {...register("startYear", {
            required: true,
            maxLength: 100,
            minLength: 2,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
          })}
        />
        {errors.startYear && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>End Year
        </Label>
        <Input
          placeholder="YYYY-MM-DD"
          {...register("endYear", {
            required: true,
            maxLength: 100,
            minLength: 2,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
          })}
        />
        {errors.endYear && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>Portfolio</Label>
        <Input
          placeholder="Description"
          {...register("description", {
            maxLength: 100,
          })}
        />
      </div>
      <div className="mt-6 flex w-full justify-center ">
        <Button type="submit" disabled={isLoading} className="">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EduForm;
