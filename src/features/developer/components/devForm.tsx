import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  barthDay: string;
  email: string;
  phone: string;
  address: string;
  bio?: string;
  portfolio?: string;
}

export default function DevForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto max-w-4xl bg-green-600"
    >
      <div className="flex gap-2">
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
      <input type="submit" />
    </form>
  );
}
