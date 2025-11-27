import React, { useState, useEffect, useCallback } from 'react';
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

  // Helper to get today's date string YYYY-MM-DD
  const getTodayString = () => new Date().toISOString().split('T')[0];

  // Helper to generate empty daily data
  const createEmptyDailyData = (date: string): DailyData => ({
    date: date,
    todayGoal: '',
    todos: '',
    schedule: Array(12).fill(''),
    checklist: '',
    memo: '',
    summary: ''
  });

  // Load specific daily data
  const loadDailyForDate = useCallback((date: string) => {
    const key = `planner_daily_${date}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
    return createEmptyDailyData(date);
  }, []);

  // Load from LocalStorage on mount & Migrate legacy data
  useEffect(() => {
    // 1. Weekly, Monthly, Yearly load as before
    const load = (key: string) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : undefined;
    };
    setWeeklyData(load('planner_weekly'));
    setMonthlyData(load('planner_monthly'));
    setYearlyData(load('planner_yearly'));

    // 2. Daily Data Migration & Init
    const legacyDaily = localStorage.getItem('planner_daily');
    const today = getTodayString();

    if (legacyDaily) {
      try {
        const parsedLegacy = JSON.parse(legacyDaily);
        // If legacy data exists, save it to the new date-specific key
        if (parsedLegacy.date) {
            localStorage.setItem(`planner_daily_${parsedLegacy.date}`, legacyDaily);
        }
        // Remove legacy key so we don't migrate again
        localStorage.removeItem('planner_daily');
        
        // If the legacy data was for today, load it. Otherwise load today's (which might be empty or migrated)
        if (parsedLegacy.date === today) {
            setDailyData(parsedLegacy);
        } else {
            setDailyData(loadDailyForDate(today));
        }
      } catch (e) {
        console.error("Migration failed", e);
        setDailyData(loadDailyForDate(today));
      }
    } else {
      // No legacy data, just load today
      setDailyData(loadDailyForDate(today));
    }
  }, [loadDailyForDate]);

  // Save handlers
  const saveDaily = (data: DailyData) => {
    setDailyData(data);
    // Save to date-specific key
    localStorage.setItem(`planner_daily_${data.date}`, JSON.stringify(data));
  };

  // Handle Date Switching in Daily View
  const handleDailyDateChange = (newDate: string) => {
    // 1. Save current data one last time to ensure consistency (optional as debouncing handles it, but good for safety)
    if (dailyData) {
        localStorage.setItem(`planner_daily_${dailyData.date}`, JSON.stringify(dailyData));
    }
    
    // 2. Load data for the new date
    const newData = loadDailyForDate(newDate);
    setDailyData(newData);
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
      {activeTab === 'daily' && dailyData && (
        <DailyView 
            initialData={dailyData} 
            onSave={saveDaily} 
            onDateChange={handleDailyDateChange}
        />
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