import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { eventCategories } from "@/utils/constant";
import React, { useEffect } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuth } from "@/context/auth-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/image-upload";

import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  imageUrl: z.string().optional(),
  isOnline: z.boolean().default(false),
  meetingLink: z.string().optional(),
  urgencyLevel: z.enum(["low", "medium", "urgent"]).optional(),
});

export function EventForm() {
  // 1. Define your form.
  const { user } = useAuth();
  const router = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const imageUrl = form.watch("imageUrl");

  const path = `/event-management/user/${user.id}/events/${uuidv4()}`;

  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    if (date) form.setValue("date", date);
  }, [date]);

  const uploadImage = (url: string) => {
    form.setValue("imageUrl", url);
  };

  const isOnline = form.watch("isOnline");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user.id) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BASE_URL}/events`,
        {
          ...values,
          organizerId: user.id,
        }
      );
      form.reset();
      router("/events");
      toast.success("Event created!")

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong!")
    }

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 grid grid-cols-1 items-center  sm:grid-cols-2 lg:grid-cols-3 space-x-4'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder='Evanto labs' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Choose category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem value={category.key} key={category.key}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className={cn("space-y-2")}>
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <FormField
          control={form.control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder='13.00' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder='20.00' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Location</FormLabel>
              <FormControl>
                <Input placeholder='Banani' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isOnline && (
          <>
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Street address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='City' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder='Country' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name='isOnline'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 mt-5 '>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (checked) {
                      form.setValue("location", "");
                      form.setValue("city", "");
                      form.setValue("address", "");
                      form.setValue("country", "");
                    }
                  }}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>Is online event</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {isOnline && (
          <FormField
            control={form.control}
            name='meetingLink'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Link</FormLabel>
                <FormControl>
                  <Input placeholder='Meeting URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='urgencyLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Urgency Level</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select urgency' />
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

        {/* <FormField
          control={form.control}
          name='imageUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input placeholder='Upload image' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className='flex flex-col space-y-2'>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=''
              className='aspect-[4/2]   object-cover object-center shrink-0'
            />
          )}

          <ImageUpload path={path} onChange={uploadImage}>
            <Button variant={"secondary"}>Upload Image</Button>
          </ImageUpload>
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Add event description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='rounded-full'>
          Create Event
        </Button>
      </form>
    </Form>
  );
}
