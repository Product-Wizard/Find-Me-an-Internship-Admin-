import React from "react";

const SettingsPage: React.FC = () => (
  <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl'>
    <h2 className='text-2xl font-bold text-brand-dark mb-6'>Portal Settings</h2>
    <div className='space-y-6'>
      <div>
        <label className='block text-sm font-bold text-slate-700 mb-2'>
          Primary Organization Name
        </label>
        <input
          type='text'
          defaultValue='Find Me An Internship'
          className='w-full p-3 bg-slate-50 border rounded-lg'
        />
      </div>
      <div>
        <label className='block text-sm font-bold text-slate-700 mb-2'>
          Contact Support Email
        </label>
        <input
          type='email'
          defaultValue='support@findmeaninternship.org'
          className='w-full p-3 bg-slate-50 border rounded-lg'
        />
      </div>
      <div className='pt-6 border-t border-slate-100'>
        <button className='bg-brand-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-teal transition-colors'>
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

export default SettingsPage;
