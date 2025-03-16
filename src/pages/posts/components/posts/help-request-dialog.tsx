import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Send } from "lucide-react";
import { useAuth } from "@/context/auth-provider";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/image-upload";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  urgencyLevel: z.enum(["low", "medium", "urgent"]).optional(),
  photoUrl: z.string().optional(),
});

interface HelpRequestDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  urgency?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload: (request: any) => void;
}

const HelpRequestDialog = ({
  children,
  title,
  description,
  urgency,
  onUpload,
}: HelpRequestDialogProps) => {
  // 1. Define your form.

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      urgencyLevel:
        (urgency as "low" | "medium" | "urgent" | undefined) || "low",
    },
  });

  const image = form.watch("photoUrl");

  const [loading, setLoading] = useState(false);

  const uploadCover = async (url: string) => {
    setLoading(true);
    console.log(url);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/post`,
        {
          coverImage: url,
        }
      );

      form.setValue("photoUrl", response.data.coverImage);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user.id) return;

    onUpload(values);
    toggle();

    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold'>Seek Help</DialogTitle>
          <DialogDescription>Ask for request</DialogDescription>
          <div className='mt-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='urgencyLevel'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className='w-full'>
                          <SelectTrigger>
                            <SelectValue
                              placeholder='Select urgency'
                              defaultValue={field.value}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='low'>Low</SelectItem>
                          <SelectItem value='medium'>Medium</SelectItem>
                          <SelectItem value='urgent'>Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='border rounded-xl space-y-4'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder='Title'
                            {...field}
                            className='border-none outline-0 rounded-none focus-visible:ring-0 focus-visible:outline-0 '
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
                            placeholder="What's on your mind"
                            {...field}
                            className='border-none outline-0  shadow-none  rounded-none focus-visible:ring-0 focus-visible:outline-0 resize-none '
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex items-center justify-between  space-x-2'>
                  <ImageUpload
                    path={`/event-management/users/${user.id}/posts`}
                    disabled={loading}
                    onChange={uploadCover}
                  >
                    <Button
                      type='button'
                      size={"icon"}
                      variant={"outline"}
                      className='flex items-center text-muted-foreground '
                    >
                      <ImagePlus className='size-4' />
                      {/* <p className="text-sm">Image</p> */}
                    </Button>
                  </ImageUpload>

                  {image && (
                    <img
                      src={image}
                      alt=''
                      className='aspect-square h-32 object-contain'
                    />
                  )}

                  <Button
                    size={"icon"}
                    type='submit'
                    className='flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-700 transition-colors transform pr-1'
                  >
                    <Send className='size-4 rotate-45' />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpRequestDialog;
