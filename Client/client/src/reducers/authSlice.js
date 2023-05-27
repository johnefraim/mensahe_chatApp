import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  selectedUser: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state._id = null;
      localStorage.removeItem('token');
    },
    setAuthenticatedState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.type, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

export const { logout, setAuthenticatedState, setSelectedUser, login } = authSlice.actions;
export default authSlice.reducer;
