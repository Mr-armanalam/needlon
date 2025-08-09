import React from 'react'
import NavigationItems from './components/navigation-items'
import SearchAndUser from './components/search-and-user'
import CartAndWishList from './components/cart-and-wishlist'

const NavbarSection = () => {
  return (
    <nav className='flex text-sm justify-between items-center px-8 py-3 bg-transparent text-black/90 dark:text-white font-medium'>
      <NavigationItems />
      <CartAndWishList />
      <SearchAndUser />
    </nav>
  )
}

export default NavbarSection