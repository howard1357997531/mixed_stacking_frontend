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
import InformationAreaBottom from "./InformationAreaBottom";
import "./css/OperationInterface.css";

function RobotControlDesktop(props) {
  return (
    <RobotControlContainer>
      <OperationInterface className="operation-interface">
        <OperationInterfaceBox1 {...props} />

        <OperationInterfaceBox2 />

        <OperationInterfaceBox3 {...props} />
      </OperationInterface>

      <InformationArea>
        <InformationAreaBox>
          <InformationAreaTitle {...props} />

          <InformationAreaContent {...props} />

          {/* <InformationAreaBottom {...props} /> */}
        </InformationAreaBox>
      </InformationArea>
    </RobotControlContainer>
  );
}

export default RobotControlDesktop;
