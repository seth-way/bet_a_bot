import { create } from 'zustand';
import { activeLeague } from '@/constants';

type activeLeagues = {
  activeLeagues: activeLeague[];
  update: (sports: activeLeague[]) => void;
  clear: () => void;
};

export const useActiveLeagues = create<activeLeagues>((set, get) => ({
  activeLeagues: [],
  update: leagues => set(state => ({ activeLeagues: leagues })),
  clear: () => set(state => ({ activeLeagues: [] })),
}));
