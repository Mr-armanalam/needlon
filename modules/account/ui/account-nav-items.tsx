import { accountNavData } from '@/data/account-nav-data'
import React from 'react'

const AccountNavItems = () => {
  return (
    <div className='bg-white box-border rounded-xs flex flex-col mt-3  shadow-md shadow-stone-200'>
      {accountNavData.map((item, i) => (
        <div className="py-6 items-center hover:bg-stone-200 border border-b-stone-200 cursor-pointer px-8 flex gap-4 " key={i}>
          <div className='bg-zinc-100 p-3 rounded-md'>
            {item.icon}
          </div>
          <div className="">
            <p className='text-stone-900 text-sm font-semibold'>{item.name}</p>
            <p className='text-stone-600 text-xs'>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AccountNavItems