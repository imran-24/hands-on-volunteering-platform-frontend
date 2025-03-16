import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom'

type MenuLinkProps = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive: boolean;
}

const MenuLink = ({title, url, icon: Icon, isActive}: MenuLinkProps) => {
  return (
    <Link to={url} className={` flex items-center w-full p-2.5   text-sm ${isActive ? "bg-white shadow border  rounded-xl font-medium" : ""} `}>
        {Icon && <Icon className="size-4  mr-4 font-light" />}
        <p className='capitalize'>{title}</p>
    </Link>
  )
}

export default MenuLink