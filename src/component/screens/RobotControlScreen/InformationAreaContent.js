import React from "react";
import {
  InformationAreaContentBox,
  NoSelectOrderText,
} from "../../../styles/RobotControlScreen";

function InformationAreaContent() {
  return (
    <InformationAreaContentBox>
      <NoSelectOrderText>尚未選擇工單</NoSelectOrderText>
    </InformationAreaContentBox>
  );
}

export default InformationAreaContent;
