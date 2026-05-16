import React from 'react'
import { GoHome } from "react-icons/go";
import { PiSquaresFour } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import Link from 'next/link';

const mobileNavData = [
  {
    label: 'Home',
    icon: GoHome,
    link: '/'
  },
  {
    label: 'Categories',
    icon: PiSquaresFour,
    link: '/m-categories'
  },
  {
    label: 'Account',
    icon: FaRegUser,
    link: '/m-account'
  },
  {
    label: 'Cart',
    icon: BsCart2,
    link: '/cart'
  },
]


const MobileNavbarSection = () => {
  return (
    <div className='xl:hidden sticky bottom-0 right-0 mt-auto px-8 py-3 h-fit flex items-center justify-between bg-white z-50 border-t left-0'>
      {mobileNavData.map((item, index) => (
        <Link href={`${item.link}`} key={index} className='flex items-center text-stone-600 flex-col'>
          <item.icon size={item.label === 'Account' ? 28 : 30 } />
          <p className='text-xs'>{item.label}</p>
        </Link>
        ))}
    </div>
  )
}

export default MobileNavbarSection