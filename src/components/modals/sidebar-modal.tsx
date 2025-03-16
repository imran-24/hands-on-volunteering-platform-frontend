import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Menu from "@/layouts/sidebar/menu";
import { useEffect, useState } from "react";

const SidebarModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if(!isOpen) setIsOpen(true);
  },[isOpen])

  if(!isOpen) return;
  
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <Menu />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarModal;
