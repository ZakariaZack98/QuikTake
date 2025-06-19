import React from 'react'
import Sidebar from './Common/Sidebar'
import { Outlet } from 'react-router-dom'

const CommonLayout = () => {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-1/12 h-full'>
        <Sidebar/>
      </div>
      <Outlet/>
    </div>
  )
}

export default CommonLayout
