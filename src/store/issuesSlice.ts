
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from '../types';

interface IssuesState {
  todoIssues: Issue[];
  doneIssues: Issue[];
  viewMode: 'list' | 'kanban';
  isLoading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  todoIssues: [],
  doneIssues: [],
  viewMode: 'list',
  isLoading: false,
  error: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      const issues = action.payload;
      state.todoIssues = issues.filter(issue => issue.state === 'open');
      state.doneIssues = issues.filter(issue => issue.state === 'closed');
      state.isLoading = false;
      state.error = null;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'kanban' : 'list';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearIssues: (state) => {
      state.todoIssues = [];
      state.doneIssues = [];
      state.error = null;
    },
  },
});

export const { setIssues, toggleViewMode, setLoading, setError, clearIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
