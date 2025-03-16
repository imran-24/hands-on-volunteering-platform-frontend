import { format } from "date-fns";
import { CirclePlus } from "lucide-react";

interface EventHeaderProps{
  eventDate: Date;
  title: string;
  location: string
}

const EventHeader = ({ eventDate, location, title }: EventHeaderProps) => {
  // const date = new Date(event.date);
  const date = format(new Date(eventDate), "dd");
  const month = format(new Date(eventDate), "MMMM");

  return (
    <div className='flex items-center space-x-4'>
      <div className='size-16 rounded-xl shadow'>
        <div className='bg-rose-500 rounded-t-xl'>
          <p className='text-white text-sm py-1 text-center'>{month}</p>
        </div>
        <div>
          <p className='text-xl font-semibold text-center'>{date}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center  text-rose-500">
            <CirclePlus className="size-4 mr-2" />
            <p className="font-medium">{location}</p>
        </div>
        <div>
            <p className="text-xl font-bold">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
