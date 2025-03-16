import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuLink from "./link";
import { routes } from "@/utils/constant";
import { useAuth } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";
axios.defaults.withCredentials = true;

const Menu = () => {
  const router = useNavigate();

  const params = useLocation();
  const { user, setToken, setUser } = useAuth();

  const handleSignout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/auth/logout`);
      setToken("");
      setUser(null);
      router("/auth/login");
      //   router("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to={"/"}>
        <img
          src='/src/assets/images/logo.svg'
          alt=''
          className='object-contain object-center shrink-0  size-8 bg-transparent'
        />
      </Link>
      <div className='my-6 flex flex-col space-y-2'>
        {routes.map((route, index: number) => (
          <MenuLink
            key={index}
            title={route.title}
            url={route.url}
            isActive={route.url === `${params.pathname}`}
            icon={route.icon}
          />
        ))}
      </div>
      <Button variant={"ghost"} size={"icon"} onClick={handleSignout}>
        <Avatar>
          <AvatarImage src={user.profileImage} />
        </Avatar>
      </Button>
    </div>
  );
};

export default Menu;
