import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Building2, ArrowRight, CalendarDays } from 'lucide-react';
import { Job } from '../types';

interface JobSliderProps {
  jobs: Job[];
}

export const JobSlider: React.FC<JobSliderProps> = ({ jobs }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">No opportunities found in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Scroll Buttons (Desktop) */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg border border-slate-100 text-brand-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-slate-50"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg border border-slate-100 text-brand-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:block hover:bg-slate-50"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-1 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0"
        style={{ scrollBehavior: 'smooth' }}
      >
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="min-w-[300px] md:min-w-[340px] bg-white rounded-xl shadow-md border border-slate-100 snap-center hover:shadow-xl hover:border-brand-teal/30 transition-all duration-300 flex flex-col relative overflow-hidden group/card"
          >
            {/* Top accent line */}
            <div className={`h-1.5 w-full ${
              job.type === 'Remote' ? 'bg-purple-500' : 
              job.location.includes('Ibadan') ? 'bg-brand-teal' : 'bg-brand-accent'
            }`} />
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-brand-dark" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                  {job.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover/card:text-brand-teal transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{job.company}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-brand-teal" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays className="w-4 h-4 text-brand-accent" />
                  <span className="text-xs">{job.postedDate}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                   job.type === 'Remote' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                }`}>
                  {job.type}
                </span>
                <button className="text-brand-dark font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Apply <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};