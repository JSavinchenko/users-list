import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User, UsersState} from './userTypes';

// Асинхронный thunk для получения данных пользователей
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  },
);

// Инициализация начального состояния
const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
  sort: 'none',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const {setSort} = usersSlice.actions;
export const {updateUser} = usersSlice.actions;
export default usersSlice.reducer;
