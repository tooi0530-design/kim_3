import React from 'react';

interface PlannerLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const PlannerLayout: React.FC<PlannerLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="min-h-screen bg-[#E0E0E0] p-4 md:p-8 flex justify-center items-start">
      {/* The Paper Sheet */}
      <div className="bg-[#FFFDF7] w-full max-w-6xl min-h-[90vh] shadow-2xl rounded-sm relative flex flex-col">
        
        {/* Binder Holes Visual (Optional decoration) */}
        <div className="absolute left-2 md:left-4 top-0 bottom-0 w-8 md:w-12 border-r border-gray-200 hidden md:flex flex-col items-center pt-8 gap-16">
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
        </div>

        {/* Content Area */}
        <div className="flex-1 ml-0 md:ml-16 p-4 md:p-8 md:pr-12">
            
            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-8 border-b-2 border-sage-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2 font-serif text-lg transition-all rounded-t-lg 
                        ${activeTab === tab.id 
                            ? 'bg-sage-500 text-white shadow-md transform -translate-y-1' 
                            : 'bg-sage-50 text-sage-700 hover:bg-sage-100'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="animate-fade-in">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerLayout;