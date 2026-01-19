import { DiversityChart, PlacementsChart } from "@/components/ImpactCharts";
import { Article, Job } from "@/types";
import React from "react";

const OverViewPage = () => {
  const jobsCount = 10;
  const articlesCount = 20;

  return (
    <div className='space-y-8 animate-fade-in'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[
          {
            label: "Total Opportunities",
            value: jobsCount,
            trend: "+12%",
            color: "border-brand-teal",
          },
          {
            label: "Resource Articles",
            value: articlesCount,
            trend: "+2",
            color: "border-brand-accent",
          },
          {
            label: "Active Applications",
            value: "1,248",
            trend: "+18%",
            color: "border-blue-500",
          },
          {
            label: "Verified Students",
            value: "5,431",
            trend: "+24%",
            color: "border-purple-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color} hover:shadow-md transition-shadow`}
          >
            <div className='text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider'>
              {stat.label}
            </div>
            <div className='flex items-end gap-3'>
              <span className='text-3xl font-bold text-brand-dark'>
                {stat.value}
              </span>
              <span className='text-xs font-bold text-green-600 pb-1'>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='grid lg:grid-cols-2 gap-8'>
        <PlacementsChart />
        <DiversityChart />
      </div>

      <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100'>
        <h3 className='text-lg font-bold text-brand-dark mb-4'>
          Recent System Activity
        </h3>
        <div className='space-y-4'>
          {[
            'Internship "React.js Intern" was posted by Bodija Software.',
            'New resource article "Interview Tips" published by Sarah Jenkins.',
            "CSV bulk upload processed: 15 new listings added.",
            "Admin login detected from new IP address: 192.168.1.1",
          ].map((activity, i) => (
            <div
              key={i}
              className='flex items-center gap-3 text-sm text-slate-600 pb-3 border-b border-slate-50 last:border-0 last:pb-0'
            >
              <div className='w-2 h-2 rounded-full bg-brand-teal'></div>
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
