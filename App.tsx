import React, { useState, useEffect } from 'react';
import PlannerLayout from './components/PlannerLayout';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import MonthlyView from './components/MonthlyView';
import YearlyView from './components/YearlyView';
import { ViewMode, DailyData, WeeklyData, MonthlyData, YearlyData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<ViewMode>('daily');
  
  // Persistent State Logic
  const [dailyData, setDailyData] = useState<DailyData | undefined>(undefined);
  const [weeklyData, setWeeklyData] = useState<WeeklyData | undefined>(undefined);
  const [monthlyData, setMonthlyData] = useState<MonthlyData | undefined>(undefined);
  const [yearlyData, setYearlyData] = useState<YearlyData | undefined>(undefined);

  // Load from LocalStorage on mount
  useEffect(() => {
    const load = (key: string) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : undefined;
    };
    setDailyData(load('planner_daily'));
    setWeeklyData(load('planner_weekly'));
    setMonthlyData(load('planner_monthly'));
    setYearlyData(load('planner_yearly'));
  }, []);

  // Save handlers
  const saveDaily = (data: DailyData) => {
    setDailyData(data);
    localStorage.setItem('planner_daily', JSON.stringify(data));
  };

  const saveWeekly = (data: WeeklyData) => {
    setWeeklyData(data);
    localStorage.setItem('planner_weekly', JSON.stringify(data));
  };

  const saveMonthly = (data: MonthlyData) => {
    setMonthlyData(data);
    localStorage.setItem('planner_monthly', JSON.stringify(data));
  };

  const saveYearly = (data: YearlyData) => {
    setYearlyData(data);
    localStorage.setItem('planner_yearly', JSON.stringify(data));
  };

  return (
    <PlannerLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'daily' && (
        <DailyView initialData={dailyData} onSave={saveDaily} />
      )}
      {activeTab === 'weekly' && (
        <WeeklyView initialData={weeklyData} onSave={saveWeekly} />
      )}
      {activeTab === 'monthly' && (
        <MonthlyView initialData={monthlyData} onSave={saveMonthly} />
      )}
      {activeTab === 'yearly' && (
        <YearlyView initialData={yearlyData} onSave={saveYearly} />
      )}
    </PlannerLayout>
  );
}

export default App;