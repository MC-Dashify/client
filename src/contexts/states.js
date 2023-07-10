import { atom } from 'recoil';

const statsState = atom({
  key: 'stats',
  default: []
});

const worldsState = atom({
  key: 'worlds',
  default: []
});

const worldDetailState = atom({
  key: 'worldDetail',
  default: {}
});

const playersState = atom({
  key: 'players',
  default: []
});

const profilesState = atom({
  key: 'profiles',
  default: []
});

const currentProfileState = atom({
  key: 'currentProfile',
  default: {}
});

const refreshRateState = atom({
  key: 'refreshRate',
  default: 15000
});

const hideAddressState = atom({
  key: 'hideAddress',
  default: false
});

export {
  statsState,
  profilesState,
  currentProfileState,
  refreshRateState,
  hideAddressState,
  worldsState,
  playersState,
  worldDetailState
};
