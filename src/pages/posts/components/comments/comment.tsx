import ProfilePicture from "@/components/profile-picture";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Comment = ({ comment }: { comment: any }) => {
  return (
    <div className='flex items-start space-x-4'>
      <ProfilePicture profileImage={comment.user.profileImage} size='sm' />
      <div>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-semibold capitalize'>{comment.user.name}</p>
          <p className='text-xs text-muted-foreground'>
            {format(new Date(comment.createdAt), "PPP")}
          </p>
        </div>
        <p className='text-muted-foreground text-sm'>{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
