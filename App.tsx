import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, FileText, Settings, LogOut, 
  GraduationCap, Building2, User 
} from 'lucide-react';
import { AdminLogin } from './components/AdminLogin';
import { AdminJobManager } from './components/AdminJobManager';
import { AdminResourceManager } from './components/AdminResourceManager';
import { PlacementsChart, DiversityChart } from './components/ImpactCharts';
import { Job, Article } from './types';

// Initial Mock Data
const MOCK_JOBS: Job[] = [
  { id: '101', title: 'Campus Ambassador', company: 'UI Tech Hub', location: 'Ibadan, Nigeria', type: 'On-site', category: 'Marketing', postedDate: '1 day ago', description: 'Represent our brand...' },
  { id: '102', title: 'React.js Intern', company: 'Bodija Software', location: 'Ibadan, Nigeria', type: 'On-site', category: 'Tech', postedDate: '2 days ago', description: 'Frontend development...' },
  { id: '201', title: 'Summer Analyst', company: 'Goldman Sachs', location: 'London, UK', type: 'On-site', category: 'Finance', postedDate: '3 days ago', description: 'Global markets...' },
  { id: '301', title: 'Content Writer', company: 'BuzzMedia', location: 'Remote', type: 'Remote', category: 'Marketing', postedDate: 'Just now', description: 'Blog writing...' },
];

const MOCK_ARTICLES: Article[] = [
  { id: '1', title: 'How to Ace Your First Internship Interview', category: 'Career Advice', author: 'Sarah Jenkins', date: 'Oct 12, 2024', readTime: '5 min', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', summary: 'Tips for students.', content: '' },
  { id: '2', title: 'Remote Work Guide', category: 'Trends', author: 'David Lee', date: 'Sep 28, 2024', readTime: '4 min', imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=800', summary: 'Navigating remote.', content: '' },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'jobs' | 'resources'>('overview');
  
  // Global Data State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const SidebarItem = ({ view, icon: Icon, label }: { view: 'overview' | 'jobs' | 'resources', icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        currentView === view 
          ? 'bg-brand-teal text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-brand-teal/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-brand-teal" />
          </div>
          <div>
            <div className="font-bold leading-none">Admin</div>
            <div className="text-xs text-slate-400">Portal</div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem view="overview" icon={LayoutDashboard} label="Overview" />
          <SidebarItem view="jobs" icon={Briefcase} label="Job Management" />
          <SidebarItem view="resources" icon={FileText} label="Resource Center" />
          <div className="pt-4 mt-4 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-medium">
              <Settings className="w-5 h-5" /> Settings
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm px-4 py-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Top Bar */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark">
              {currentView === 'overview' && 'Dashboard Overview'}
              {currentView === 'jobs' && 'Job Listings'}
              {currentView === 'resources' && 'Content Management'}
            </h1>
            <p className="text-sm text-slate-500">Welcome back, Administrator.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <div className="w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-brand-dark" />
                </div>
                <span className="text-sm font-bold text-brand-dark">Admin User</span>
             </div>
          </div>
        </header>

        {/* Views */}
        {currentView === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium mb-1">Total Jobs</div>
                <div className="text-3xl font-bold text-brand-dark">{jobs.length}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium mb-1">Applications</div>
                <div className="text-3xl font-bold text-brand-dark">1,248</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium mb-1">Articles</div>
                <div className="text-3xl font-bold text-brand-dark">{articles.length}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-slate-500 text-sm font-medium mb-1">Users</div>
                <div className="text-3xl font-bold text-brand-dark">5.4k</div>
              </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-2 gap-8">
              <PlacementsChart />
              <DiversityChart />
            </div>
          </div>
        )}

        {currentView === 'jobs' && (
          <AdminJobManager jobs={jobs} setJobs={setJobs} />
        )}

        {currentView === 'resources' && (
          <AdminResourceManager articles={articles} setArticles={setArticles} />
        )}
      </main>
    </div>
  );
}

export default App;