import React from "react";
import {
  DeleteBox,
  DeleteCount,
  DeleteResetBtn,
  DeleteSelectBox,
  DeleteSelectSmBox,
  DeleteOrderName,
  DeleteTitle,
} from "../../../styles/OrderScreen/FunctionAreaContentDelete";
import { OrderListExeListDelete } from "../../../styles/RobotControlScreen/dialog";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import { ORDER_SCREEN } from "../../../redux/constants";
import { orderDeleteSelectAction } from "../../../redux/actions/OrderScreenAction";
import { Colors } from "../../../styles/theme";

function FunctionAreaContentDelete({ orderListData }) {
  const dispatch = useDispatch();
  const { deleteIdArray } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const deleteHandler = (id) => {
    dispatch(orderDeleteSelectAction(parseInt(id)));
  };
  return deleteIdArray.length === 0 ? (
    <CenterText text={"尚未選擇"} />
  ) : (
    <DeleteBox>
      <DeleteTitle>
        <DeleteCount>數量: {deleteIdArray.length}</DeleteCount>
      </DeleteTitle>

      <DeleteSelectBox className="multi-create-select-box">
        {deleteIdArray.map((order, index) => (
          <DeleteSelectSmBox key={index} isFirst={index === 0}>
            <DeleteOrderName>{Object.values(order).at(0)}</DeleteOrderName>

            <OrderListExeListDelete
              sx={{ color: Colors.red }}
              onClick={() => deleteHandler(Object.keys(order).at(0))}
            />
          </DeleteSelectSmBox>
        ))}
      </DeleteSelectBox>
    </DeleteBox>
  );
}

export default FunctionAreaContentDelete;
