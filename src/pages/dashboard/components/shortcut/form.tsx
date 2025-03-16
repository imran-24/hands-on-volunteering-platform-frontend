import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { useEffect } from "react";
import { shortcutCreateOptions } from "@/utils/constant";
import { useAuth } from "@/context/auth-provider";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().optional(),
  isOnline: z.boolean().default(false),
  meetingLink: z.string().optional(),
  urgencyLevel: z.enum(["low", "medium", "urgent"]),
  attendees: z.array(z.string()).optional(),
});

interface ShortcutEventFormProps {
  meet: boolean;
  event: boolean;
  date: Date | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (option: any) => void;
}

const ShortcutEventForm = ({
  event,
  meet,
  date,
  handleChange,
}: ShortcutEventFormProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (date) form.setValue("date", date);
    if (meet) form.setValue("isOnline", true);
    if (event) form.setValue("isOnline", false);

  }, [date, meet, event]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
      toast.success("Event created")

      form.reset();

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Add something title, like 'Running'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className='p-0 rounded-md gap-2'>
          <CardHeader className=' border-b p-2'>
            <CardTitle className='flex items-center text-muted-foreground text-sm'>
              <Clock className='size-4 mr-2' />
              <p className='font-medium'>Date and Time</p>
            </CardTitle>
          </CardHeader>
          <CardContent className='px-3 space-y-2 pb-2 relative'>
            <div className={cn(" flex items-center space-x-3 ")}>
              <FormLabel className='text-muted-foreground font-normal'>
                Date
              </FormLabel>
              <button
                type='button'
                className={cn(
                  "w-full justify-start items-center  transition-transform ease-in-out    text-left font-normal flex space-x-2 border px-3 py-2 bg-white hover:text-black text-sm  rounded-md",
                  !date && "text-muted-foreground font-normal"
                )}
              >
                <CalendarIcon className='size-4 mr-2' />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </button>
            </div>

            <FormField
              control={form.control}
              name='startTime'
              render={({ field }) => (
                <FormItem className='flex items-center'>
                  <FormLabel className='text-muted-foreground font-normal'>
                    From
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='13.00' />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-4.5'>
                  <FormLabel className='text-muted-foreground font-normal'>
                    To
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='20.00' />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {event && (
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
        )}

        {meet && (
          <>
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
                        handleChange(shortcutCreateOptions[0]);
                      }}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Is online event</FormLabel>
                  </div>
                </FormItem>
              )}
            />

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
          </>
        )}

        <FormField
          control={form.control}
          name='urgencyLevel'
          render={({ field }) => (
            <FormItem>
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

        <Button type='submit' className='w-full'>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default ShortcutEventForm;
