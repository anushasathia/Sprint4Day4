import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

const mockUser = {
  id: 'user123',
  username: 'TestUser',
  email: 'test@example.com',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.currentUser = mockUser;
      state.isLoggedIn = true;
      console.log("User logged in:", state.currentUser.username);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      console.log("User logged out.");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
