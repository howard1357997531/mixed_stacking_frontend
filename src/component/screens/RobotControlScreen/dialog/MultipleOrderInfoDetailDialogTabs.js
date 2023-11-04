import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MultipleOrderInfoDetailDialogTabsOriginal from "./MultipleOrderInfoDetailDialogTabsOriginal";
import MultipleOrderInfoDetailDialogTabsAiResult from "./MultipleOrderInfoDetailDialogTabsAiResult";
import { useSelector } from "react-redux";

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

function MultipleOrderInfoDetailDialogTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data } = useSelector(
    (state) => state.robotControlScreen_multipleOrderSelect
  );

  const { multipleOrderId } = useSelector(
    (state) => state.robotControlScreen_informationArea
  );

  if (multipleOrderId) {
    var [multipleOrderData] = data.multipleOrder.filter(
      (order) => order.order.id === multipleOrderId
    );
  }

  const addProps = { ...props, data, multipleOrderId, multipleOrderData };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="原始工單" {...a11yProps(0)} />
          <Tab label="演算結果" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MultipleOrderInfoDetailDialogTabsOriginal {...addProps} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MultipleOrderInfoDetailDialogTabsAiResult {...addProps} />
      </CustomTabPanel>
    </Box>
  );
}

export default MultipleOrderInfoDetailDialogTabs;
