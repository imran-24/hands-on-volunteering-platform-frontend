import Header from '@/components/header'
import TeamForm from './team-form'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const TeamHeader = () => {
  return (
    <div className='flex items-center justify-between'>
        <Header title='Join a Team' description='All available teams out there' />
        <div className='mr-20 mt-4.5 lg:m-0 '>
          <TeamForm>
            <Button className='rounded-full'>
              <Plus className='size-4' />
              Create One
            </Button>
          </TeamForm>
        </div>
      </div>
  )
}

export default TeamHeader