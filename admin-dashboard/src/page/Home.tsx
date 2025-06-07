import Sidebar from '@/components/SideBar';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet /> 
      </div>
    </div>
  );
}
