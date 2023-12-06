import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Colors } from "../../../styles/theme";
import LoadingCircle from "../../../tool/LoadingCircle";
import ErrorMsgBox from "../../../tool/ErrorMsgBox";
import {
  AvatarDivider,
  MultiOrderAvatar,
  MultiOrderAvatarBox,
  MultiOrderBox,
  MultiOrderCount,
  MultiOrderDeleteBtn,
  MultiOrderDetailBox,
  MultiOrderDetailSmBox,
  MultiOrderEachCount,
  MultiOrderInfo,
  MultiOrderName,
  MultiOrderTitle,
  MultiOrderTitleBox,
} from "../../../styles/OrderScreen/FunctionAreaContentMultipleOrder";
import { OrderListContentMsg } from "../../../styles/OrderScreen";
import "./css/FunctionAreaContentMultipleOrder.css";

function FunctionAreaContentMultipleOrder({ orderListData }) {
  const { loading, error, data, orderId } = useSelector(
    (state) => state.multipleOrderList
  );

  if (data.length !== 0) {
    var [multipleOrderData] = data.filter((order) => order.id === orderId);
    var multipleOrderArray = multipleOrderData.orderSelectId_str.split(",");
    const countArray = multipleOrderArray.map((order) =>
      order.includes("*") ? parseInt(order.split("*").at(1)) : 1
    );

    const indexArray = countArray.map((count, index) =>
      countArray.slice(0, index + 1).reduce((acc, cur) => acc + cur)
    );

    var parseIndex = (index) => (index === 0 ? 1 : indexArray[index - 1] + 1);
    var parseIndex2 = (index) => indexArray[index];
  }

  const parseId = (id) => {
    return parseInt(id.split("*").at(0));
  };

  const parseTimes = (times) => {
    return times.includes("*") ? parseInt(times.split("*").at(1)) : 1;
  };

  const parseName = (orderId) => {
    let [filterData] = orderListData.filter((order) => order.id === orderId);
    return filterData;
  };

  const parseCount = (orders) => {
    const count = orders
      .split(",")
      .map((order) =>
        order.includes("*") ? parseInt(order.split("*").at(1)) : 1
      );
    return count.reduce((acc, crr) => acc + crr);
  };

  return loading ? (
    <LoadingCircle />
  ) : error ? (
    <ErrorMsgBox />
  ) : data.length === 0 ? (
    <OrderListContentMsg variant="h5">尚無資料</OrderListContentMsg>
  ) : (
    <MultiOrderBox>
      {/* <MultiOrderTitleBox>
        <MultiOrderTitle variant="h5">{multipleOrderData.name}</MultiOrderTitle>
        <MultiOrderInfo>創建時間: {multipleOrderData.createdAt}</MultiOrderInfo>
      </MultiOrderTitleBox> */}

      <MultiOrderCount>
        數量: {parseCount(multipleOrderData.orderSelectId_str)}
        <MultiOrderDeleteBtn>刪除</MultiOrderDeleteBtn>
      </MultiOrderCount>

      <MultiOrderDetailBox className="multi-order">
        {multipleOrderArray.map((order, index) => (
          <MultiOrderDetailSmBox key={index} isFirst={index === 0}>
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

            <MultiOrderEachCount>{parseTimes(order)}</MultiOrderEachCount>
          </MultiOrderDetailSmBox>
        ))}
        {/* <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox>
        <MultiOrderDetailSmBox>12</MultiOrderDetailSmBox> */}
      </MultiOrderDetailBox>
    </MultiOrderBox>
  );
}

export default FunctionAreaContentMultipleOrder;
