import { Mail } from "lucide-react";
import ProfilePicture from "../../../components/profile-picture";
import { useAuth } from "@/context/auth-provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const About = ({
  name,
  bio,
  email,
  image
}: {
  name: string;
  bio: string;
  email: string;
  image: string
}) => {
  const {user} = useAuth();

  return (
    <div className='flex flex-col space-y-2'>
      <ProfilePicture profileImage={image} userId={user.id}   />
      <div>
        <p className='uppercase text-xl font-semibold '>{name}</p>
        <div className='flex items-center space-x-2'>
          <Mail className='size-3 text-gray-500' />
          <p className='text-xs mb-0.5  text-gray-500'>{email}</p>
        </div>
      </div>
      <p className='text-sm'>{bio}</p>
    </div>
  );
};

export default About;
