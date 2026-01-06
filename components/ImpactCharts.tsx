import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const placementData = [
  { name: 'Jan', students: 12 },
  { name: 'Feb', students: 19 },
  { name: 'Mar', students: 35 },
  { name: 'Apr', students: 28 },
  { name: 'May', students: 45 },
  { name: 'Jun', students: 60 },
];

const diversityData = [
  { name: 'STEM', value: 400 },
  { name: 'Arts', value: 300 },
  { name: 'Business', value: 300 },
  { name: 'Vocational', value: 200 },
];

const COLORS = ['#2A9D8F', '#264653', '#E9C46A', '#F4A261'];

export const PlacementsChart: React.FC = () => (
  <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100">
    <h3 className="text-lg font-semibold text-brand-dark mb-4">Monthly Internships Secured</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={placementData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          cursor={{ fill: '#f1f5f9' }}
        />
        <Bar dataKey="students" fill="#2A9D8F" radius={[4, 4, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const DiversityChart: React.FC = () => (
  <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100">
    <h3 className="text-lg font-semibold text-brand-dark mb-4">Field Distribution</h3>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={diversityData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {diversityData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 text-xs text-slate-600 mt-2">
      {diversityData.map((d, i) => (
        <div key={d.name} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
          {d.name}
        </div>
      ))}
    </div>
  </div>
);