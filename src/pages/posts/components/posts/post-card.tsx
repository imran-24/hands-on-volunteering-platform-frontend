import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Copy,
  Edit2,
  MessageCircleMore,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import CommentsList from "../comments/comments-list";
import { formatDistanceToNow } from "date-fns";
import ProfilePicture, {
  ProfilePictureSkeleton,
} from "@/components/profile-picture";
import HelpRequestDialog from "./help-request-dialog";
import axios from "axios";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Comment, HelpRequest } from "@/utils/type";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  messages: Comment[];
  createdAt: Date;
  profileImage: string | undefined;
  userId: string;
  isOwner: boolean;
  urgency: string;
}

const PostCard = ({
  messages,
  createdAt,
  description,
  id,
  profileImage,
  title,
  userId,
  isOwner,
  urgency,
}: PostCardProps) => {
  const [comments, setComments] = useState(messages || []);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const toggle = () => setIsOpen((open) => !open);

  // ✅ Update Mutation (Optimistic Update)
  const updatePostMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (values: any) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/help-requests/${id}`,
        {
          title: values.title,
          description: values.description,
          userId,
          urgency: values.urgencyLevel,
        }
      );
      toast.success("Post updated");
      return response.data;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousData = queryClient.getQueryData(["posts"]);

      console.log(previousData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["posts"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pages: oldData.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((post: HelpRequest) =>
              post.id === id ? { ...post, ...newData } : post
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (_err, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ✅ Delete Mutation (Optimistic Removal)
  const deletePostMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `${import.meta.env.VITE_REACT_BASE_URL}/help-requests/${id}`
      );
      return id;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousData = queryClient.getQueryData(["posts"]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["posts"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pages: oldData.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter((post: HelpRequest) => post.id !== id),
          })),
        };
      });
      toast.success("Post deleted!");

      return { previousData };
    },
    onError: (_err, _postId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateComments = (comments: Comment[]) => setComments(comments);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <div className='flex space-x-4'>
            <ProfilePicture profileImage={profileImage} />
            <div>
              <p className='text-sm font-medium'>Imran Syam</p>
              <p className='text-xs font-light text-gray-400'>
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Popover open={isOpen} onOpenChange={toggle}>
            <PopoverTrigger>
              <Button variant={"ghost"} size={"icon"}>
                <MoreHorizontal className='size-5 text-gray-500' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-44 p-2'>
              {isOwner && (
                <HelpRequestDialog
                  onUpload={updatePostMutation.mutate}
                  title={title}
                  description={description}
                  urgency={urgency}
                >
                  <Button
                    className='flex items-center text-muted-foreground hover:text-muted-foreground font-normal justify-start w-full'
                    variant={"ghost"}
                  >
                    <Edit2 className='size-4 mr-2' />
                    <p>Edit Post</p>
                  </Button>
                </HelpRequestDialog>
              )}
              <Button
                className='flex items-center text-muted-foreground hover:text-muted-foreground font-normal justify-start w-full'
                variant={"ghost"}
              >
                <Copy className='size-4 mr-2' />
                <p>Copy Post</p>
              </Button>
              {isOwner && (
                <ConfirmModal onConfirm={() => deletePostMutation.mutate()}>
                  <Button
                    className='flex items-center text-rose-500 hover:text-rose-500 font-normal justify-start w-full'
                    variant={"ghost"}
                  >
                    <Trash2 className='size-4 mr-2' />
                    <p>Delete Post</p>
                  </Button>
                </ConfirmModal>
              )}
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <h2 className='text-xl text-black'>{title}</h2>
          <p className='text-sm'>{description}</p>
        </div>

        <Dialog>
          <DialogTrigger className='w-full flex items-center justify-end'>
            <Button
              variant={"ghost"}
              className='rounded-lg w-fit text-muted-foreground'
            >
              <MessageCircleMore className='size-4' />
              <p>{comments.length}</p>
            </Button>
          </DialogTrigger>
          <DialogContent className='h-3/4 w-full overscroll-y-auto'>
            <DialogHeader className='h-fit'>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <DialogDescription className='h-full overflow-y-auto w-full'>
              <CommentsList
                profileImage={profileImage}
                comments={comments}
                userId={userId}
                helpRequestId={id}
                addComment={updateComments}
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PostCard;

export function PostCardSkeleton() {
  return (
    <Card className='flex flex-col space-y-3'>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <div className='flex space-x-4'>
            <ProfilePictureSkeleton />
            <div className='space-y-1'>
              <Skeleton className='h-5 w-20' />
              <Skeleton className='h-5 w-10' />
            </div>
          </div>
          <div>
            <MoreHorizontal className='size-5 text-gray-500' />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-5 w-full' />
        <div className='w-fit text-muted-foreground ml-auto '>
          <MessageCircleMore className='size-4 ' />
        </div>
      </CardContent>
    </Card>
  );
}
