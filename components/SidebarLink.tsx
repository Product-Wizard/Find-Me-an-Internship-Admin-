import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarLink: React.FC<{
  to: string;
  icon: any;
  label: string;
  onClick?: () => void;
}> = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.startsWith(to);

  return (
    <button
      onClick={() => {
        navigate(to);
        if (onClick) onClick();
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        isActive
          ? "bg-brand-teal text-white shadow-md"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      <Icon className='w-5 h-5' />
      {label}
    </button>
  );
};

export default SidebarLink;
