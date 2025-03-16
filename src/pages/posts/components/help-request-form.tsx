import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Send } from "lucide-react";
import HelpRequestDialog from "./posts/help-request-dialog";
import ProfilePicture from "@/components/profile-picture";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/utils/type";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface HelpRequestFormProps {
  user: User;
}

const HelpRequestForm = ({ user }: HelpRequestFormProps) => {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addPostMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (newPost: any) => {
      const response = await axios.post(
        "${import.meta.env.VITE_REACT_BASE_URL}/help-requests",
        {
          title: newPost.title,
          description: newPost.description,
          userId: user.id,
          urgency: newPost.urgencyLevel,
        }
      );
      toast.success("Post uploaded!");
      return response.data;
    },
    onMutate: async (newPost) => {
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
            posts: [{ id: Date.now(), ...newPost }, ...page.posts], // Temporary optimistic post
          })),
        };
      });

      return { previousData };
    },
    onError: (_err, _newPost, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  console.log(user.isOrganization);
  return (
    <div className='mb-3'>
      <Card className='gap-0'>
        <CardHeader className=''>
          <CardTitle>
            <div className='flex space-x-4'>
              <ProfilePicture profileImage={user.profileImage} />
              <div>
                <p className='text-sm font-medium capitalize'>{user.name}</p>
                <Badge variant={"active"}>
                  {user.isOrganization ? "Organization" : "User"}
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <HelpRequestDialog onUpload={() => addPostMutation.mutate}>
            <Textarea
              value={""}
              className='border-none ring-0  resize-none focus-visible:ring-0 focus-visible:outline-0 shadow-none text-xl'
              placeholder="What's on your mind?"
            />
          </HelpRequestDialog>
          <div className='flex items-center justify-between  space-x-2'>
            <Button
              size={"icon"}
              variant={"outline"}
              className='flex items-center text-muted-foreground '
            >
              <ImagePlus className='size-4' />
              {/* <p className="text-sm">Image</p> */}
            </Button>
            <Button
              size={"icon"}
              className='flex items-center justify-center text-white bg-indigo-500 pr-1'
            >
              <Send className='size-4 rotate-45' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpRequestForm;
