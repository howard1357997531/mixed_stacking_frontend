import React, { useState } from "react";
import {
  FortyRadioHeightBox,
  FortyRadioWidthButton,
  OperationInterButtonLogo,
  OperationInterButtonText,
  SixtyRadioWidthButton,
} from "../../../styles/RobotControlScreen";
import { orange } from "@mui/material/colors";
import { Colors } from "../../../styles/theme";
import OrderListDialog from "./OrderListDialog";

function OperationInterfaceBox1() {
  const [orderListDialogOpen, setOrderListDialogOpen] = useState(false);
  const onOrderListDialoggOpen = (state) => {
    setOrderListDialogOpen(state);
  };

  return (
    <FortyRadioHeightBox>
      <FortyRadioWidthButton
        onClick={() => setOrderListDialogOpen(true)}
        customColor={[Colors.lightOrange, orange[200]]}
      >
        <OperationInterButtonLogo>
          <img src="list.png" alt="list.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>工單</OperationInterButtonText>
      </FortyRadioWidthButton>

      <SixtyRadioWidthButton
        customColor={[Colors.darkPink, Colors.darkPinkHover]}
      >
        <OperationInterButtonLogo>
          <img src="visual.png" alt="visual.png"></img>
        </OperationInterButtonLogo>

        <OperationInterButtonText>視覺辨識</OperationInterButtonText>
      </SixtyRadioWidthButton>

      <OrderListDialog
        orderListDialogOpen={orderListDialogOpen}
        onOrderListDialoggOpen={onOrderListDialoggOpen}
      />
    </FortyRadioHeightBox>
  );
}

export default OperationInterfaceBox1;
