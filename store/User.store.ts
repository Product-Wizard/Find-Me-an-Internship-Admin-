import { User } from '@/types/model/user.model'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStoreDataAction {
  user: User | null;
  token: string;
  setUser: (user: User | null) => void;
  setToken: (user: string) => void;
}

const UserStore = create(persist<UserStoreDataAction>((set, get) => ({
  user: null,
  token: "",
  setToken: (token) => set({ token: token }),
  setUser: (user) => set({ user: user }),
}), {
  name: "USER_AUTH_DATA",
}));

export default UserStore;