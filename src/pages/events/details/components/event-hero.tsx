import { CalendarDays, MapPlus, Milestone } from "lucide-react";
import CardBox from "./box";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { extractFilePath, gradients, randomSelect } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { Event } from "@/utils/type";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ImageUpload from "@/components/image-upload";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/auth-provider";

const EventHeroSection = ({ event }: { event: Event }) => {
  const { user } = useAuth();
  const isOwner = event.organizerId === user.id;
  const date = format(new Date(event.date), "EEEE, dd MMMM yyyy");
  const bgcolor = randomSelect(gradients);

  const [image, setImage] = useState(event.imageUrl);
  const [loading, setLoading] = useState(false);

  const path =
    extractFilePath(image) ||
    `/event-management/user/${event.organizerId}/events/${uuidv4()}/banner`;

  const uploadImage = async (url: string) => {
    setLoading(true);
    console.log(url);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/events/${event.id}`,
        { imageUrl: url }
      );

      console.log(response.data.imageUrl);
      setImage(response.data.imageUrl);

      toast.success("Event image updated");

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log(path);

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-3'>
      <div className='col-span-2 relative'>
        {image ? (
          <img
            src={image}
            alt=''
            className='w-full aspect-[12/6] rounded-xl object-center object-cover'
          />
        ) : (
          <div className={`w-full aspect-[12/6] rounded-xl ${bgcolor}`} />
        )}
        {isOwner && (
          <ImageUpload path={path} disabled={loading} onChange={uploadImage}>
            <Button className='absolute bottom-4 right-4' variant={"secondary"}>
              Change Image
            </Button>
          </ImageUpload>
        )}
      </div>
      <Card className='w-full border border-neutral-200/60  shadow-none'>
        <CardContent className='space-y-6'>
          <CardBox
            label='Created By'
            icon={Milestone}
            title={event.organizer.name}
          />
          <CardBox
            label='Date & Time'
            icon={CalendarDays}
            title={`${date} | ${event.startTime} - ${event.endTime} ${
              event.country ? `| ${event?.country} / ${event?.city}` : ""
            }`}
          />
          <CardBox
            label='Location'
            icon={MapPlus}
            title={event.isOnline ? "Online" : event.location}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventHeroSection;
