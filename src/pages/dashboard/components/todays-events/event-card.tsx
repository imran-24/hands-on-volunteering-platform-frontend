import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserEvent } from "@/utils/type";
import { format } from "date-fns";
import { ChevronRight, Video } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: UserEvent[];
  eventDate: Date;
  location: string;
  city?: string;
  country?: string;
  urgent?: string;
  link?: string;
}

const EventCard = ({
  attendees,
  eventDate,
  endTime,
  location,
  startTime,
  title,
  id,
  city,
  country,
  urgent,
  link,
}: EventCardProps) => {
  const date = format(new Date(eventDate), "dd");
  const month = format(new Date(eventDate), "MMMM");

  console.log(attendees, id);

  return (
    <Card className='p-4 gap-2 font-mono'>
      <CardHeader className='p-0 border-b pb-4'>
        <div className='flex items-center space-x-4'>
          <div className='lg:size-16 size-13 aspect-square  lg:rounded-xl rounded-lg  shadow'>
            <div className='bg-rose-500 lg:rounded-t-xl  rounded-t-lg'>
              <p className='text-white lg:text-sm py-1 text-center text-xs'>
                {month}
              </p>
            </div>
            <div>
              <p className='lg:text-xl text-[18px] lg:font-semibold font-medium text-center'>
                {date}
              </p>
            </div>
          </div>

          <div className='w-full'>
            <div className='flex items-center justify-between  text-sm  text-rose-500'>
              <p className='text-muted-foreground'>{location}</p>
              {urgent && <Badge className='lowercase'>{urgent}</Badge>}
            </div>
            <div className='flex items-center space-x-1 '>
              <div className='size-2 shrink-0  bg-red-500 rounded-full' />
              <p className='text-base font-medium line-clamp-1'>{title}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-0 space-y-2'>
        <div>
          <p className='text-3xl font-semibold flex items-center space-x-3'>
            <span>{startTime} </span>
            <ChevronRight className='size-4 text-muted-foreground' />
            <span>{endTime}</span>
          </p>
        </div>
        {/* <div>
            {
                attendees?.map((attendee) => (
                    <Avatar>
                        <AvatarImage src={attendee.user.profileImage} />
                    </Avatar>
                ))
            }
        </div> */}
        {city ? (
          <p className='text-sm'>
            {city}, {country}
          </p>
        ) : (
          <Button asChild variant={"outline"}>
            {link && (
              <Link to={link}>
                <div className='flex items-center '>
                <Video className='size-5 mr-2 fill-gray-100 text-sky-600 ' />
                <p>Go to Zoom link</p>
                </div>
              </Link>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;

export function EventCardSkeleton() {
  return (
    <Skeleton className='p-4 gap-2 font-mono rounded-xl'>
      <div className='p-0 pb-4'>
        <div className='flex items-center space-x-4'>
          <div className='lg:size-16 size-13 aspect-square  lg:rounded-xl rounded-lg  shadow'>
            <div className='bg-rose-500 lg:rounded-t-xl pb-4  rounded-t-lg'>
              <Skeleton className='text-white lg:text-sm py-1 text-center text-xs' />
            </div>
            <div>
              <Skeleton className='lg:text-xl text-[18px] lg:font-semibold font-medium text-center' />
            </div>
          </div>

          <div className='w-full space-y-1'>
            <div className='flex items-center justify-between  text-sm  text-rose-500'>
              <Skeleton className='h-5 w-20' />
              <Skeleton className='w-10 h-4' />
            </div>
            <div className='flex items-center space-x-1 '>
              <Skeleton className='size-2 shrink-0  bg-red-500 rounded-full' />
              <Skeleton className='h-6 w-40' />
            </div>
          </div>
        </div>
      </div>

      
      <CardContent className='p-0 space-y-2'>
        <div className='flex items-center space-x-3'>
          <Skeleton className='h-10 w-20' />
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-10 w-20' />
        </div>

        <Skeleton className='h-6 w-40' />
      </CardContent>
    </Skeleton>
  );
}
