import React, { useEffect, useState } from "react";
import { Tabs } from "../Tabs";
import { Button } from "../Button";
import { RadioButtonGroup } from "../RadioButtonGroup";
import { TableColsIcon, TableFormatIcon } from "./tableIcons";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";

export default function TableSettings({
  showMenu,
  Columns,
  actualRef,
  tableFontSize,
  setTableFontSize,
  handleMenuClick,
  onNumberFormatChange,
  colDefs,
  setShowMenu,
  showTableSetting,
  setShowTableSetting,
  setTableSettingOpen,
  tableActions,
  onTableActionsTabClick,
  showFilterStrip,
  hideTableFormat,
  hideTableActions,
}) {
  const [selectedMenuTab, setSelectedMenuTab] = useState("Columns");

  const [numericFormat, setNumericFormat] = useState("full_no");
  const onFontSizeChange = (val) => {
    setTableFontSize(val);
  };

  const onNumericFormatChange = (val) => {
    setNumericFormat(val);
    onNumberFormatChange(val);
  };
  //style={{ display: showMenu ? "block" : "none" }}

  const tabPanels = [
    <Columns ref={actualRef} column={colDefs} showMenu={showMenu} />,
    !hideTableFormat && (
      <TableFormat
        tableFontSize={tableFontSize}
        onFontSizeChange={onFontSizeChange}
        numericFormat={numericFormat}
        onNumericFormatChange={onNumericFormatChange}
      />
    ),
    !hideTableActions && <TableActions tableActions={tableActions} />,
  ].filter(Boolean);

  const tabNames = [
    {
      label: selectedMenuTab === "Columns" ? "Columns" : "",
      value: "Columns",
      icon: <ViewColumnOutlinedIcon fontSize="small" />,
    },
    !hideTableFormat && {
      label: selectedMenuTab === "Format" ? "Format" : "",
      value: "Format",
      icon: <FormatColorTextOutlinedIcon fontSize="small" />,
    },
    !hideTableActions && {
      label: selectedMenuTab === "Actions" ? "Actions" : "",
      value: "Actions",
      icon: <AutoFixHighIcon />,
    },
  ].filter(Boolean);

  return (
    <div
      className={`table-setting-main-container ${
        showTableSetting ? "display-table-setting" : ""
      } ${showFilterStrip ? "filters-strip-visible" : ""}`}
    >
      <div className="table-setting-header">
        <h2>Table Settings</h2>
        <span
          role="button"
          className="close_icon"
          onClick={(e) => {
            setSelectedMenuTab("Columns");
            setShowMenu(false);
            setShowTableSetting(false);
            setTableSettingOpen(false);
          }}
        />
      </div>
      <Tabs
        value={selectedMenuTab}
        onChange={(_event, val) => {
          setSelectedMenuTab(val);
          if (val === "Actions") {
            onTableActionsTabClick();
          }
        }}
        tabPanels={tabPanels}
        tabNames={tabNames}
        remountOnTabChange={false}
      />
    </div>
  );
}

const TableFormat = ({
  tableFontSize,
  onFontSizeChange,
  numericFormat,
  onNumericFormatChange,
}) => {
  return (
    <div className="table-setting-format-settings">
      <div className="table-setting-font-size-setting-container">
        <h3 className="custom-menu-sub-header">Font size</h3>
        <RadioButtonGroup
          value={tableFontSize}
          onChange={(_e, val) => {
            onFontSizeChange(val);
          }}
          options={[
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium (default)",
              value: "medium",
            },
            {
              label: "Large",
              value: "large",
            },
          ]}
          selectedOption="medium"
        />
      </div>
      <div className="table-setting-number-format-setting-container">
        <h3 className="custom-menu-sub-header">Numeric Values</h3>
        <RadioButtonGroup
          value={numericFormat}
          onChange={(_e, val) => {
            onNumericFormatChange(val);
          }}
          options={[
            {
              label: "Full Number",
              value: "full_no",
            },
            {
              label: "In K (Thousands)",
              value: "thou",
            },
            {
              label: "In M (Millions)",
              value: "mil",
            },
            {
              label: "In B (Billions)",
              value: "bil",
            },
          ]}
          selectedOption="full_no"
        />
      </div>
    </div>
  );
};

const TableActions = ({ tableActions }) => {
  return (
    <div className="table-setting-action-settings">
      <div className="table-setting-action-container">{tableActions}</div>
    </div>
  );
};
