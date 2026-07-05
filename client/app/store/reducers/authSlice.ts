import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface UserState {
  id: number;
  phone: string;
  email: string;
  name: string;
  surname: string;
  isAdmin: boolean;
  token: string;
  isAuthenticated: boolean;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
}

const initialState: UserState = {
  id: 0,
  email: '',
  name: '',
  surname: '',
  phone: '',
  isAdmin: false,
  token: '',
  isAuthenticated: false,
  isLoginOpen: false,
  isRegisterOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      // Decode token to extract user information
      try {
        const decoded: any = jwtDecode(token);
        state.id = decoded.id;
        state.email = decoded.email;
        state.phone = decoded.phone;
        state.name = decoded.name;
        state.surname = decoded.surname;
        state.isAdmin = decoded.isAdmin;
        state.token = token;
        state.isAuthenticated = true;
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      state.id = 0;
      state.email = '';
      state.name = '';
      state.surname = '';
      state.isAdmin = false;
      state.token = '';
      state.isAuthenticated = false;
    },
    setIsLoginOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isLoginOpen = action.payload.isOpen;
    },
    setIsRegisterOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isRegisterOpen = action.payload.isOpen;
    },
  },
});

export const { setUser, logout, setIsLoginOpen, setIsRegisterOpen } =
  authSlice.actions;
export default authSlice.reducer;
