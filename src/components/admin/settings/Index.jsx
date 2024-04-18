import Sidebar from "@/components/admin/sidebar"
import { Outlet } from "react-router-dom"

export default function Index() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 pl-4">
        <Outlet />
      </div>
    </div>
  )
}