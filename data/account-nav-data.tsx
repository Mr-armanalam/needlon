
import { Bell, Heart, MapPinHouse, PackageOpenIcon, ReceiptIndianRupee, ShoppingBagIcon, User } from 'lucide-react'


export const accountNavData = [
  {
    icon: <User size={15} />,
    name: 'Your Profile',
    description: 'Do you want to update your profile ?'
  },
  {
    icon: <MapPinHouse size={15} />,
    name: 'Manage Address',
    description: 'Add or update your address'
  },
  {
    icon: <Heart size={15} />,
    name: 'Your Wishlist',
    description: 'Some items, which you love'
  },
  {
    icon: <ShoppingBagIcon size={15} />,
    name: 'Your Cart',
    description: 'Some items, which you want to order'
  },
  {
    icon: <PackageOpenIcon size={15} />,
    name: 'Your Order',
    description: 'Track & seen you order status'
  },
  {
    icon: <ReceiptIndianRupee size={15} />,
    name: 'Your Coupen',
    description: 'Earn & redeem your rewards'
  },
  {
    icon: <Bell size={15}/>,
    name: 'All Notification',
    description: 'Something is needed to inform you'
  },

]