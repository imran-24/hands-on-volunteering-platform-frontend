import { LucideIcon } from "lucide-react";

const CardBox = ({
  icon: Icon,
  title,
  label
}: {
  icon: LucideIcon;
  label: string;
  title: string;
}) => {
  return (
    <div className='flex  items-start  space-x-4'>
      <Icon className='size-5 mt-1 text-gray-400/80' />
      <div className='font-medium text-[13px]'>
        <p className="text-gray-400/80">{label}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default CardBox;
