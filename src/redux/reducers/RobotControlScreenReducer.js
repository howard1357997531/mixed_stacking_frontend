import {
  ROBOT_CONTROL_SCREEN_executeRobot,
  ROBOT_CONTROL_SCREEN_orderList,
} from "../constants";

export const robotControlScreen_orderSelectReducer = (
  state = { orderListId: null },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_orderList.selectId:
      return {
        ...state,
        orderListId: action.payload,
      };

    default:
      return state;
  }
};

export const robotControlScreen_executeRobotReducer = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case ROBOT_CONTROL_SCREEN_executeRobot.request:
      return {};

    case ROBOT_CONTROL_SCREEN_executeRobot.success:
      return {};

    case ROBOT_CONTROL_SCREEN_executeRobot.fail:
      return {};

    default:
      return state;
  }
};
