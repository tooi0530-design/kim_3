import React, { useState, useEffect } from 'react';
import { WeeklyData } from '../types';

interface WeeklyViewProps {
  initialData?: WeeklyData;
  onSave: (data: WeeklyData) => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ initialData, onSave }) => {
  const [data, setData] = useState<WeeklyData>(() => initialData || {
    weekGoal: '',
    days: {
      mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: ''
    },
    todoList: '',
    memo: ''
  });

  useEffect(() => {
    const handler = setTimeout(() => onSave(data), 500);
    return () => clearTimeout(handler);
  }, [data, onSave]);

  const handleDayChange = (day: keyof WeeklyData['days'], value: string) => {
    setData({
      ...data,
      days: { ...data.days, [day]: value }
    });
  };

  const dayLabels: { key: keyof WeeklyData['days'], label: string }[] = [
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
    { key: 'sun', label: '일' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-sage-500">
        <h2 className="text-3xl font-serif font-bold text-sage-700 tracking-widest">주간 계획표</h2>
      </div>

      {/* Goal of the Week */}
      <div className="flex flex-col border-b border-sage-500 pb-2">
        <span className="text-sage-700 font-bold mb-1">이주의 목표</span>
        <input 
            type="text"
            className="w-full bg-sage-50/50 p-2 rounded outline-none border border-transparent focus:border-sage-200 transition-colors"
            placeholder="이번 주 목표를 입력하세요"
            value={data.weekGoal}
            onChange={(e) => setData({...data, weekGoal: e.target.value})}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[800px]">
        {/* Left Column: Days */}
        <div className="w-full lg:w-2/3 border border-sage-500 rounded-sm flex flex-col">
            {dayLabels.map((dayItem, index) => (
                <div key={dayItem.key} className={`flex-1 flex border-b border-sage-500 last:border-b-0 min-h-[100px]`}>
                    <div className="w-16 border-r border-sage-500 flex items-center justify-center font-bold text-sage-700 bg-white">
                        {dayItem.label}
                    </div>
                    <textarea 
                        className="flex-1 p-3 resize-none outline-none bg-paper focus:bg-sage-50/30 transition-colors"
                        value={data.days[dayItem.key]}
                        onChange={(e) => handleDayChange(dayItem.key, e.target.value)}
                    />
                </div>
            ))}
        </div>

        {/* Right Column: Todo & Memo */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {/* Todo List */}
            <div className="flex-1 border border-sage-500 rounded-sm flex flex-col bg-white">
                <div className="p-2 border-b border-sage-500 font-bold text-sage-700">할일 목록</div>
                <textarea 
                    className="flex-1 p-3 resize-none outline-none bg-paper checklist-bg"
                    style={{
                        backgroundImage: 'linear-gradient(transparent 96%, #e6efed 96%)',
                        backgroundSize: '100% 2rem',
                        lineHeight: '2rem'
                    }}
                    value={data.todoList}
                    onChange={(e) => setData({...data, todoList: e.target.value})}
                />
            </div>
            {/* Memo (Grid look) */}
            <div className="h-1/3 border border-sage-500 rounded-sm flex flex-col bg-white">
                <div className="p-2 border-b border-sage-500 font-bold text-sage-700">메모</div>
                <textarea 
                    className="flex-1 p-3 resize-none outline-none bg-paper"
                    style={{
                        backgroundImage: `linear-gradient(#e6efed 1px, transparent 1px), linear-gradient(90deg, #e6efed 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                        backgroundColor: '#FFFDF7'
                    }}
                    value={data.memo}
                    onChange={(e) => setData({...data, memo: e.target.value})}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;