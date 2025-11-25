import React, { useState, useEffect } from 'react';
import { YearlyData } from '../types';

interface YearlyViewProps {
  initialData?: YearlyData;
  onSave: (data: YearlyData) => void;
}

const YearlyView: React.FC<YearlyViewProps> = ({ initialData, onSave }) => {
  const [data, setData] = useState<YearlyData>(() => initialData || {
    year: new Date().getFullYear(),
    months: {}
  });

  useEffect(() => {
    const handler = setTimeout(() => onSave(data), 500);
    return () => clearTimeout(handler);
  }, [data, onSave]);

  const handleMonthChange = (monthIndex: number, value: string) => {
    setData({
      ...data,
      months: { ...data.months, [monthIndex]: value }
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
       <div className="flex justify-between items-end border-b border-gray-400 pb-2">
            <h2 className="text-4xl font-serif text-gray-900">Yearly planner</h2>
            <div className="flex items-center gap-2">
                <span className="font-bold text-gray-600 text-sm">YEAR:</span>
                <input 
                    type="number"
                    className="w-20 border-b border-gray-600 bg-transparent text-xl font-bold text-center outline-none"
                    value={data.year}
                    onChange={(e) => setData({...data, year: parseInt(e.target.value) || new Date().getFullYear()})}
                />
            </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex flex-col border border-gray-400 h-64 bg-paper">
                    {/* Header */}
                    <div className="bg-sage-50 border-b border-gray-400 py-1 text-center font-bold text-gray-700">
                        {index + 1}월
                    </div>
                    {/* Content Lines */}
                    <div className="flex-1 flex flex-col">
                        <textarea 
                             className="flex-1 w-full p-2 bg-transparent resize-none outline-none text-sm leading-6"
                             style={{
                                backgroundImage: 'linear-gradient(transparent 96%, #e5e7eb 96%)',
                                backgroundSize: '100% 1.5rem',
                                lineHeight: '1.5rem'
                             }}
                             value={data.months[index] || ''}
                             onChange={(e) => handleMonthChange(index, e.target.value)}
                        />
                    </div>
                </div>
            ))}
       </div>
    </div>
  );
};

export default YearlyView;