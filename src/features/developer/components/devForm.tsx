import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IFormInput } from "../types";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function DevForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { data } = useSession();
  const { mutate: addInfo } = api.developer.insertDeveloperInfo.useMutation();

  const onSubmit: SubmitHandler<IFormInput> = (devinfo) => {
    addInfo({ ...devinfo, userId: data?.user?.id || "" });
    // console.log(data);
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
            {...register("firstName", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.firstName && (
            <h1 className="m-2 ml-2 text-red-500">This field is required</h1>
          )}
        </div>
        <div className="w-full">
          <Label>
            <strong className="text-red-500">*</strong>Last Name
          </Label>
          <Input
            placeholder="Last Name"
            {...register("lastName", {
              required: true,
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.lastName && (
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
          {...register("birthDay", {
            required: true,
            maxLength: 100,
            minLength: 2,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
          })}
        />
        {errors.birthDay && (
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

      <Button type="submit">Submit</Button>
    </form>
  );
}
