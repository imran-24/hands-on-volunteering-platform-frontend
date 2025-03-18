import billboard from "../../../../assets/images/billboard.jpg";

const eventsList = [
  {
    id: 1,
    image: "/images/event1.jpg",
    title: "Summer Music Festival",
    description: "A weekend of live music performances",
    location: "Central Park, New York",
  },
  {
    id: 2,
    image: "/images/event2.jpg",
    title: "Tech Conference 2024",
    description: "Latest trends in technology",
    location: "Convention Center, San Francisco",
  },
  {
    id: 3,
    image: "/images/event3.jpg",
    title: "Food & Wine Expo",
    description: "Culinary delights from around the world",
    location: "Exhibition Hall, Chicago",
  },
];

const Events = () => {
  return (
    <div className='  bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
        {eventsList.map((event) => (
          <div key={event.id} className='rounded-t-xl'>
            <div className='shadow rounded-xl'>
              <img
                src={billboard}
                alt=''
                className='h-28 object-cover shrink-0 w-full rounded-t-xl'
              />
              <div className='space-y-2 p-4'>
                <div className='flex items-center space-x-2'>
                  <p className='text-sm text-violet-500'>{event.title}</p>
                  <p className='text-[8px] text-gray-500'>{event.location}</p>
                </div>
                <p className='text-xs text-gray-500'>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
