import { Input } from '@/components/ui/input'
import React from 'react'
import { ModeToggle } from './theme-toggler'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const InformativeItems = () => {
  return (
    <div className='flex items-center space-x-4'>
      <div className='bg-black/10 backdrop-blur-md rounded-md flex items-center'>
        <Input placeholder='Search' className='outline-none focus-visible:ring-0 rounded-full border-none ' />
      </div>
        <ModeToggle />
        <Avatar className='rounded-full w-[35.5px] h-[35.5px]' >
          <AvatarImage src={'https://avatars.githubusercontent.com/u/12345678?v=4'} alt='User Avatar' />
          <AvatarFallback className='bg-black/20 backdrop-blur-md rounded-full' />
        </Avatar>
    </div>
  )
}

export default InformativeItems