import OrderView from '@/modules/orders/view/order-view'
import React, { Suspense } from 'react'

const page = () => {
  
  return (
   <Suspense fallback={<div>loading...</div>}>
     <OrderView />
   </Suspense>
  )
}

export default page