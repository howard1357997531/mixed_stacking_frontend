import { NAV } from "../constants";

export const navReducer = (state = { historyCount: 0 }, action) => {
  switch (action.type) {
    case NAV.historyCount:
      if (action.payload === 0) {
        var historyCount = 0;
      } else {
        var historyCount = state.historyCount + 1;
      }

      localStorage.setItem("nav", JSON.stringify({ ...state, historyCount }));
      return { ...state, historyCount };
    default:
      return state;
  }
};
