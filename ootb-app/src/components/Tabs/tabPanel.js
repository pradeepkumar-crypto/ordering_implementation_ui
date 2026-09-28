import React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export const CustomTabPanel = (props) => {
  const {
    children,
    value,
    selectedValue,
    index,
    remountOnTabChange,
    ...other
  } = props;

  return (
    <div
      className="ia-styles ia-tabPanel"
      role="tabpanel"
      hidden={value !== selectedValue}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {remountOnTabChange ? (
        value === selectedValue && <Box>{children}</Box>
      ) : (
        <Box>{children}</Box>
      )}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  value: PropTypes.string,
  selectedValue: PropTypes.string,
  index: PropTypes.number,
};
