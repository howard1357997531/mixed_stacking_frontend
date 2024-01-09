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

  const parseName = (id) => {
    const [data] = orderListData.filter((order) => order.id === id);
    return data.name;
  };
  const resetHandler = () => {
    dispatch({
      type: ORDER_SCREEN.orderSelect,
      payload: { deleteIdArray: [] },
    });
  };

  const deleteHandler = (id) => {
    dispatch(orderDeleteSelectAction(id, deleteIdArray));
  };
  return deleteIdArray.length === 0 ? (
    <CenterText text={"尚未選擇"} />
  ) : (
    <DeleteBox>
      <DeleteTitle>
        <DeleteCount>數量: {deleteIdArray.length}</DeleteCount>
        <DeleteResetBtn onClick={resetHandler}>重置</DeleteResetBtn>
      </DeleteTitle>

      <DeleteSelectBox className="function-order-box">
        {deleteIdArray.map((id, index) => (
          <DeleteSelectSmBox key={index} isFirst={index === 0}>
            <DeleteOrderName>{parseName(id)}</DeleteOrderName>

            <OrderListExeListDelete
              sx={{ color: Colors.grey600 }}
              onClick={() => deleteHandler(id)}
            />
          </DeleteSelectSmBox>
        ))}
      </DeleteSelectBox>
    </DeleteBox>
  );
}

export default FunctionAreaContentDelete;
