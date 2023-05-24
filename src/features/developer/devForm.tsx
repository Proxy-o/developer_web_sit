import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Button } from "components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";

const formSchema = z.object({
  firstName: z
    .string({
      required_error: "First name must be at least 2 characters.",
    })
    .nonempty(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  experience: z
    .array(
      z.object({
        company: z.string().min(2, {
          message: "Company name must be at least 2 characters.",
        }),
        position: z.string().min(2, {
          message: "Position must be at least 2 characters.",
        }),
        startDate: z.date().nullable(),
        endDate: z.date().nullable(),
      })
    )
    .min(1, {
      message: "Please add at least one experience entry.",
    }),
  education: z
    .array(
      z.object({
        institution: z.string().min(2, {
          message: "Institution name must be at least 2 characters.",
        }),
        degree: z.string().min(2, {
          message: "Degree must be at least 2 characters.",
        }),
        fieldOfStudy: z.string().min(2, {
          message: "Field of study must be at least 2 characters.",
        }),
        startDate: z.date().nullable(),
        endDate: z.date().nullable(),
      })
    )
    .min(1, {
      message: "Please add at least one education entry.",
    }),
});
export function DevForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      location: "",
      skills: [],
      experience: [
        {
          company: "",
          position: "",
          startDate: null,
          endDate: null,
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: null,
          endDate: null,
        },
      ],
    },
  });
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  function onSubmit(
    values: z.infer<typeof formSchema>,
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log("shiit", values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={(event) => onSubmit(form.getValues(), event)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <>{errors.firstName?.message}</>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible className="w-full">
          {/* Experience */}
          <AccordionItem value="item-1">
            <AccordionTrigger>Add Experience ?</AccordionTrigger>
            <AccordionContent>
              <FormItem className="border p-2">
                <FormLabel>Experience:</FormLabel>
                {experienceFields.map((field, index) => (
                  <div key={field.id}>
                    <div className="flex items-center gap-2">
                      <FormLabel>Company:</FormLabel>
                      <FormControl>
                        <Input
                          {...register(`experience.${index}.company` as const)}
                        />
                      </FormControl>
                      <FormLabel>Position:</FormLabel>
                      <FormControl>
                        <Input
                          {...register(`experience.${index}.position` as const)}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormLabel>Start Date:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...register(
                            `experience.${index}.startDate` as const
                          )}
                        />
                      </FormControl>
                      <FormLabel>End Date:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...register(`experience.${index}.endDate` as const)}
                        />
                      </FormControl>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => removeExperience(index)}
                        disabled={experienceFields.length === 1}
                      >
                        Remove Experience
                      </Button>
                      <Button
                        onClick={() =>
                          appendExperience({
                            company: "",
                            position: "",
                            startDate: null,
                            endDate: null,
                          })
                        }
                      >
                        Add Experience
                      </Button>
                    </div>
                  </div>
                ))}
              </FormItem>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Add Education ?</AccordionTrigger>
            <AccordionContent>
              {/* Education */}
              <FormItem className="border p-2">
                <FormLabel>Education:</FormLabel>
                {educationFields.map((field, index) => (
                  <div key={field.id}>
                    <div className="flex items-center gap-2">
                      <FormLabel>Institution:</FormLabel>
                      <FormControl>
                        <Input
                          {...register(
                            `education.${index}.institution` as const
                          )}
                        />
                      </FormControl>
                      <FormLabel>Degree:</FormLabel>
                      <FormControl>
                        <Input
                          {...register(`education.${index}.degree` as const)}
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormLabel>Field of Study:</FormLabel>
                      <FormControl>
                        <Input
                          {...register(
                            `education.${index}.fieldOfStudy` as const
                          )}
                        />
                      </FormControl>
                      <FormLabel>Start Date:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...register(`education.${index}.startDate` as const)}
                        />
                        <h1></h1>
                      </FormControl>
                      <FormLabel>End Date:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...register(`education.${index}.endDate` as const)}
                        />
                      </FormControl>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => removeEducation(index)}
                        disabled={educationFields.length === 1}
                      >
                        Remove Education
                      </Button>
                      <Button
                        onClick={() =>
                          appendEducation({
                            institution: "",
                            degree: "",
                            fieldOfStudy: "",
                            startDate: null,
                            endDate: null,
                          })
                        }
                      >
                        Add Education
                      </Button>
                    </div>
                  </div>
                ))}
              </FormItem>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default DevForm;
