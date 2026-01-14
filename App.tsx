import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

import { AdminLogin } from './components/AdminLogin';
import { AdminJobManager } from './components/AdminJobManager';
import { AdminResourceManager } from './components/AdminResourceManager';
import { PlacementsChart, DiversityChart } from './components/ImpactCharts';
import { Job, Article } from './types';

// Initial Mock Data
const INITIAL_JOBS: Job[] = [
  { id: '101', title: 'Campus Ambassador', company: 'UI Tech Hub', location: 'Ibadan, Nigeria', type: 'On-site', category: 'Marketing', postedDate: '1 day ago', description: 'Represent our brand on campus and drive engagement.' },
  { id: '102', title: 'React.js Intern', company: 'Bodija Software', location: 'Ibadan, Nigeria', type: 'On-site', category: 'Tech', postedDate: '2 days ago', description: 'Assist in building modern web applications using React.' },
  { id: '201', title: 'Summer Analyst', company: 'Goldman Sachs', location: 'London, UK', type: 'On-site', category: 'Finance', postedDate: '3 days ago', description: 'Join the global markets team for an intensive summer program.' },
  { id: '301', title: 'Content Writer', company: 'BuzzMedia', location: 'Remote', type: 'Remote', category: 'Marketing', postedDate: 'Just now', description: 'Create compelling content for our diverse client base.' },
];

const INITIAL_ARTICLES: Article[] = [
  { id: '1', title: 'How to Ace Your First Internship Interview', category: 'Career Advice', author: 'Sarah Jenkins', date: 'Oct 12, 2024', readTime: '5 min', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', summary: 'Tips for students on preparing for and succeeding in interviews.', content: '<p>Standard interview prep guide...</p>' },
  { id: '2', title: 'Remote Work Guide', category: 'Trends', author: 'David Lee', date: 'Sep 28, 2024', readTime: '4 min', imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800', summary: 'Navigating the remote work landscape as a new professional.', content: '<p>How to setup your home office...</p>' },
];

// Sidebar Item Component
const SidebarLink: React.FC<{ 
  to: string, 
  icon: any, 
  label: string, 
  currentPath: string, 
  onNavigate: (path: string) => void,
  onClick?: () => void
}> = ({ to, icon: Icon, label, currentPath, onNavigate, onClick }) => {
  const isActive = currentPath === to;

  return (
    <button
      onClick={() => {
        onNavigate(to);
        if (onClick) onClick();
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        isActive 
          ? 'bg-brand-teal text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
};

// Layout Component
const DashboardLayout: React.FC<{ 
  children: React.ReactNode, 
  onLogout: () => void,
  currentPath: string,
  onNavigate: (path: string) => void
}> = ({ children, onLogout, currentPath, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Persistent Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-dark text-white flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-xl md:shadow-none`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-teal/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-brand-teal" />
            </div>
            <div>
              <div className="font-bold leading-none">Admin</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Dashboard</div>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          <SidebarLink to="/admin/overview" icon={LayoutDashboard} label="Overview" currentPath={currentPath} onNavigate={onNavigate} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/admin/jobs" icon={Briefcase} label="Job Management" currentPath={currentPath} onNavigate={onNavigate} onClick={() => setIsSidebarOpen(false)} />
          <SidebarLink to="/admin/resources" icon={FileText} label="Resource Center" currentPath={currentPath} onNavigate={onNavigate} onClick={() => setIsSidebarOpen(false)} />
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <SidebarLink to="/admin/settings" icon={Settings} label="Settings" currentPath={currentPath} onNavigate={onNavigate} onClick={() => setIsSidebarOpen(false)} />
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-4 py-3 rounded-xl hover:bg-red-500/10 group"
          >
            <LogOut className="w-4 h-4 group-hover:text-red-400" /> 
            <span className="group-hover:text-red-400">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 max-w-xl relative hidden md:block">
              <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-brand-teal"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 pl-4">
            <button className="p-2 text-slate-400 hover:text-brand-teal transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-brand-dark leading-tight">Admin Master</div>
                <div className="text-xs text-slate-500">System Controller</div>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-teal rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm text-sm md:text-base">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

// Main App Component with Manual Routing
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [currentPath, setCurrentPath] = useState<string>(() => {
     const hash = window.location.hash.replace('#', '');
     return hash || (isAuthenticated ? '/admin/overview' : '/login');
  });

  useEffect(() => {
    const onHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) setCurrentPath(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_auth', 'true');
    navigate('/admin/overview');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    navigate('/login');
  };
  
  // Auth Guard
  useEffect(() => {
    if (!isAuthenticated && currentPath !== '/login') {
        navigate('/login');
    } else if (isAuthenticated && (currentPath === '/login' || currentPath === '/' || currentPath === '')) {
        navigate('/admin/overview');
    }
  }, [isAuthenticated, currentPath]);

  // Route Rendering
  if (!isAuthenticated) {
     return <AdminLogin onLogin={handleLogin} />;
  }

  let content;
  switch (currentPath) {
    case '/admin/overview':
      content = (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'Total Opportunities', value: jobs.length, trend: '+12%', color: 'border-brand-teal' },
                { label: 'Resource Articles', value: articles.length, trend: '+2', color: 'border-brand-accent' },
                { label: 'Active Applications', value: '1,248', trend: '+18%', color: 'border-blue-500' },
                { label: 'Verified Students', value: '5,431', trend: '+24%', color: 'border-purple-500' },
            ].map((stat, i) => (
                <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color} hover:shadow-md transition-shadow`}>
                <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">{stat.label}</div>
                <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-brand-dark">{stat.value}</span>
                    <span className="text-xs font-bold text-green-600 pb-1">{stat.trend}</span>
                </div>
                </div>
            ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
            <PlacementsChart />
            <DiversityChart />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-brand-dark mb-4">Recent System Activity</h3>
            <div className="space-y-4">
                {[
                'Internship "React.js Intern" was posted by Bodija Software.',
                'New resource article "Interview Tips" published by Sarah Jenkins.',
                'CSV bulk upload processed: 15 new listings added.',
                'Admin login detected from new IP address: 192.168.1.1'
                ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                    {activity}
                </div>
                ))}
            </div>
            </div>
        </div>
      );
      break;
    case '/admin/jobs':
      content = <AdminJobManager jobs={jobs} setJobs={setJobs} />;
      break;
    case '/admin/resources':
      content = <AdminResourceManager articles={articles} setArticles={setArticles} />;
      break;
    case '/admin/settings':
      content = (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Portal Settings</h2>
            <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Primary Organization Name</label>
                <input type="text" defaultValue="Find Me An Internship" className="w-full p-3 bg-slate-50 border rounded-lg" />
            </div>
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Support Email</label>
                <input type="email" defaultValue="support@findmeaninternship.org" className="w-full p-3 bg-slate-50 border rounded-lg" />
            </div>
            <div className="pt-6 border-t border-slate-100">
                <button className="bg-brand-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-teal transition-colors">
                Save Changes
                </button>
            </div>
            </div>
        </div>
      );
      break;
    default:
        // Fallback or 404
        content = <div>Page not found</div>;
  }

  return (
    <DashboardLayout onLogout={handleLogout} currentPath={currentPath} onNavigate={navigate}>
      {content}
    </DashboardLayout>
  );
};

export default App;