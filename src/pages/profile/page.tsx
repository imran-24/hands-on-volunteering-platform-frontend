import { useAuth } from "@/context/auth-provider"
import Cover from "./components/cover"
import Options from "./components/options";

const ProfilePage = () => {
  const {user} = useAuth();

  return (
      <div className="flex-1 ">
        
        <Cover coverImage={user.coverImage} userId={user.id}  />
        
        <div className='w-full p-4 lg:p-6  space-y-4 '>
          
           <Options user={user}  />
          {/*<Events /> */}
        </div>
      </div>
  )
}

export default ProfilePage