import { useState } from "react";
import { options } from "../../../utils/constant";
import Option from "./option";

import axios from "axios";
axios.defaults.withCredentials = true;

import EditForm from "./edit-form";
import Details from "./details";
import About from "./about";

export type OptionType = {
  id: number;
  label: string;
  value: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Options = ({ user }: { user: any }) => {
  const [selected, setSelected] = useState<OptionType>(options[0]);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const changeName = (name: string) => setName(name);
  const changeBio = (bio: string) => setBio(bio);

  const handleChange = (option: OptionType) => {
    setSelected(option);
  };


  console.log(user.profileImage)

  return (
    <div className='w-full space-y-4'>
      <About image={user.profileImage} name={name} bio={bio} email={user.email} />
      <div className='max-w-xl w-full  grid grid-cols-4 items-center space-x-1 p-1 rounded-lg bg-secondary  transition-all duration-200 ease-in-out'>
        {options.map((option) => (
          <Option
            option={option}
            key={option.id}
            selected={selected.value === option.value}
            onChange={handleChange}
          />
        ))}
      </div>
      {options[0].value === selected.value && <Details user={user} />}

      {options[1].value === selected.value && <EditForm user={user} changeName={changeName} changeBio={changeBio}  />}
    </div>
  );
};

export default Options;
