import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Comment from "./comment";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ProfilePicture from "@/components/profile-picture";
import { Comment as CommentType } from "@/utils/type";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const CommentsList = ({
  comments,
  profileImage,
  userId,
  helpRequestId,
  addComment,
}: {
  comments: CommentType[];
  profileImage: string | undefined;
  userId: string;
  helpRequestId: string;
  addComment: (comment: CommentType[]) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BASE_URL}/help-requests/comments`,
        {
          content: values.content,
          userId,
          helpRequestId,
        }
      );
      form.reset();

      addComment(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    console.log(values);
  }

  return (
    <Card className='border-none shadow-none transform transition-all duration-200 h-full '>
      <CardContent className='px-2 py-0'>
        <div className='flex items-start space-x-4'>
          <ProfilePicture profileImage={profileImage} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 relative w-full'
            >
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Textarea
                        className='resize-none w-full text-sm pb-10'
                        placeholder='Write your comments here...'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                size={"icon"}
                type='submit'
                className='absolute bottom-5 right-1 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-700  pr-1'
              >
                <Send className='size-4 rotate-45' />
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 px-6'>
          {comments?.map((comment: CommentType, index: number) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsList;
