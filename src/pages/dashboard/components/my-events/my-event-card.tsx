import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Option from "@/pages/profile/components/option";
import { cardOptions } from "@/utils/constant";
import { UserEvent } from "@/utils/type";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface MyEventCardProps {
  id?: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  attendees: UserEvent[];
  eventDate: Date;
  location?: string;
  city?: string;
  country?: string;
  urgent?: string;
  link?: string;
}

const MyEventCard = ({
  attendees,
  description,
  endTime,
  eventDate,

  startTime,
  title,
  city,
  country,
  link,
}: MyEventCardProps) => {
  const [selected, setSelected] = useState(cardOptions[0]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (option: any) => {
    setSelected(option);
  };

  return (
    <Card className='p-4 rounded-lg font-mono gap-4 text-sm'>
      <CardHeader className='p-0'>
        <CardTitle className='font-light space-y-4'>
          <div className='flex items-center space-x-2'>
            <div className='size-2 shrink-0 rounded-full bg-indigo-400' />
            <p>{title}</p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center text-muted-foreground space-x-2'>
              <Calendar className='size-4' />
              <span>{format(new Date(eventDate), "dd-MM-yyyy")}</span>
            </div>
            <div className='flex items-center text-muted-foreground space-x-2'>
              <Clock className='size-4' />
              <span>{startTime}</span>
              <ArrowRight className='size-4' />
              <span>{endTime}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <div className='border-b' />
      <CardContent className='p-0 space-y-4'>
        <div className='bg-neutral-100 p-1 rounded-lg'>
          {cardOptions.map((option) => (
            <Option
              option={option}
              key={option.id}
              selected={selected.value === option.value}
              onChange={handleChange}
            />
          ))}
        </div>

        {cardOptions[0].value === selected.value && (
          <div className='px-2 space-y-2'>
            <p>{description}</p>
            {city ? (
              <p className='text-muted-foreground'>
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
          </div>
        )}

        {cardOptions[1].value === selected.value && (
          <div className='px-2'>
            <p>{attendees.length} attendees</p>
            {/* {attendees.map((attendee) => (
              <div key={attendee.id} className='flex items-start space-x-2'>
                <Avatar>
                  <AvatarImage src={attendee.user.profileImage} />
                </Avatar>
                <p>{attendee.user.name}</p>
              </div>
            ))} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyEventCard;

export function MyEventCardSkeleton() {
  return (
    <Skeleton className='p-4 gap-2 font-mono rounded-xl'>
      <div className='p-0 pb-4'>
      <div className='w-full space-y-2'>
            <div className='flex items-center space-x-1 '>
              <Skeleton className='size-2 shrink-0  bg-indigo-400 rounded-full' />
              <Skeleton className='h-5 w-20' />
            </div>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-4 w-40' />
          </div>
          
      </div>

      <CardContent className='p-0 space-y-4'>
        
          <Skeleton className='h-9 w-full flex items-center p-1'>
             <Skeleton className="h-full w-20 bg-white">
                <p className="text-center text-sm  mt-1">Details</p>
             </Skeleton>      
          </Skeleton>  

          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />

      </CardContent>
    </Skeleton>
  );
}
