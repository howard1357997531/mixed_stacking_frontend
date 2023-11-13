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

export const OrderListExeListCheckAnimation = keyframes`
  0% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(-1080deg);
            transform: rotateY(-1080deg);
  }
`;

export const OrderListExeListDeleteAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0);
            transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(-180deg);
            transform: rotate(-180deg);
  }
`;

export const OrderListExeListWaitToExecuteAnimation = keyframes`
  0% {
    -webkit-transform : scale(1);
            transform : scale(1);
  }
  50% {
    -webkit-transform : scale(1.1);
            transform : scale(1.1);
  }
  100% {
    -webkit-transform : scale(1);
            transform : scale(1);
  }
`;
