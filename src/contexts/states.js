import { atom } from "recoil";

const testState = atom({
  key: "test", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

const statsState = atom({
  key: "stats",
  default: []
})

export { testState, statsState };
