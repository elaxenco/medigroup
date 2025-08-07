'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'

export default function AppMedigroup({ children }: { children: React.ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar visible={sidebarVisible} />
        <main className="flex-grow-1 p-3">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
