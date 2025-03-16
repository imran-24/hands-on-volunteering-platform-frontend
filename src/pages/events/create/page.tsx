import Header from "@/components/ui/header"
import { EventForm } from "./components/form"



const CreateEventPage = () => {
  return (
    <div className="space-y-8 px-4">
        <Header title="Event Details" description="Add details ot create new event" />
        <EventForm />
    </div>
  )
}

export default CreateEventPage