import { Event } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EventCard, { EventCardSkeleton } from "./event-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Smile, ServerCrash } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EventResponse {
  events: Event[];
}

const TodaysEvent = () => {
  const api = `${import.meta.env.VITE_REACT_BASE_URL}/events/today`;

  const fetchTodaysEvents = async () => {
    try {
      const response = await axios.get<EventResponse>(api);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch today's events: " + error);
    }
  };

  const { data, status } = useQuery<EventResponse>({
    queryKey: ["todaysEvents"],
    queryFn: fetchTodaysEvents,
  });

  if (status === "pending") {
    return (
      <div className='relative w-full px-16 '>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <EventCardSkeleton />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <ServerCrash className='h-7 w-7 text-zinc-500 my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>
          Something went wrong!
        </p>
      </div>
    );
  }

  if (!data.events.length) {
    return (
      <div className='px-16'>
        <Card className='flex flex-col flex-1 justify-center items-center'>
          <Smile className='h-7 w-7 text-zinc-500 ' />
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>
            There is no events for today
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className='relative w-full px-16'>
      <Carousel>
        <CarouselContent>
          {data.events.map((event: Event) => (
            <CarouselItem key={event.id}>
              <EventCard
                id={event.id}
                attendees={event.attendees}
                eventDate={event.date}
                startTime={event.startTime}
                endTime={event.endTime}
                title={event.title}
                location={event.location}
                city={event.city}
                country={event.country}
                urgent={event.urgencyLevel}
                link={event.meetingLink}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TodaysEvent;
