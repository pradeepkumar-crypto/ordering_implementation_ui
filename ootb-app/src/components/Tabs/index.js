import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import MUITabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CustomTabPanel } from "./tabPanel";

import "./Tabs.styles.scss";

export const Tabs = ({
  tabPanels,
  tabNames,
  value,
  onChange,
  orientation = "horizontal",
  isDisabled,
  tabPanelStyle,
  remountOnTabChange = true,
  ...args
}) => {
  const tabClassName = useMemo(() => {
    let retVal = "ia-styles ia-tab";
    return retVal;
  }, [tabNames]);

  const tabListClassName = useMemo(() => {
    let retVal = "ia-styles ia-tabList";

    // if (orientation === "horizontal") retVal;

    return retVal;
  }, [tabPanels]);

  const containerClassName = useMemo(() => {
    let retVal = "ia-styles ia-tabContainer";

    if (orientation === "vertical") retVal += " ia-tabs-vertical";
    else retVal += " ia-tabs-horizontal";

    return retVal;
  }, [orientation]);

  return (
    <div className={containerClassName}>
      <Box>
        <MUITabs
          onChange={onChange}
          value={value}
          className={tabListClassName}
          orientation={orientation}
          {...args}
        >
          {tabNames.map((tab, idx) => {
            return (
              <Tab
                disableRipple
                {...tab}
                key={tab.value}
                disabled={tab.disabled || isDisabled}
                className={
                  tabClassName + (idx === value ? " ia-activeTabHeader" : "")
                }
              />
            );
          })}
        </MUITabs>
      </Box>
      <div className="impact-tab-panel" style={tabPanelStyle}>
        {tabPanels.map((tab, idx) =>
          tab ? (
            <CustomTabPanel
              selectedValue={value}
              value={tabNames[idx].value}
              index={idx}
              key={tabNames[idx].value}
              remountOnTabChange={remountOnTabChange}
            >
              {tab}
            </CustomTabPanel>
          ) : null,
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabPanels: PropTypes.arrayOf(PropTypes.node),
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  //orientation: PropTypes.string,
};
