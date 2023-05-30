import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { persoForm } from "../types";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useFormPersist from "react-hook-form-persist";

export default function InfoForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<persoForm>();
  const { data } = useSession();
  const { mutate: addInfo, isLoading } =
    api.developer.updatePersoInfo.useMutation();
  useFormPersist("persoForm", { watch, setValue });
  const onSubmit: SubmitHandler<persoForm> = (devinfo) => {
    addInfo(
      { ...devinfo, id: data?.user?.id || "" },
      {
        onSuccess: () => {
          toast.success("My first toast");
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
            <strong className="text-red-500">*</strong>First Name
          </Label>
          <Input
            placeholder="First Name"
            {...register("firstname", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.firstname && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
        <div className="w-full">
          <Label>
            <strong className="text-red-500">*</strong>Last Name
          </Label>
          <Input
            placeholder="Last Name"
            {...register("lastname", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.lastname && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Email
        </Label>
        <Input
          placeholder="Email"
          {...register("email", {
            required: true,
            maxLength: 20,
            minLength: 2,
            pattern: /^\S+@\S+$/i,
          })}
          type="email"
        />
        {errors.email && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Phone
        </Label>
        <Input
          placeholder="Phone"
          {...register("phone", {
            required: true,
            maxLength: 15,
            minLength: 10,
          })}
        />
        {errors.phone && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Address
        </Label>
        <Input
          placeholder="Address"
          {...register("address", {
            required: true,
            maxLength: 100,
            minLength: 2,
          })}
        />
        {errors.address && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>
          <strong className="text-red-500">*</strong>Birth day
        </Label>
        <Input
          placeholder="YYYY-MM-DD"
          {...register("birthday", {
            required: true,
            maxLength: 100,
            minLength: 2,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
          })}
        />
        {errors.birthday && (
          <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
        )}
      </div>
      <div className="mt-4 w-full">
        <Label>Portfolio</Label>
        <Input
          placeholder="Portfolio"
          {...register("portfolio", {
            maxLength: 100,
          })}
        />
      </div>
      <div className="mt-4 w-full">
        <Label>Bio</Label>
        <Textarea placeholder="Bio" {...register("bio")} />
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
