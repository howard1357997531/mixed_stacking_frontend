import { TOAST } from "../constants";

export const toastReducer = (
  state = {
    aiTrainingToast: false,
    aiTrainingId: null,
    aiTrainingNotInPage: false,
  },
  action
) => {
  switch (action.type) {
    case TOAST.aiTraining:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
