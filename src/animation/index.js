import { keyframes } from "@emotion/react";
import { Colors } from "../styles/theme";

export const uploadAnimation = keyframes`
  0% { transform : translateY(-2px) }
  50% { transform : translateY(2px) }
  100% { transform : translateY(-2px) }
`;

export const dragAnimation = keyframes`
  0% { transform : scale(1) }
  50% { transform : scale(1.1) }
  100% { transform : scale(1) }
`;

export const aiTrainingBtnAnimation = keyframes`
  0% { transform : scale(1) }
  50% { 
    transform : scale(1.1);
    background-color: #1976d2;
    }
  100% { transform : scale(1) }
`;

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
  50% { transform : scale(1.05) }
  100% { transform : scale(1) }
`;

export const OrderListExeListIndexAnimation = keyframes`
  0% {
    outline: none;
    box-shadow: none;
  }
  100% {
    outline: 2.5px solid #1976d2;
    box-shadow: inset 0px 0px 6px 3.5px #1976d2;
    transform: translateY(-50%);
  }
`;

export const OrderListExeListCheckAnimation = keyframes`
  0% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
  }
  100% {
    -webkit-transform: rotateY(-1440deg);
            transform: rotateY(-1440deg);
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
    -webkit-transform : scale(1.05);
            transform : scale(1.05);
  }
  100% {
    -webkit-transform : scale(1);
            transform : scale(1);
  }
`;

export const boxMove = keyframes`
  0% {
    left: 0px
  }
  100% {
    left: calc(100% - 80px)
  }
`;

export const boxMove2 = keyframes`
  0% {
    left: 0px;
  }
  100% {
    left: calc(100% - 160px)
  }
`;
