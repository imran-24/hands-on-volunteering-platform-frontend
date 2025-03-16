import { Loader2, ServerCrash } from "lucide-react";

import { Fragment } from "react/jsx-runtime";
import { Event } from "@/utils/type";
import { ElementRef, useRef } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { usePostQuery } from "@/hooks/use-post-query";
import EventCard, { EventCardSkeleton } from "./event-card";
import Header from "@/components/header";

const queryKey = "posts";

const EventList = () => {
  const apiUrl = `${import.meta.env.VITE_REACT_BASE_URL}/events`;

  const eventRef = useRef<ElementRef<"div">>(null!);
  const bottomRef = useRef<ElementRef<"div">>(null!);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePostQuery({
      queryKey,
      apiUrl,
    });

  useScroll({
    bottomRef,
    mainRef: eventRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.events?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div>
        <Header
          title='Upcomming Events'
          description='Join an event to enjoy life'
        />
        <div className='grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4 mt-5'>
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
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
  return (
    <div ref={eventRef}>
      <div className=''>
        <div ref={bottomRef} />

        <Header
          title='Upcomming Events'
          description='Join an event to enjoy life'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-4 mt-5'>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.events?.map((event: Event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  eventDate={event.date}
                  description={event.description}
                  title={event.title}
                  profileImage={event.organizer.profileImage}
                  userId={event.organizerId}
                  attendees={event.attendees}
                  urgency={event.urgencyLevel}
                  location={event.location}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>

      {hasNextPage && (
        <div className='flex justify-center'>
          {isFetchingNextPage ? (
            <Loader2 className='h-6 w-6 text-zinc-500 animate-spin my-4' />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition'
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
