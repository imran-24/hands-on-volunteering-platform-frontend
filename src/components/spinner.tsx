import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className='h-screen flex items-center justify-center w-screen'>
        <Loader2 className='size-10 animate-spin text-gray-400' />
    </div>
  );
};

export default Spinner;
