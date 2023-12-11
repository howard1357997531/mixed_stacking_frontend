import React from "react";
import {
  DeleteBox,
  DeleteCount,
  DeleteResetBtn,
  DeleteSelectBox,
  DeleteSelectSmBox,
  DeleteOrderName,
} from "../../../styles/OrderScreen/FunctionAreaContentDelete";
import { OrderListExeListDelete } from "../../../styles/RobotControlScreen/dialog";
import { useDispatch, useSelector } from "react-redux";
import CenterText from "../../../tool/CenterText";
import { ORDER_SCREEN } from "../../../redux/constants";
import { orderDeleteSelectAction } from "../../../redux/actions/OrderScreenAction";

function FunctionAreaContentDelete({ orderListData }) {
  const dispatch = useDispatch();
  const { delete: deleteOrder } = useSelector(
    (state) => state.orderScreen_orderSelect
  );

  const parseName = (id) => {
    const [data] = orderListData.filter((order) => order.id === id);
    return data.name;
  };
  const resetHandler = () => {
    dispatch({ type: ORDER_SCREEN.orderSelectData, payload: { delete: [] } });
  };

  const deleteHandler = (id) => {
    dispatch(orderDeleteSelectAction(id, deleteOrder));
  };
  return deleteOrder.length === 0 ? (
    <CenterText text={"尚未選擇"} />
  ) : (
    <DeleteBox>
      <DeleteCount>
        數量: {deleteOrder.length}
        <DeleteResetBtn onClick={resetHandler}>重置</DeleteResetBtn>
      </DeleteCount>

      <DeleteSelectBox className="multi-create-select-box">
        {deleteOrder.map((id, index) => (
          <DeleteSelectSmBox key={index}>
            <DeleteOrderName>{parseName(id)}</DeleteOrderName>

            <OrderListExeListDelete onClick={() => deleteHandler(id)} />
          </DeleteSelectSmBox>
        ))}
      </DeleteSelectBox>
    </DeleteBox>
  );
}

export default FunctionAreaContentDelete;
