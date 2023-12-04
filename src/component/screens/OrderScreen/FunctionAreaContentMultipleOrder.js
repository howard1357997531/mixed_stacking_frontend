import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { Colors } from "../../../styles/theme";
import {
  MultipleOrderContentTitle,
  OrderListDetailBox,
  OrderListDetailSmallBox,
} from "../../../styles/OrderScreen";

function FunctionAreaContentMultipleOrder({ hasSelect }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { data: multipleOrderData, orderId: multipleOrderSelectId } =
    useSelector((state) => state.multipleOrderList);

  if (hasSelect) {
    var [qwe] = multipleOrderData.filter(
      (order) => order.id === multipleOrderSelectId
    );
  } else {
    var qwe = multipleOrderData[0];
  }

  const Title = () => {
    return (
      <>
        <MultipleOrderContentTitle variant="h5">
          {qwe.name}
        </MultipleOrderContentTitle>
        {/* <Typography align="right">
          工單數量: {qwe.orderSelectId_str.split(",").length}
        </Typography> */}

        <Typography marginBottom={1} align="right" color={Colors.greyText}>
          創建時間: {qwe.createdAt}
        </Typography>
      </>
    );
  };

  return !hasSelect ? (
    <>
      <Title />
      {multipleOrderData[0].multipleOrder.map((mutiOrder) => (
        <>
          <Accordion
            key={mutiOrder.order.id}
            expanded={expanded === `panel${mutiOrder.order.id}`}
            onChange={handleChange(`panel${mutiOrder.order.id}`)}
            sx={{
              backgroundColor: Colors.brown,
              borderRadius: "0px !important",
              marginBottom: "3px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${mutiOrder.order.id}bh-content`}
              id={`panel${mutiOrder.order.id}bh-header`}
            >
              <Typography sx={{ margin: "0 auto" }}>
                {mutiOrder.order.name}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                backgroundColor: Colors.grey,
                padding: 0,
              }}
            >
              <OrderListDetailBox isTitle={true}>
                <OrderListDetailSmallBox>名稱</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>寬度</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>長度</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>高度</OrderListDetailSmallBox>
                <OrderListDetailSmallBox>數量</OrderListDetailSmallBox>
              </OrderListDetailBox>

              {mutiOrder.order.orderItem.map((order, index) => (
                <OrderListDetailBox key={index} isTitle={false}>
                  <OrderListDetailSmallBox>
                    {order.name}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.width}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.height}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.depth}
                  </OrderListDetailSmallBox>
                  <OrderListDetailSmallBox>
                    {order.quantity}
                  </OrderListDetailSmallBox>
                </OrderListDetailBox>
              ))}
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  ) : (
    <>
      <Title />
      {multipleOrderData.map((mutiOrderData) =>
        mutiOrderData.id === multipleOrderSelectId
          ? mutiOrderData.multipleOrder.map((mutiOrder) => (
              <>
                <Accordion
                  key={mutiOrder.order.id}
                  expanded={expanded === `panel${mutiOrder.order.id}`}
                  onChange={handleChange(`panel${mutiOrder.order.id}`)}
                  sx={{
                    backgroundColor: Colors.brown,
                    borderRadius: "0px !important",
                    marginBottom: "3px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${mutiOrder.order.id}bh-content`}
                    id={`panel${mutiOrder.order.id}bh-header`}
                  >
                    <Typography sx={{ margin: "0 auto" }}>
                      {mutiOrder.order.name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{ backgroundColor: Colors.grey, padding: 0 }}
                  >
                    <OrderListDetailBox isTitle={true}>
                      <OrderListDetailSmallBox>名稱</OrderListDetailSmallBox>
                      <OrderListDetailSmallBox>寬度</OrderListDetailSmallBox>
                      <OrderListDetailSmallBox>長度</OrderListDetailSmallBox>
                      <OrderListDetailSmallBox>高度</OrderListDetailSmallBox>
                      <OrderListDetailSmallBox>數量</OrderListDetailSmallBox>
                    </OrderListDetailBox>

                    {mutiOrder.order.orderItem.map((order, index) => (
                      <OrderListDetailBox key={index} isTitle={false}>
                        <OrderListDetailSmallBox>
                          {order.name}
                        </OrderListDetailSmallBox>
                        <OrderListDetailSmallBox>
                          {order.width}
                        </OrderListDetailSmallBox>
                        <OrderListDetailSmallBox>
                          {order.height}
                        </OrderListDetailSmallBox>
                        <OrderListDetailSmallBox>
                          {order.depth}
                        </OrderListDetailSmallBox>
                        <OrderListDetailSmallBox>
                          {order.quantity}
                        </OrderListDetailSmallBox>
                      </OrderListDetailBox>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </>
            ))
          : null
      )}
    </>
  );
}

export default FunctionAreaContentMultipleOrder;
