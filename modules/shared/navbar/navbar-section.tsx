import React from 'react'
import NavigationItems from './components/navigation-items'
import InformativeItems from './components/informative-items'
import CartAndUser from './components/cart-and-user'

const NavbarSection = () => {
  return (
    <nav className='flex text-sm justify-between items-center px-8 py-3 bg-transparent text-black/80 dark:text-white font-medium'>
      <NavigationItems />
      <CartAndUser />
      <InformativeItems />
    </nav>
  )
}

export default NavbarSection