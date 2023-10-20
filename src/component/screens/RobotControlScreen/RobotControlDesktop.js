import React from "react";
import {
  RobotControlContainer,
  OperationInterface,
  InformationArea,
  InformationAreaBox,
} from "../../../styles/RobotControlScreen";
import OperationInterfaceBox1 from "./OperationInterfaceBox1";
import OperationInterfaceBox2 from "./OperationInterfaceBox2";
import OperationInterfaceBox3 from "./OperationInterfaceBox3";
import InformationAreaTitle from "./InformationAreaTitle";
import InformationAreaContent from "./InformationAreaContent";
import "./css/OperationInterface.css";

function RobotControlDesktop() {
  return (
    <RobotControlContainer>
      <OperationInterface className="operation-interface">
        <OperationInterfaceBox1 />

        <OperationInterfaceBox2 />

        <OperationInterfaceBox3 />
      </OperationInterface>

      <InformationArea>
        <InformationAreaBox>
          <InformationAreaTitle />

          <InformationAreaContent />
        </InformationAreaBox>
      </InformationArea>
    </RobotControlContainer>
  );
}

export default RobotControlDesktop;
