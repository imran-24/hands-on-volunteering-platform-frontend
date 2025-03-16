import { Event } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ArrowRight, Clock, ServerCrash, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface EventResponse {
  event: Event;
}

const LatestEvent = () => {
  const api = `${import.meta.env.VITE_REACT_BASE_URL}/events/today/latest`;

  const fetchLatestEvents = async () => {
    try {
      const response = await axios.get<EventResponse>(api);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch today's events: " + error);
    }
  };

  const { data, status } = useQuery<EventResponse>({
    queryKey: ["LatestEvents"],
    queryFn: fetchLatestEvents,
  });

  if (status === "pending") {
    return <div className='col-span-5 relative w-full px-16'></div>;
  }

  if (status === "error") {
    return (
      <div className='col-span-5 flex flex-col flex-1 justify-center items-center'>
        <ServerCrash className='h-7 w-7 text-zinc-500 my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Something went wrong!
        </p>
      </div>
    );
  }


  const event = data.event;

  return (
    <div className='col-span-7 lg:col-span-5 relative w-full font-mono'>
      <Card className='gap-2'>
        <CardHeader>
          <CardTitle className='flex items-start justify-between'>
            <div className='flex items-center space-x-1 '>
              <div className='size-2 shrink-0  bg-red-500 rounded-full' />
              <p className='text-base font-medium line-clamp-1'>
                {event.title}
              </p>
            </div>
            <Badge>{event.urgencyLevel}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='flex items-center text-muted-foreground space-x-1'>
            <Clock className='size-4' />
            <p>Today at:</p>
            <span>{event.startTime}</span>
            <ArrowRight className='size-4' />
            <span>{event.endTime}</span>
          </div>
          {event.city ? (
            <p className='text-sm'>
              {event.city}, {event.country}
            </p>
          ) : (
            <Button asChild variant={"outline"}>
              {event.meetingLink && (
                <Link to={event.meetingLink}>
                  <div className='flex items-center '>
                    <Video className='size-6 mr-2 text-gray-100 fill-sky-600 ' />
                    <p>Go to Zoom link</p>
                  </div>
                </Link>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestEvent;
