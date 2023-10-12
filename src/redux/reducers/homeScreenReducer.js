import { HOME_BUTTON } from "../constants";

export const HomeButtonHoverReducer = (
  state = { createNewOrder: false, robotConsole: false },
  action
) => {
  switch (action.type) {
    case HOME_BUTTON.createNewOrder.hover:
      return {
        ...state,
        createNewOrder: true,
      };

    case HOME_BUTTON.createNewOrder.unhover:
      return {
        ...state,
        createNewOrder: false,
      };

    case HOME_BUTTON.robotConsole.hover:
      return {
        ...state,
        robotConsole: true,
      };

    case HOME_BUTTON.robotConsole.unhover:
      return {
        ...state,
        robotConsole: false,
      };

    default:
      return state;
  }
};
