import React, { useState } from "react";
import { Tabs } from "../Tabs";
import { Button } from "../Button";
import { RadioButtonGroup } from "../RadioButtonGroup";
import { TableColsIcon, TableFormatIcon } from "./tableIcons";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function TableSettings({
  showMenu,
  Columns,
  actualRef,
  tableFontSize,
  setTableFontSize,
  handleMenuClick,
  onNumberFormatChange,
  colDefs,
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
  return (
    <div
      className={`table-setting-main-container ${
        showMenu ? "display-table-setting" : ""
      }`}
    >
      <div className="table-setting-header">
        <h2>Table Settings</h2>
        <span
          role="button"
          className="close_icon"
          onClick={() => {
            handleMenuClick();
            setSelectedMenuTab("Columns");
          }}
        />
      </div>
      <Tabs
        value={selectedMenuTab}
        onChange={(_event, val) => {
          setSelectedMenuTab(val);
        }}
        tabPanels={[
          <Columns ref={actualRef} column={colDefs} />,
          <TableFormat
            tableFontSize={tableFontSize}
            onFontSizeChange={onFontSizeChange}
            numericFormat={numericFormat}
            onNumericFormatChange={onNumericFormatChange}
          />,
          <TableActions />,
        ]}
        tabNames={[
          {
            label: selectedMenuTab === "Columns" ? "Columns" : "",
            value: "Columns",
            icon: <TableColsIcon />,
          },
          {
            label: selectedMenuTab === "Format" ? "Format" : "",
            value: "Format",
            icon: <TableFormatIcon />,
          },
          {
            label: selectedMenuTab === "Actions" ? "Actions" : "",
            value: "Actions",
            icon: <AutoFixHighIcon />,
          },
        ]}
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
      <div className="table-setting-columns-separator" />
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

const TableActions = () => {
  return (
    <div className="table-setting-action-settings">
      <div className="table-setting-columns-separator" />
      <div className="table-setting-action-container">
        <Button
          className=""
          iconPlacement="left"
          onClick={() => {}}
          size="large"
          variant="primary"
        >
          Table Actions
        </Button>
      </div>
    </div>
  );
};
