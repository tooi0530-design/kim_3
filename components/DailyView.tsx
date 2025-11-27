import React, { useEffect, useState } from 'react';
import { DailyData } from '../types';

interface DailyViewProps {
  initialData: DailyData;
  onSave: (data: DailyData) => void;
  onDateChange?: (newDate: string) => void;
}

const ROWS = 12; // Number of rows in the schedule table

const DailyView: React.FC<DailyViewProps> = ({ initialData, onSave, onDateChange }) => {
  const [data, setData] = useState<DailyData>(initialData);

  // Sync internal state when initialData changes (e.g. when App loads a different date)
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Debounce save
  useEffect(() => {
    const handler = setTimeout(() => {
      onSave(data);
    }, 500);
    return () => clearTimeout(handler);
  }, [data, onSave]);

  const handleScheduleChange = (index: number, value: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index] = value;
    setData({ ...data, schedule: newSchedule });
  };

  const getDayOfWeek = (dateString: string) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const date = new Date(dateString);
    if(isNaN(date.getTime())) return 'MON';
    return days[date.getDay()];
  };

  const currentDay = getDayOfWeek(data.date);

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {/* Header: Title */}
      <div className="text-center pb-4 border-b-2 border-dashed border-sage-200">
        <h2 className="text-3xl font-serif font-bold text-gray-800 tracking-widest">일간 계획표</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-48">
        {/* Left: TODAY Box */}
        <div className="w-full md:w-1/3 border-2 border-gray-800 rounded-2xl p-4 flex flex-col relative bg-paper">
            <div className="text-4xl font-bold font-sans mb-2 tracking-tighter">TODAY</div>
            <input 
                type="date" 
                value={data.date}
                onChange={(e) => {
                    // If onDateChange is provided, let parent handle data switching
                    if (onDateChange) {
                        onDateChange(e.target.value);
                    } else {
                        // Fallback (shouldn't really happen with new App logic)
                        setData({...data, date: e.target.value});
                    }
                }}
                className="text-lg font-serif bg-transparent outline-none text-gray-600 mb-2 cursor-pointer hover:text-sage-700 transition-colors"
            />
            
            <div className="mt-auto flex justify-between items-end font-bold text-sm text-gray-500">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                    <span key={day} className={currentDay === day ? "text-sage-700 font-extrabold border-b-2 border-sage-700" : ""}>{day}</span>
                ))}
            </div>
        </div>

        {/* Right: Today's To Do (Gray Box) */}
        <div className="w-full md:w-2/3 bg-gray-200 rounded-2xl p-4 flex flex-col">
           <span className="text-sm font-bold text-gray-600 mb-2">오늘의 할 일</span>
           <textarea
             className="flex-1 w-full bg-transparent resize-none outline-none text-gray-700 leading-relaxed custom-line-height"
             placeholder="할 일을 입력하세요..."
             value={data.todos}
             onChange={(e) => setData({...data, todos: e.target.value})}
           />
        </div>
      </div>

      {/* Main Table: Schedule */}
      <div className="border-2 border-gray-800 rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="flex border-b-2 border-gray-800 bg-paper">
            <div className="w-16 border-r-2 border-gray-800 p-2 text-center font-bold text-sm">번호</div>
            <div className="flex-1 p-2 text-center font-bold text-sm">오늘의 계획</div>
        </div>
        {/* Table Body */}
        {data.schedule.map((item, index) => (
            <div key={index} className="flex border-b border-gray-400 last:border-b-0 h-10">
                <div className="w-16 border-r border-gray-400 flex items-center justify-center text-sage-700 font-mono text-sm bg-sage-50/30">
                    {index + 1}
                </div>
                <input 
                    type="text" 
                    className="flex-1 px-3 bg-transparent outline-none focus:bg-sage-50/50 transition-colors"
                    value={item}
                    onChange={(e) => handleScheduleChange(index, e.target.value)}
                />
            </div>
        ))}
      </div>

      {/* Bottom Section: Checklist & Memo */}
      <div className="flex flex-col md:flex-row gap-4 h-64">
        {/* Checklist */}
        <div className="flex-1 border-2 border-gray-800 rounded-2xl p-4 flex flex-col bg-paper">
            <span className="text-sm font-bold text-gray-800 mb-2">체크리스트</span>
            <textarea 
                className="flex-1 w-full bg-transparent resize-none outline-none leading-7 text-gray-700 checklist-bg"
                style={{
                    backgroundImage: 'linear-gradient(transparent 95%, #e5e7eb 95%)',
                    backgroundSize: '100% 1.75rem',
                    lineHeight: '1.75rem'
                }}
                value={data.checklist}
                onChange={(e) => setData({...data, checklist: e.target.value})}
            />
        </div>
        {/* Memo */}
        <div className="flex-1 border-2 border-gray-800 rounded-2xl p-4 flex flex-col bg-paper">
            <span className="text-sm font-bold text-gray-800 mb-2">메모</span>
            <textarea 
                className="flex-1 w-full bg-transparent resize-none outline-none p-1 text-gray-700"
                value={data.memo}
                onChange={(e) => setData({...data, memo: e.target.value})}
            />
        </div>
      </div>

      {/* Footer: One Line Summary */}
      <div className="mt-2">
         <div className="text-sm font-bold mb-1">하루 한 줄 마무리 /</div>
         <input 
            type="text" 
            className="w-full border-b-2 border-dashed border-gray-400 bg-transparent outline-none py-1 text-gray-800"
            value={data.summary}
            onChange={(e) => setData({...data, summary: e.target.value})}
         />
      </div>
    </div>
  );
};

export default DailyView;