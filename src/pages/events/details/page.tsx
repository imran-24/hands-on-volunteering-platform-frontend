import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventHeader from "./components/event-header";
import EventHeroSection from "./components/event-hero";
import EventDetails from "./components/event-details";
import { Event } from "@/utils/type";

const EventDetailsPage = () => {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  console.log(loading);
  useEffect(() => {
    // if(!params.id) return;

    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_BASE_URL}/events/${params.id}`
        );
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        setEvent(null);
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchEvent();
  }, [params]);

  if (!event) return;

  return (
    <div className='relative'>
      <EventHeader
        eventDate={event.date}
        location={event.location}
        title={event.title}
      />
      <div className=' mt-6 space-y-6'>
        <EventHeroSection event={event} />
        <EventDetails event={event} />
      </div>
    </div>
  );
};

export default EventDetailsPage;
