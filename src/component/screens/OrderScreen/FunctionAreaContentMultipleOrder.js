import { useDispatch, useSelector } from "react-redux";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import {
  AvatarDivider,
  MultiOrderAvatar,
  MultiOrderAvatarBox,
  MultiOrderBox,
  MultiOrderDetailBox,
  MultiOrderDetailSmBox,
  MultiOrderEachCount,
  MultiOrderName,
} from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrder";
import { OrderListContentMsg } from "../../../styles/OrderScreen";
import { multipleOrderDeleteAction } from "../../../redux/actions/OrderScreenAction";
import OrderDetailDialog from "../../dialog/orderDetail/OrderDetailDialog";
import { useState } from "react";
import { DIALOG } from "../../../redux/constants";
import "./css/FunctionAreaContentMultipleOrder.css";
import {
  DescText,
  DescTextBox,
} from "../../../styles/OrderScreen/FunctionAreaContentOrder";

function FunctionAreaContentMultipleOrder({ orderListData }) {
  const dispatch = useDispatch();
  const { loading, error, data, orderId } = useSelector(
    (state) => state.multipleOrderList
  );

  if (data.length !== 0 && orderId) {
    var [multipleOrderData] = data.filter((order) => order.id === orderId);
    var multipleOrderArray = multipleOrderData.orderSelectId_str.split(",");
    var modifiyText =
      multipleOrderData.modifiedAt === multipleOrderData.createdAt
        ? "尚未修改過"
        : multipleOrderData.modifiedAt;

    const countArray = multipleOrderArray.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );

    const indexArray = countArray.map((count, index) =>
      countArray.slice(0, index + 1).reduce((acc, cur) => acc + cur)
    );

    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }

  const parseId = (order) => {
    return parseInt(order.split("*").at(0));
  };

  const parseTimes = (times) => {
    return times.includes("*") ? parseInt(times.split("*").at(1)) : 1;
  };

  const parseName = (id) => {
    let [filterData] = multipleOrderData.multipleOrder.filter(
      (order) => order.order.id === id
    );
    return filterData.order;
  };

  const parseCount = (orders) => {
    const count = orders
      .split(",")
      .map((order) =>
        order.includes("*") ? parseInt(order.split("*").at(1)) : 1
      );
    return count.reduce((acc, crr) => acc + crr);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const orderDetailHandler = (orderId) => {
    dispatch({ type: DIALOG.order, payload: { orderId } });
    setOpenDialog(true);
  };

  const deleteHandler = () => {
    dispatch(multipleOrderDeleteAction(orderId));
  };

  return loading ? (
    <LoadingCircle />
  ) : error ? (
    <ErrorMsgBox />
  ) : data.length === 0 ? (
    <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
  ) : !orderId ? (
    <OrderListContentMsg variant="h5">已刪除資料</OrderListContentMsg>
  ) : (
    <MultiOrderBox>
      {/* <MultiOrderTitleBox>
        <MultiOrderTitle>{multipleOrderData.name}</MultiOrderTitle>
        <MultiOrderInfo>創建時間: {multipleOrderData.createdAt}</MultiOrderInfo>
      </MultiOrderTitleBox> */}

      {/* <MultiOrderCount>
        數量: {parseCount(multipleOrderData.orderSelectId_str)}
        <MultiOrderDeleteBtn onClick={deleteHandler} />
      </MultiOrderCount> */}

      <DescText>
        總數量 : {parseCount(multipleOrderData.orderSelectId_str)}
      </DescText>
      <DescText>修改日期 : {modifiyText}</DescText>
      <DescText>上傳日期 : {multipleOrderData.createdAt}</DescText>

      <DescTextBox>
        <DescText isTitle={true}>詳細資訊</DescText>
      </DescTextBox>

      <MultiOrderDetailBox className="multi-order">
        {multipleOrderArray.map((order, index) => (
          <MultiOrderDetailSmBox
            key={index}
            isFirst={index === 0}
            onClick={() => orderDetailHandler(parseId(order))}
          >
            <MultiOrderAvatarBox>
              <MultiOrderAvatar>{parseIndex(index)}</MultiOrderAvatar>
              {order.includes("*") ? (
                <>
                  <AvatarDivider />
                  <MultiOrderAvatar>{parseIndex2(index)}</MultiOrderAvatar>
                </>
              ) : null}
            </MultiOrderAvatarBox>

            <MultiOrderName>{parseName(parseId(order)).name}</MultiOrderName>

            <MultiOrderEachCount>{parseTimes(order)}個</MultiOrderEachCount>
          </MultiOrderDetailSmBox>
        ))}
      </MultiOrderDetailBox>

      <OrderDetailDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        source={"multiOrder"}
      />
    </MultiOrderBox>
  );
}

export default FunctionAreaContentMultipleOrder;
