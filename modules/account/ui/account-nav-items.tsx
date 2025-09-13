import { accountNavData } from '@/data/account-nav-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AccountNavItems = () => {
  const pathname = usePathname();
  return (
    <div className='bg-white box-border rounded-xs flex flex-col mt-3  shadow-md shadow-stone-200'>
      {accountNavData.map((item, i) => (
        <Link href={item.url ?? '#'} className={cn(pathname.includes(item.label) && 'bg-stone-200',"py-6 items-center hover:bg-stone-200 border border-b-stone-200 cursor-pointer px-8 flex gap-4 ")} key={i}>
          <div className='bg-zinc-100 p-3 rounded-md'>
            {item.icon}
          </div>
          <div className="">
            <p className='text-stone-900 text-sm font-semibold'>{item.name}</p>
            <p className='text-stone-600 text-xs'>{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AccountNavItems