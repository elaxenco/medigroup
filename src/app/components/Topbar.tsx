'use client'
import Image from 'next/image' 

interface Props {
  toggleSidebar: () => void
}

export default function Topbar({ toggleSidebar }: Props) {
  return (
    <nav className="navbar navbar-light bg-light px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <Image src="/MPA-logo172x106.jpg" alt="Logo" width={240} height={80} />
        <button className="btn btn-outline-primary btn-sm" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className="text-end">
        <div className="fw-bold">AXEL CORTEZ RUIZ</div>
        <div className="text-muted">{new Date().toISOString().split('T')[0]}</div>
      </div>
    </nav>
  )
}
