import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import OrderDetailDialogTabsOriginal from "./OrderDetailDialogTabsOriginal";
import OrderDetailDialogTabsAiResult from "./OrderDetailDialogTabsAiResult";
import { ThemeProvider, createTheme, styled } from "@mui/material";
import { Colors } from "../../../styles/theme";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function OrderDetailDialogTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: orderData } = useSelector((state) => state.orderList);

  const { data: multiOrder } = useSelector((state) => state.multipleOrderList);

  const { allData } = useSelector(
    (state) => state.robotControlScreen_robotExecutionList
  );

  const { orderId, multiOrderId } = useSelector((state) => state.dialog);

  if (props.source === "order") {
    var [orderSelectData] = orderData.filter((order) => order.id === orderId);
  } else if (props.source === "multiOrder") {
    var [orderSelectData] = multiOrder.filter(
      (order) => order.id === multiOrderId
    );
  } else if (props.source === "executeOrder") {
    const [allDataTemp] = allData.filter((order) => order.id === orderId);
    var orderSelectData = allDataTemp;
  }

  const addProps = { ...props, orderId, orderSelectData };

  const theme2 = createTheme({
    palette: {
      primary: {
        main: `${Colors.greyTextBlood}`,
      },
    },
  });

  const StyleTab = styled(Tab)(({ theme }) => ({
    color: Colors.greyTextBlood,
    fontWeight: 600,
    fontSize: "16px",
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ThemeProvider theme={theme2}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyleTab label="原始工單" {...a11yProps(0)} />
            <StyleTab label="演算結果" {...a11yProps(1)} />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OrderDetailDialogTabsOriginal {...addProps} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrderDetailDialogTabsAiResult {...addProps} />
      </CustomTabPanel>
    </Box>
  );
}

export default OrderDetailDialogTabs;
