import CustomToolTips from "@/components/custom-tool-tips";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import ProfilePicture, {
  ProfilePictureSkeleton,
} from "@/components/profile-picture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-provider";
import { cn } from "@/lib/utils";
import { randomSelect, solidBgColors } from "@/utils/constant";
import { User, UserTeam } from "@/utils/type";
import { format } from "date-fns";
import {
  Check,
  Copy,
  Edit2,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TeamForm from "./team-form";
import { useOrigin } from "@/hooks/use-origin";
import { toast } from "sonner";
import axios from "axios";

interface TeamCardProps {
  id: string;
  name: string;
  description?: string;
  members?: UserTeam[];
  organizer: User;
  createdAt: Date;
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TeamCard = ({
  createdAt,
  description,
  id,
  members,
  name,
  organizer,
  type,
}: TeamCardProps) => {
  const { user } = useAuth();
  const bgColor = useMemo(() => randomSelect(solidBgColors), []);

  const [joined, setJoined] = useState(
    members?.some((member) => member.id === user.id)
  );

  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);

  const [copied, setCopied] = useState(false);

  const url = `${origin}/teams/${id}`;

  const isOwner = user.id === organizer?.id;

  const date = new Date(createdAt);
  const formattedDate = format(date, "MM/dd/yy");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleTeam = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      if (joined) {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/teams/leave`,
          {
            teamId: id,
            userId: user.id,
          }
        );
        setJoined(false);
        toast.success("Team left");
        console.log(response.data);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/teams/join`,
          {
            teamId: id,
            userId: user.id,
          }
        );
        setJoined(true);
        toast.success("Team joined");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Didn't worked!");
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_BASE_URL}/teams/${id}`
      );

      toast.success("Team deleted");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className='flex flex-col p-6 border bg-white rounded-lg shadow-md'>
      <div className=' space-y-6'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-3'>
            <ProfilePicture bgColor={bgColor} name={name} />
            <p className='font-medium  capitalize'>{name}</p>
          </div>
          <div className='space-x-2 flex items-center'>
            <Badge variant={"active"}>{type}</Badge>
            <Popover open={isOpen} onOpenChange={toggle}>
              <PopoverTrigger>
                <Button variant={"ghost"} size={"icon"}>
                  <MoreHorizontal className='size-5 text-gray-500' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-44 p-2'>
                {/* {isOwner && (
                <HelpRequestDialog onUpload={handleUpdate} request={request}> */}
                <TeamForm
                  description={description}
                  id={id}
                  name={name}
                  type={type}
                >
                  <Button
                    className='flex items-center text-muted-foreground hover:text-muted-foreground  font-normal  justify-start w-full'
                    variant={"ghost"}
                  >
                    <Edit2 className='size-4 mr-2 ' />
                    <p>Edit Team</p>
                  </Button>
                </TeamForm>

                {/* </HelpRequestDialog>
              )} */}
                <Button
                  onClick={onCopy}
                  className='flex items-center text-muted-foreground hover:text-muted-foreground  font-normal justify-start w-full'
                  variant={"ghost"}
                >
                  {copied ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                  <p>Copy Link</p>
                </Button>
                {isOwner && (
                  <>
                    <ConfirmModal onConfirm={onDelete}>
                      <Button
                        className='flex items-center text-rose-500 hover:text-rose-500 font-normal justify-start w-full'
                        variant={"ghost"}
                      >
                        <Trash2 className='size-4 mr-2 ' />
                        <p>Delete Team</p>
                      </Button>
                    </ConfirmModal>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>{formattedDate}</p>
          <p className=' font-medium line-clamp-1'>{description}</p>
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>Hosted by</p>
          <CustomToolTips label={organizer.name}>
            <ProfilePicture size='sm' profileImage={organizer.profileImage} />
          </CustomToolTips>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {!isOwner && (
              <Button
                onClick={toggleTeam}
                className={cn(
                  `${bgColor} hover:${bgColor} hover:opacity-90`,
                  "rounded-full"
                )}
              >
                {joined ? "Leave" : "Join"}
              </Button>
            )}
            <Button className='rounded-full' variant={"secondary"} asChild>
              <Link to={`/team/${id}`}>More information</Link>
            </Button>
          </div>
          <Button variant={"ghost"}>
            <Share2 className='size-5 text-muted-foreground' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;

export function TeamCardSkeleton() {
  return (
    <Skeleton className='w-full flex flex-col p-6 border bg-white rounded-lg shadow-md'>
      <div className='w-full space-y-6'>
        <div className='flex justify-between'>
          <div className='w-full flex items-center space-x-3'>
            <ProfilePictureSkeleton />
            <Skeleton className='font-medium h-8 w-1/2 ' />
          </div>
          <Skeleton className='h-5 w-20' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-3 w-32' />
          <Skeleton className=' h-8 w-full' />
        </div>

        <div className='space-y-2'>
          <p className='text-xs font-light text-gray-400  '>Hosted by</p>
          <Skeleton className='h-5 w-5 rounded-full' />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='flex items-center py-2 px-4 w-auto rounded-full text-center text-sm font-medium'>
            Join
          </Skeleton>
          <Skeleton className='flex items-center py-2 px-4  w-auto rounded-full text-center text-sm font-medium'>
            More Information
          </Skeleton>
        </div>
      </div>
    </Skeleton>
  );
}
