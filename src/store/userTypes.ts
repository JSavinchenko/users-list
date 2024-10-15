export interface Address {
  city: string;
  street: string;
  zipcode: string;
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
  comment?: string;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sort: 'none' | 'city' | 'company';
}
