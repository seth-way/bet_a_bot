import { create } from 'zustand';
import { activeLeague } from '@/constants';

type activeLeagues = {
  activeLeagues: activeLeague[];
  update: (leagues: activeLeague[]) => void;
  clear: () => void;
};

export const useActiveLeagues = create<activeLeagues>(set => ({
  activeLeagues: [],
  update: leagues => set(state => ({ activeLeagues: leagues })),
  clear: () => set(state => ({ activeLeagues: [] })),
}));

type selectedLeagues = {
  selectedLeagues: Set<string>;
};

export const useSelectedLeagues = create<selectedLeagues>(() => ({
  selectedLeagues: new Set<string>(),
}));
