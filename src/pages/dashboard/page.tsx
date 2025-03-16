import LatestEvent from "./components/latest-event";
import MyEvents from "./components/my-events";
import TodaysEvent from "./components/todays-events";
import CreateShortcut from "./components/shortcut";
import Header from "@/components/header";

const DashboardPage = () => {
  return (
    <div className=''>
      <Header title="Dashboard" />
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 mt-5'>
        <CreateShortcut />
        <div className="flex flex-col col-span-5 space-y-4">
          <TodaysEvent />
          <MyEvents />
        </div>    
        <LatestEvent />

      </div>
    </div>
  );
};

export default DashboardPage;
