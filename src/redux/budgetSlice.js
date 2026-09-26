import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const saved = localStorage.getItem('budgetbasics_theme');
  return saved === 'dark';
};

const getInitialGoals = () => {
  const saved = localStorage.getItem('budgetbasics_goals');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
    }
  }
  return [
    { id: 1, name: 'New Laptop Goal', target: 60000, current: 25000, monthly: 5000 },
    { id: 2, name: 'Emergency Safety Fund', target: 20000, current: 8000, monthly: 3000 }
  ];
};

const getInitialExpenses = () => {
  const saved = localStorage.getItem('budgetbasics_expenses');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
    }
  }
  return [
    { id: 1, date: '2026-09-02', category: 'Education', description: 'Course Notebooks & Pens', amount: 350.0 },
    { id: 2, date: '2026-09-05', category: 'Transport', description: 'Monthly Bus / Metro Pass', amount: 1200.0 },
    { id: 3, date: '2026-09-10', category: 'Food', description: 'Weekly Canteen & Groceries', amount: 2500.0 },
    { id: 4, date: '2026-09-15', category: 'Entertainment', description: 'Weekend Movie Ticket', amount: 450.0 }
  ];
};

const initialState = {
  darkMode: getInitialTheme(),
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'default',
  allowance: 15000,
  goals: getInitialGoals(),
  expenses: getInitialExpenses()
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('budgetbasics_theme', state.darkMode ? 'dark' : 'light');
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.sortBy = 'default';
    },
    setAllowance: (state, action) => {
      state.allowance = action.payload;
    },
    addGoal: (state, action) => {
      state.goals.unshift(action.payload);
      localStorage.setItem('budgetbasics_goals', JSON.stringify(state.goals));
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
      localStorage.setItem('budgetbasics_goals', JSON.stringify(state.goals));
    },
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
      localStorage.setItem('budgetbasics_expenses', JSON.stringify(state.expenses));
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
        localStorage.setItem('budgetbasics_expenses', JSON.stringify(state.expenses));
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter((exp) => exp.id !== action.payload);
      localStorage.setItem('budgetbasics_expenses', JSON.stringify(state.expenses));
    },
    clearAllExpenses: (state) => {
      state.expenses = [];
      localStorage.setItem('budgetbasics_expenses', JSON.stringify([]));
    }
  }
});

export const {
  toggleDarkMode,
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  resetFilters,
  setAllowance,
  addGoal,
  deleteGoal,
  addExpense,
  updateExpense,
  deleteExpense,
  clearAllExpenses
} = budgetSlice.actions;

export default budgetSlice.reducer;
