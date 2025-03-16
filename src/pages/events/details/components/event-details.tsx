import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EventDetails = ({ event }: { event: any }) => {
  const [attendees, setAttendees] = useState(event.attendees.length);
  const origin = useOrigin();
  const url = `${origin}/events/${event.id}`;

  const [copied, setCopied] = useState(false);

  const [selected, setSelected] = useState("details");
  const { user } = useAuth();

  const [joined, setJoined] = useState(
    event.attendees.some(
      (attendee: { userId: string }) => attendee.userId === user.id
    )
  );

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const joinEvent = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      if (!joined) {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/events/join`,
          {
            eventId: event.id,
            userId: user.id,
          }
        );
        setJoined(true);
        setAttendees((prev: number) => prev + 1);
        console.log(response.data);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/events/leave`,
          {
            eventId: event.id,
            userId: user.id,
          }
        );
        setJoined(false);
        setAttendees((prev: number) => prev - 1);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
      <div className='lg:col-span-2 text-sm'>
        <div className='flex items-center space-x-4 border-b'>
          <div
            className={`cursor-pointer ${
              selected === "details" ? "border-b-2 border-yellow-500" : ""
            }`}
            onClick={() => setSelected("details")}
          >
            <p
              className={`${
                selected === "details" ? "text-yellow-500" : "text-gray-400"
              } py-2 font-medium text-[13px]`}
            >
              Details
            </p>
          </div>
          <div
            className={`cursor-pointer ${
              selected === "attendee"
                ? "border-b-2 border-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => setSelected("attendee")}
          >
            <p
              className={`${
                selected === "attendee" ? "text-yellow-500" : ""
              } py-2 font-medium text-[13px]`}
            >
              Attendee {attendees > 0 && `(${attendees})`}
            </p>
          </div>
        </div>
        <div className='mt-10 transform transition-all ease-in-out duration-200'>
          {selected === "details" && (
            <div>
              <p>{event.description}</p>
            </div>
          )}
          {selected === "attendee" && (
            <div>
              <p>
                {attendees > 0
                  ? `${attendees} Attendees`
                  : "You are invited to the event. "}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className='w-full space-y-2'>
        <Button
          onClick={joinEvent}
          variant={"attend"}
          size={"lg"}
          className='w-full'
        >
          {joined ? "You're Attending" : "Attend Event"}
        </Button>
        <Button variant={"ghost"} className='w-full' onClick={onCopy}>
          {copied ? (
            <Check className='text-gray-400 size-5 ' />
          ) : (
            <Share2 className='text-gray-400 size-5 ' />
          )}
          <p className='text-gray-400 font-semibold'>Share Link</p>
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
