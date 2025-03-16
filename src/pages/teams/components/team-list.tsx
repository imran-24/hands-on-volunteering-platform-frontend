import { Loader2, ServerCrash } from "lucide-react";

import { Fragment } from "react/jsx-runtime";
import { Team } from "@/utils/type";
import { ElementRef, useRef } from "react";
import TeamCard, { TeamCardSkeleton } from "./team";
import { useScroll } from "@/hooks/use-scroll";
import { useQuery } from "@/hooks/use-query";
import TeamHeader from "./team-header";

const queryKey = "teams";

const TeamList = () => {
  const apiUrl = `${import.meta.env.VITE_REACT_BASE_URL}/teams`;

  const teamRef = useRef<ElementRef<"div">>(null!);
  const bottomRef = useRef<ElementRef<"div">>(null!);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useQuery({
      queryKey,
      apiUrl,
    });

  useScroll({
    bottomRef,
    mainRef: teamRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.teams?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div>
        <TeamHeader />
        <div className='gap-3 mt-5'>
          <TeamCardSkeleton />
          <TeamCardSkeleton />
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
    <div ref={teamRef}>
      <div className=' flex flex-col'>
        <div ref={bottomRef} />

        <TeamHeader />

        <div className='space-y-3 mt-5'>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.teams?.map((team: Team) => (
                <TeamCard
                  key={team.id}
                  id={team.id}
                  createdAt={team.createdAt}
                  description={team.description}
                  members={team.members}
                  name={team.name}
                  organizer={team.organizer}
                  type={team.type}
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

export default TeamList;
