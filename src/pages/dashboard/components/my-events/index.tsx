import { Event } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ServerCrash } from "lucide-react";
import MyEventCard, { MyEventCardSkeleton } from "./my-event-card";

interface EventResponse {
  events: Event[];
}

const MyEvents = () => {
  const api = `${import.meta.env.VITE_REACT_BASE_URL}/events/mine`;

  const fetchMyEventss = async () => {
    try {
      const response = await axios.get<EventResponse>(api);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch today's events: " + error);
    }
  };

  const { data, status } = useQuery<EventResponse>({
    queryKey: ["MyEventss"],
    queryFn: fetchMyEventss,
  });

  if (status === "pending") {
    return (
      <div className='relative w-full px-16 col-span-1'>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <MyEventCardSkeleton />
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

  const events = data.events;

  if(!events.length) return;
  
  return (
    <div className='relative w-full px-16'>
      <Carousel>
        <CarouselContent>
          {events.map((event: Event) => (
            <CarouselItem key={event.id}>
              <MyEventCard
                description={event.description}
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

export default MyEvents;
