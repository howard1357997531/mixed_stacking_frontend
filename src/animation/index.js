import { keyframes } from "@emotion/react";

export const errorMsgIconButtonAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-180deg);
            transform: rotate(-180deg);
  }
`;

export const operateShowBoardTextAnimation = keyframes`
  0% { transform : scale(1) }
  50% { transform : scale(1.1) }
  100% { transform : scale(1) }
`;
