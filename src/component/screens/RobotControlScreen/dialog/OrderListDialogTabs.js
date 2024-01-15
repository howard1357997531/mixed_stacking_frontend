import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderListDialogTabsSingleOrder from "./OrderListDialogTabsSingleOrder";
import OrderListDialogTabsMultipleOrder from "./OrderListDialogTabsMultipleOrder";
import { ThemeProvider, createTheme, styled } from "@mui/material";
import { Colors } from "../../../../styles/theme";

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

function OrderListDialogTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: `${Colors.greyTextBlood}`,
      },
    },
  });

  const StyleTab = styled(Tab)({
    color: Colors.greyTextBlood,
    fontWeight: 600,
    fontSize: "16px",
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ThemeProvider theme={theme}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyleTab label="工單" {...a11yProps(0)} />
            <StyleTab label="組合單" {...a11yProps(1)} />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OrderListDialogTabsSingleOrder {...props} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrderListDialogTabsMultipleOrder {...props} />
      </CustomTabPanel>
    </Box>
  );
}

export default OrderListDialogTabs;
