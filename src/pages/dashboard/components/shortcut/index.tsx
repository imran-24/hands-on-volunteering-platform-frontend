import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { useState } from "react";
import { useAuth } from "@/context/auth-provider";
import ProfilePicture from "@/components/profile-picture";
import { shortcutCreateOptions } from "@/utils/constant";
import Option from "@/pages/profile/components/option";
import ShortcutEventForm from "./form";

const CreateShortcut = () => {
  const { user } = useAuth();

  const [selected, setSelected] = useState(shortcutCreateOptions[0]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = async (date: Date) => {
    setSelectedDate(date);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (option: any) => {
    setSelected(option);
  };

  return (
    <div className='col-span-7 grid grid-cols-2 items-start bg-white'>
      <div className='bg-white border-r p-2 space-y-2'>
        <div className='flex items-center space-x-2'>
          <ProfilePicture size='sm' profileImage={user.profileImage} />
          <p className=''>{user.name}</p>
        </div>
        <div className='bg-neutral-100 p-1 rounded-lg'>
          {shortcutCreateOptions.map((option) => (
            <Option
              option={option}
              key={option.id}
              selected={selected.value === option.value}
              onChange={handleChange}
            />
          ))}
        </div>

        <div>
          <ShortcutEventForm
            handleChange={handleChange}
            date={selectedDate}
            event={shortcutCreateOptions[0].value === selected.value}
            meet={shortcutCreateOptions[1].value === selected.value}
          />
        </div>
      </div>
      <div>
        <Calendar
          date={selectedDate || new Date()}
          onChange={handleDateChange}
          className='h-full w-full'
          minDate={new Date()}
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          color='#4F46E5'
        />
      </div>
    </div>
  );
};

export default CreateShortcut;
