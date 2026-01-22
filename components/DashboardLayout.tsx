import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AICareerCoach } from "./AICareerCoach";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  Bell,
  Search as SearchIcon,
  Menu,
  X,
  GraduationCapIcon,
  Building2,
  UserSearch,
} from "lucide-react";
import SidebarLink from "./SidebarLink";

const DashboardLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-slate-50 flex font-sans overflow-x-hidden relative'>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-white flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-xl md:shadow-none`}
      >
        <div className='p-6 flex items-center justify-between border-b border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-brand-teal/20 rounded-lg flex items-center justify-center'>
              <GraduationCap className='w-6 h-6 text-brand-teal' />
            </div>
            <div>
              <div className='font-bold leading-none'>Admin</div>
              <div className='text-xs text-slate-400 uppercase tracking-wider'>
                Dashboard
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='md:hidden text-slate-400 hover:text-white'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <nav className='flex-1 p-4 space-y-2 mt-4 overflow-y-auto'>
          <SidebarLink
            to='/admin/overview'
            icon={LayoutDashboard}
            label='Overview'
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to='/admin/students'
            icon={GraduationCapIcon}
            label='Students'
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to='/admin/organizations'
            icon={Building2}
            label='Organizations'
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to='/admin/job_applications'
            icon={UserSearch}
            label='Job Applications'
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to='/admin/jobs'
            icon={Briefcase}
            label='Job Management'
            onClick={() => setIsSidebarOpen(false)}
          />
          <SidebarLink
            to='/admin/resources'
            icon={FileText}
            label='Resource Center'
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className='pt-4 mt-4 border-t border-white/10'>
            <SidebarLink
              to='/admin/settings'
              icon={Settings}
              label='Settings'
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </nav>

        <div className='p-4 border-t border-white/10'>
          <button
            onClick={onLogout}
            className='w-full flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-4 py-3 rounded-xl hover:bg-red-500/10 group'
          >
            <LogOut className='w-4 h-4 group-hover:text-red-400' />
            <span className='group-hover:text-red-400'>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className='flex-1 md:ml-64 flex flex-col min-h-screen w-full'>
        {/* Top Header */}
        <header className='h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20'>
          <div className='flex items-center gap-4 flex-1'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg'
            >
              <Menu className='w-6 h-6' />
            </button>

            <div className='flex-1 max-w-xl relative hidden md:block'>
              <SearchIcon className='absolute left-3 top-2.5 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Quick search...'
                className='w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-teal'
              />
            </div>
          </div>

          <div className='flex items-center gap-3 md:gap-4 pl-4'>
            <button className='p-2 text-slate-400 hover:text-brand-teal transition-colors relative'>
              <Bell className='w-5 h-5' />
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white'></span>
            </button>
            <div className='h-8 w-px bg-slate-200 mx-2 hidden md:block'></div>
            <div className='flex items-center gap-3'>
              <div className='text-right hidden sm:block'>
                <div className='text-sm font-bold text-brand-dark leading-tight'>
                  Admin Master
                </div>
                <div className='text-xs text-slate-500'>System Controller</div>
              </div>
              <div className='w-8 h-8 md:w-10 md:h-10 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm text-sm md:text-base'>
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className='p-4 md:p-8 flex-1 overflow-x-hidden relative'>
          <Outlet />
        </main>
      </div>

      {/* AI Assistant - Floating Button */}
      <AICareerCoach />
    </div>
  );
};

export default DashboardLayout;
