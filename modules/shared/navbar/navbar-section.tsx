import React from 'react'
import NavigationItems from './components/navigation-items'
import InformativeItems from './components/informative-items'

const NavbarSection = () => {
  return (
    <nav className='flex text-sm justify-between items-center px-8 py-3 bg-transparent text-black/80 font-medium'>
      <NavigationItems />
      <InformativeItems />
    </nav>
  )
}

export default NavbarSection