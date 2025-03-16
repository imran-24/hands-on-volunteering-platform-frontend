import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import ImageUpload from "./image-upload";
import { Skeleton } from "./ui/skeleton";
import { extractFilePath } from "@/utils/constant";
import { v4 as uuidv4 } from "uuid";

interface ProfilePictureProps {
  profileImage?: string;
  size?: "sm" | "default";
  name?: string;
  bgColor?: string;
  userId?: string;
}

const ProfilePicture = ({
  profileImage,
  size = "default",
  name,
  bgColor,
  userId,
}: ProfilePictureProps) => {
  const { pathname } = useLocation();
  const isProfile = pathname === "/profile";

  const [image, setImage] = useState(profileImage);
  const [loading, setLoading] = useState(false);

  const path = userId
    ? extractFilePath(image) ||
      `/event-management/user/${userId}/profile/${uuidv4()}`
    : "";

  console.log(path);

  const uploadProfile = async (url: string) => {
    setLoading(true);
    console.log(url);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/users/${userId}`,
        { profileImage: url }
      );

      setImage(response.data.profileImage);

      toast.success("Profile picture updated");

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Avatar
      className={cn(
        "group relative transition-all duration-300 ease-in-out ",
        size === "sm" ? "size-6" : "size-12 ring-4 ring-gray-200"
      )}
    >
      <AvatarImage src={image} />
      {isProfile && (
        <div
          className='absolute inset-0 flex items-center justify-center rounded-md 
            bg-accent/30 opacity-0 backdrop-blur-sm transition-all duration-300 
            ease-in-out group-hover:opacity-100'
        >
          <ImageUpload path={path} disabled={loading} onChange={uploadProfile}>
            <Button
              variant='ghost'
              size='icon'
              className='size-8 border rounded-full  bg-white/90 transition-all duration-300 
              hover:scale-110 hover:bg-white'
            >
              <Plus className='size-4' />
            </Button>
          </ImageUpload>
        </div>
      )}
      <AvatarFallback className={`${bgColor} text-white text-lg font-medium`}>
        {name?.[0] ?? "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePicture;

export function ProfilePictureSkeleton() {
  return <Skeleton className='h-12 w-12 rounded-full' />;
}
