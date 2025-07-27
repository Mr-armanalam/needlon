import NavbarSection from '@/modules/shared/navbar/navbar-section'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      <NavbarSection />
      {children}
    </>
  )
}

export default layout