import { atom } from 'recoil';

const statsState = atom({
  key: 'stats',
  default: []
});

const worldsState = atom({
  key: 'worlds',
  default: {}
});

const playersState = atom({
  key: 'players',
  default: {}
});

const profilesState = atom({
  key: 'profiles',
  default: []
});

const currentProfileState = atom({
  key: 'currentProfile',
  default: {}
});

const lastSentCommandsState = atom({
  key: 'lastSent',
  default: []
});

const refreshRateState = atom({
  key: 'refreshRate',
  default: 15000
});

const hideAddressState = atom({
  key: 'hideAddress',
  default: false
});

const trafficState = atom({
  key: 'traffic',
  default: []
});

export {
  statsState,
  profilesState,
  currentProfileState,
  refreshRateState,
  hideAddressState,
  worldsState,
  playersState,
  lastSentCommandsState,
  trafficState
};
