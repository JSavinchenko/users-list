import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from './userTypes';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  },
);
