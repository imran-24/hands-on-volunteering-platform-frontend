import { format } from "date-fns";

import axios from "axios";
import { useAuth } from "@/context/auth-provider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { randomSelect, solidBgColors } from "@/utils/constant";
import { cn } from "@/lib/utils";
import { UserEvent } from "@/utils/type";
import ProfilePicture, {
  ProfilePictureSkeleton,
} from "@/components/profile-picture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  attendees: UserEvent[];
  eventDate: Date;
  profileImage: string | undefined;
  userId: string;
  location: string;
  urgency: string | undefined;
}

const EventCard = ({
  attendees,
  description,
  eventDate,
  id,
  location,
  profileImage,
  title,
  userId,
  urgency
}: EventCardProps) => {
  const { user } = useAuth();
  const bgColor = randomSelect(solidBgColors);
  const [joined, setJoined] = useState(
    attendees.some((attendee: { userId: string }) => attendee.userId === userId)
  );
  const date = new Date(eventDate);
  const formattedDate = format(date, "MM/dd/yy");

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
            eventId: id,
            userId,
          }
        );
        setJoined(true);
        console.log(response.data);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/events/leave`,
          {
            eventId: id,
            userId,
          }
        );
        setJoined(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col p-6 border bg-white rounded-lg shadow-md'>
      <div className=' space-y-6'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-3'>
            <ProfilePicture bgColor={bgColor} name={title} />
            <p className='font-medium '>{title}</p>
          </div>
          <div>
            <Badge variant={"outline"}>{urgency}</Badge>

          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>
            {formattedDate}- <span>{location}</span>
          </p>
          <p className=' font-medium line-clamp-1'>{description}</p>
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>Hosted by</p>
          <ProfilePicture size='sm' profileImage={profileImage} />
        </div>
        <div className='flex flex-col space-y-2'>
          <Button
            onClick={joinEvent}
            className={cn(
              `${bgColor} hover:${bgColor} hover:opacity-90`,
              "rounded-full"
            )}
          >
            {joined ? "Joined" : "Join Event"}
          </Button>
          <Button className='rounded-full' variant={"secondary"} asChild>
            <Link to={`/events/${id}`}>More information</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

export function EventCardSkeleton() {
  return (
    <Skeleton className='w-full flex flex-col p-6 border bg-white rounded-lg shadow-md'>
      <div className='w-full space-y-6'>
        <div className='flex justify-between'>
          <div className='w-full flex items-center space-x-3'>
            <ProfilePictureSkeleton />
            <Skeleton className='font-medium h-8 w-1/2 ' />
          </div>
          <Skeleton className='h-5 w-20' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-3 w-32' />
          <Skeleton className=' h-8 w-full' />
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>Hosted by</p>
          <Skeleton className='h-5 w-5 rounded-full' />
        </div>
        <div className='flex flex-col space-y-2'>
          <Skeleton className='h-10 py-2  w-full rounded-full text-center text-sm font-medium'>
            Joined
          </Skeleton>
          <Skeleton className='h-10 py-2  w-full rounded-full text-center text-sm font-medium'>
            More Information
          </Skeleton>
        </div>
      </div>
    </Skeleton>
  );
}
