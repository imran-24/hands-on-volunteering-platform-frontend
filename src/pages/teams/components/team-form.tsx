import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-provider";
import { Team } from "@/utils/type";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  type: z.enum(["private", "public"]),
});

interface TeamFormProps {
  children: React.ReactNode;
  name?: string;
  description?: string;
  id?: string;
  type?: string;
  updateList?: (team: Team) => void;
}

const TeamForm = ({ children, description, id, name, type }: TeamFormProps) => {
  const { user } = useAuth();
  const drawerName = name ? "Update Team" : "Create a Team";
  const drawerDescription = description
    ? "You can always update team"
    : "Say something about the team";
  const buttonLabel = id ? "Save changes" : "Create";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
      type: (type as "private" | "public") || "public",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (id) {
        const response = await axios.patch(
          `${import.meta.env.VITE_REACT_BASE_URL}/teams/${id}`,
          {
            ...values,
            organizerId: user.id,
          }
        );

        toast.success("Team updated");
        console.log(response.data);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/teams`,
          {
            ...values,
            organizerId: user.id,
          }
        );

        toast.success("Team created");
        form.reset();
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  }

  return (
    <Drawer modal>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerName}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 max-w-lg w-full mx-auto pb-10'
            >
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className='w-full'>
                        <SelectTrigger>
                          <SelectValue placeholder='Select team type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='public'>Public</SelectItem>
                        <SelectItem value='private'>Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='Write the name of you team'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Tell us more about the team'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex items-center justify-end  space-x-2'>
                <Button type='submit'>{buttonLabel}</Button>
                <DrawerClose>
                  <Button type='button' variant='outline'>
                    Cancel
                  </Button>
                </DrawerClose>
              </div>
            </form>
          </Form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TeamForm;
