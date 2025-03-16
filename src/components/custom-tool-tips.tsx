

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface CustomToolTipsProps{
    children: React.ReactNode;
    label: string;
}  

const CustomToolTips = ({children, label}: CustomToolTipsProps) => {
  return (
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        {children}
    </TooltipTrigger>
    <TooltipContent >
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}

export default CustomToolTips