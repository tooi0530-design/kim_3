export type ViewMode = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface DailyData {
  date: string;
  todayGoal: string; // The "Today" box content
  todos: string; // The top right box
  schedule: string[]; // Lines for the schedule table
  checklist: string; // Bottom left
  memo: string; // Bottom right
  summary: string; // Footer
}

export interface WeeklyData {
  weekGoal: string;
  days: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  todoList: string;
  memo: string;
}

export interface MonthlyData {
  month: number; // 0-11
  year: number;
  dates: { [day: number]: string }; // Day number -> Content
  memo: string;
}

export interface YearlyData {
  year: number;
  months: { [month: number]: string }; // Month index -> Content
}
