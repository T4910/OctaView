import Sidebar from "@/components/admin/sidebar"
import { Outlet } from "react-router-dom"

export default function Index() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-grow pt-0 p-8 md:pl-4 md:pt-8">
        <Outlet />
      </div>
    </div>
  )
}