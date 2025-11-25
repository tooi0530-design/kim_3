import React, { useState, useEffect } from 'react';
import { MonthlyData } from '../types';

interface MonthlyViewProps {
  initialData?: MonthlyData;
  onSave: (data: MonthlyData) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({ initialData, onSave }) => {
  const [data, setData] = useState<MonthlyData>(() => initialData || {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    dates: {},
    memo: ''
  });

  useEffect(() => {
    const handler = setTimeout(() => onSave(data), 500);
    return () => clearTimeout(handler);
  }, [data, onSave]);

  const daysInMonth = new Date(data.year, data.month + 1, 0).getDate();
  const firstDay = new Date(data.year, data.month, 1).getDay();

  const handleDateChange = (day: number, value: string) => {
    setData({
      ...data,
      dates: { ...data.dates, [day]: value }
    });
  };

  const getCalendarCells = () => {
    const cells = [];
    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="border-r border-b border-sage-500 h-24 lg:h-32 bg-sage-50/20"></div>);
    }
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(
        <div key={day} className="border-r border-b border-sage-500 h-24 lg:h-32 relative group bg-paper hover:bg-white transition-colors">
          <span className="absolute top-1 left-2 text-sage-900 font-bold">{day}</span>
          <textarea 
            className="w-full h-full pt-7 px-1 bg-transparent resize-none outline-none text-sm text-gray-700"
            value={data.dates[day] || ''}
            onChange={(e) => handleDateChange(day, e.target.value)}
          />
        </div>
      );
    }
    // Remaining empty cells to complete the grid (optional, but looks better)
    const totalCells = cells.length;
    const remaining = 35 - totalCells > 0 ? 35 - totalCells : (42 - totalCells > 0 ? 42 - totalCells : 0);
    for (let i = 0; i < remaining; i++) {
        cells.push(<div key={`empty-end-${i}`} className="border-r border-b border-sage-500 h-24 lg:h-32 bg-sage-50/20"></div>);
    }

    return cells;
  };

  return (
    <div className="w-full flex flex-col gap-4">
       {/* Header */}
       <div className="text-center pb-4">
        <h2 className="text-3xl font-serif font-bold text-sage-700 tracking-widest mb-2">월간 계획표</h2>
        <div className="flex justify-center items-center gap-4 text-sage-700 font-sans">
            <button onClick={() => setData({...data, month: data.month === 0 ? 11 : data.month - 1, year: data.month === 0 ? data.year - 1 : data.year})}>&lt;</button>
            <span className="text-xl font-bold">{data.year} . {data.month + 1}</span>
            <button onClick={() => setData({...data, month: data.month === 11 ? 0 : data.month + 1, year: data.month === 11 ? data.year + 1 : data.year})}>&gt;</button>
        </div>
      </div>

      {/* Calendar Grid Header */}
      <div className="w-full border-t-2 border-l-2 border-r-2 border-sage-700 grid grid-cols-7 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
            <div key={day} className={`py-2 font-bold ${i === 0 ? 'text-red-500' : 'text-sage-700'} border-r border-sage-500 last:border-r-0`}>
                {day}
            </div>
        ))}
      </div>

      {/* Calendar Grid Body */}
      <div className="w-full border-l border-t border-sage-500 grid grid-cols-7 mb-4">
        {getCalendarCells()}
      </div>

      {/* Bottom Memo */}
      <div className="border-2 border-sage-500 rounded-xl p-4 h-32 flex flex-col bg-paper relative">
          <span className="absolute -top-3 left-4 bg-paper px-2 text-sage-700 font-bold text-lg">Memo</span>
          <textarea 
            className="w-full h-full bg-transparent resize-none outline-none"
            value={data.memo}
            onChange={(e) => setData({...data, memo: e.target.value})}
          />
      </div>
    </div>
  );
};

export default MonthlyView;