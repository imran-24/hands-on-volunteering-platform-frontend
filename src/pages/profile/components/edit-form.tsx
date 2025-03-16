import {
  Select,
  SelectContent,
  // SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { causes, skills } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50, "Name is invalid"),
  bio: z.string().min(10).max(250),
  skills: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  causes: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditForm = ({
  user,
  changeName,
  changeBio,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  changeName: (name: string) => void;
  changeBio: (bio: string) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      causes:
        user.causes?.map((cause: string) => ({
          label: causes.find((c) => c.value === cause)?.label || cause,
          value: cause,
        })) || [],
      skills:
        user.skills?.map((skill: string) => ({
          label: skills.find((s) => s.value === skill)?.label || skill,
          value: skill,
        })) || [],
    },
  });

  const bio = form.watch("bio");
  const name = form.watch("name");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/users/${user.id}`,
        {
          ...values,
          causes: values.causes?.map((cause) => cause.label),
          skills: values.skills?.map((skill) => skill.label),
        }
      );

      toast.success("Profile updated");
      changeBio(bio);
      changeName(name);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit profile</CardTitle>
        <CardDescription>Update user profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='text-sm' placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className='text-sm'
                      placeholder='Bio'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='causes'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select atleast one cause' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {causes.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name='causes'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.value}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.some(
                                      (v) => v.value === item.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            {
                                              value: item.value,
                                              label: item.label,
                                            },
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value.value !== item.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='text-sm font-normal'>
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className='gap-1 flex flex-wrap '>
                    {field.value.map((value) => (
                      <Badge>{value.label}</Badge>
                    ))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='skills'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select atleast one skill' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skills.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name='skills'
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.value}
                                className='flex flex-row items-start space-x-3 space-y-0'
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.some(
                                      (v) => v.value === item.value
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            {
                                              value: item.value,
                                              label: item.label,
                                            },
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value.value !== item.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='text-sm font-normal'>
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className='gap-1 flex flex-wrap'>
                    {field.value.map((value, idx) => (
                      <Badge key={idx}>{value.label}</Badge>
                    ))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='rounded-full cursor-pointer'
              variant={"secondary"}
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditForm;
