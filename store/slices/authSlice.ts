import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  age?: number;
  sex?: string;
  interests?: string[];
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  onboardingComplete: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.onboardingComplete = false;
      state.user = null;
    },
    completeOnboarding: (state, action: PayloadAction<Partial<User>>) => {
      state.onboardingComplete = true;
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { login, logout, completeOnboarding, updateUser } = authSlice.actions;

export default authSlice.reducer;