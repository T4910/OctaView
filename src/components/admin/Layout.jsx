import Navbar from '@/components/admin/navbar'
import Sidebar from "@/components/admin/sidebar"
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
      <>
        <Navbar />
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>
      </>
    );
}