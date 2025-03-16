import { Loader2, ServerCrash } from "lucide-react";

import { Fragment } from "react/jsx-runtime";
import { HelpRequest } from "@/utils/type";
import { ElementRef, useRef } from "react";
import { useScroll } from "@/hooks/use-scroll";
import PostCard, { PostCardSkeleton } from "./post-card";
import { usePostQuery } from "@/hooks/use-post-query";
import { useAuth } from "@/context/auth-provider";
import HelpRequestForm from "../help-request-form";

const queryKey = "posts";

const PostList = () => {
  const { user } = useAuth();
  const apiUrl = `${import.meta.env.VITE_REACT_BASE_URL}/help-requests`;

  const teamRef = useRef<ElementRef<"div">>(null!);
  const bottomRef = useRef<ElementRef<"div">>(null!);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePostQuery({
      queryKey,
      apiUrl,
    });

  useScroll({
    bottomRef,
    mainRef: teamRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.posts?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div>
        <HelpRequestForm user={user} />
        <div className='gap-3 mt-5'>
          <PostCardSkeleton />
          <PostCardSkeleton />
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
        <HelpRequestForm user={user} />
        <div className='space-y-3 mt-5'>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.posts?.map((post: HelpRequest) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  createdAt={post.createdAt}
                  description={post.description}
                  messages={post.comments}
                  title={post.title}
                  urgency={post.urgency}
                  profileImage={post.user.profileImage}
                  userId={post.userId}
                  isOwner={user.id === post.userId}
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

export default PostList;
