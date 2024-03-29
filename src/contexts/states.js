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

const banListState = atom({
  key: 'banList',
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

const trapPauseState = atom({
  key: 'trapPause',
  default: {}
});

const themeState = atom({
  key: 'theme',
  default: 'dark'
});

export {
  statsState,
  profilesState,
  currentProfileState,
  refreshRateState,
  hideAddressState,
  worldsState,
  playersState,
  banListState,
  lastSentCommandsState,
  trafficState,
  trapPauseState,
  themeState
};
