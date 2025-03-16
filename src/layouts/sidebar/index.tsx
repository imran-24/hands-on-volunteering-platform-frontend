import React from "react";
import Menu from "./menu";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full'>
      <div className='lg:w-80 hidden lg:block bg-white fixed left-0 inset-y-0 h-full p-6'>
        <Menu />
      </div>
      <div className='lg:hidden absolute top-7 right-7 text-white z-50'>
        <Sheet >
          <SheetTrigger>
            <Button size={"icon"} variant={"secondary"}>
              <MenuIcon className='size-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <Menu />
          </SheetContent>
        </Sheet>
      </div>
      <main className='lg:pl-80   w-full h-full bg-[#f9f9f9] '>
        <div className='rounded-3xl h-full'>{children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
