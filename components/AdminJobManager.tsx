import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, FileSpreadsheet, Download, Filter, Building2, MapPin, Edit, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Job } from '../types';

interface AdminJobManagerProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const ITEMS_PER_PAGE = 7;

export const AdminJobManager: React.FC<AdminJobManagerProps> = ({ jobs, setJobs }) => {
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // New Job Form State
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '', company: '', location: '', type: 'On-site', category: 'Tech', description: ''
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, typeFilter]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(j => j.id !== id));
      // Adjust page if deleting the last item on the last page
      if (currentJobs.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handleEdit = (job: Job) => {
    setNewJob(job);
    setEditingId(job.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing job
      setJobs(jobs.map(j => j.id === editingId ? { ...j, ...newJob } as Job : j));
      setEditingId(null);
    } else {
      // Add new job
      const job: Job = {
        id: Date.now().toString(),
        postedDate: 'Just now',
        ...newJob as Job
      };
      setJobs([job, ...jobs]);
    }
    
    setIsAdding(false);
    setNewJob({ title: '', company: '', location: '', type: 'On-site', category: 'Tech', description: '' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewJob({ title: '', company: '', location: '', type: 'On-site', category: 'Tech', description: '' });
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const text = event.target?.result as string;
        // Simple CSV parser: assumes header row, comma separated
        const lines = text.split('\n');
        const newJobs: Job[] = [];
        
        // Start from 1 to skip header
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',');
          if (row.length >= 5) {
            newJobs.push({
              id: Date.now().toString() + i,
              title: row[0].trim(),
              company: row[1].trim(),
              location: row[2].trim(),
              type: (row[3].trim() as 'Remote' | 'On-site' | 'Hybrid') || 'On-site',
              category: row[4].trim(),
              description: row[5]?.trim() || 'Imported via CSV',
              postedDate: 'Imported'
            });
          }
        }

        // Simulate a small delay for better UX
        setTimeout(() => {
          setJobs([...newJobs, ...jobs]);
          setIsUploading(false);
          alert(`Successfully imported ${newJobs.length} jobs.`);
        }, 800);
      };
      
      reader.onerror = () => {
        setIsUploading(false);
        alert('Error reading file');
      };

      reader.readAsText(file);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filter.toLowerCase()) || 
                          job.company.toLowerCase().includes(filter.toLowerCase());
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6 animate-fade-in w-full max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Job Management</h2>
          <p className="text-slate-500">Oversee active listings and applications.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <label className={`flex-1 md:flex-none justify-center cursor-pointer bg-white border border-slate-200 hover:border-brand-teal text-slate-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
            {isUploading ? (
              <Loader2 className="w-4 h-4 text-brand-teal animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
            )}
            <span className="text-sm">{isUploading ? 'Importing...' : 'Import CSV'}</span>
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              onChange={handleCsvUpload} 
              disabled={isUploading}
            />
          </label>
          <button 
            onClick={() => {
              if (isAdding && !editingId) {
                setIsAdding(false);
              } else {
                setEditingId(null);
                setNewJob({ title: '', company: '', location: '', type: 'On-site', category: 'Tech', description: '' });
                setIsAdding(true);
              }
            }}
            className="flex-1 md:flex-none justify-center bg-brand-teal hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Opportunity</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-brand-teal/20 shadow-lg mb-6 animate-fade-in-up">
          <h3 className="font-bold text-brand-dark mb-4">{editingId ? 'Edit Opportunity' : 'Add New Opportunity'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Job Title" className="p-2 border rounded" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            <input required placeholder="Company" className="p-2 border rounded" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} />
            <input required placeholder="Location" className="p-2 border rounded" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <select className="p-2 border rounded" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value as any})}>
                <option>On-site</option><option>Remote</option><option>Hybrid</option>
              </select>
              <select className="p-2 border rounded" value={newJob.category} onChange={e => setNewJob({...newJob, category: e.target.value})}>
                <option>Tech</option><option>Marketing</option><option>Finance</option><option>Design</option><option>Admin</option>
              </select>
            </div>
            <input required placeholder="Description" className="p-2 border rounded md:col-span-2" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} />
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={handleCancel} className="px-4 py-2 text-slate-500">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded font-bold">{editingId ? 'Update Job' : 'Save Job'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title or company..." 
            className="w-full pl-10 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-teal"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
          <Filter className="w-4 h-4 text-slate-400" />
          <select 
            className="bg-transparent text-sm font-medium text-slate-600 outline-none w-full md:w-auto"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Role / Company</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Location</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Type</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Posted</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentJobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-brand-dark">{job.title}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {job.company}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      job.type === 'Remote' ? 'bg-purple-100 text-purple-700' :
                      job.type === 'Hybrid' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{job.postedDate}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(job)}
                        className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No jobs found matching your filters.
          </div>
        ) : (
          /* Pagination Footer */
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredJobs.length)}</span> of <span className="font-medium">{filteredJobs.length}</span> opportunities
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-brand-teal text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};