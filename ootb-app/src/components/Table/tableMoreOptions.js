import React, { useState, useEffect } from "react";
import tableSettingsIcon from "../../assets/tableSettingIcon.svg";
import tableDensityIcon from "../../assets/compress.svg";
import TableSettings from "./tableSettings";
// import UnfoldLessDoubleIcon from "@mui/icons-material/UnfoldLessDouble";
// import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";

import { Button } from "../Button";
export default function TableMoreOptions({
  showMenu,
  extraButtons,
  hideRowHeightOptionMenu,
  onRowHeightChange,
  rowHeight,
  isGroupRows,
  actualRef,
  Columns,
  handleMenuClick,
  tableFontSize,
  setTableFontSize,
  onNumberFormatChange,
  colDefs,
  setShowMenu,
  showTableSetting,
  setShowTableSetting,
  setTableSettingOpen,
  showHideEditableCells,
  handleShowHideEditableCells,
  tableActions,
  onTableActionsTabClick,
  showFilterStrip,
  hideTableFormat,
  hideTableActions,
  explicitlyCloseTableSetting,
}) {
  const [showDensityMenu, setShowDensityMenu] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [showEditableCells, setShowEditableCells] = useState(false);

  const handleDensityMenuOpen = (e) => {
    e.stopPropagation();
    setShowDensityMenu(!showDensityMenu);
  };

  const handleDensityMenuClose = () => {
    setShowDensityMenu(false);
  };

  const handleTableSettingClick = () => {
    setShowTableSetting(true);
    setTableSettingOpen(true);
  };

  const handleClickOutside = (e) => {
    if (showDensityMenu && !e.target.closest(".density-menu-container")) {
      setShowDensityMenu(false);
      setTableSettingOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDensityMenu]);

  const handleChange = () => {
    if (isExpand) {
      actualRef.current.api.collapseAll();
      setIsExpand(false);
    } else {
      actualRef.current.api.expandAll();
      setIsExpand(true);
    }
  };

  useEffect(() => {
    setShowDensityMenu(false);
    setShowMenu(false);
  }, [explicitlyCloseTableSetting]);

  useEffect(() => {
    if (actualRef?.current?.api?.getModel()) {
      actualRef.current.api.getModel().isTableSettingOpen = showTableSetting;
    }
  }, [showTableSetting]);

  return (
    <>
      {!showTableSetting && (
        <div
          className={`table-more-options-container ${
            showMenu ? "display-table-more-options" : ""
          }`}
        >
          {extraButtons}
          {extraButtons ? <div className="horizontal-line" /> : null}
          <div className="table-option-footer-wrapper">
            <div
              className={`table-settings-container ${
                !extraButtons
                  ? "table-settings-container-without-extra-buttons"
                  : ""
              }`}
              onClick={handleTableSettingClick}
            >
              <img src={tableSettingsIcon} alt="tableOptionButtonIcon" />
              <span className="table-settings-text">Table Settings</span>
            </div>
            {!hideRowHeightOptionMenu && (
              <div className="density-menu-wrapper">
                <div
                  className={`table-settings-container table-density-container ${
                    showDensityMenu ? "density-menu-open" : ""
                  }`}
                  onClick={handleDensityMenuOpen}
                >
                  <span className="table-settings-text">Content density</span>
                </div>
                {showDensityMenu && (
                  <div className="density-menu-container">
                    <div
                      className={`density-menu-item default_menu ${
                        rowHeight === 46 ? "selected" : ""
                      }`}
                      onClick={() => {
                        onRowHeightChange(46);
                        handleDensityMenuClose();
                      }}
                    >
                      <span className="density-menu-item-text">Default</span>
                    </div>
                    <div
                      className={`density-menu-item compact_menu ${
                        rowHeight === 30 ? "selected" : ""
                      }`}
                      onClick={() => {
                        onRowHeightChange(30);
                        handleDensityMenuClose();
                      }}
                    >
                      <span className="density-menu-item-text">Compact</span>
                    </div>
                    <div
                      className={`density-menu-item comfort_menu ${
                        rowHeight === 52 ? "selected" : ""
                      }`}
                      onClick={() => {
                        onRowHeightChange(52);
                        handleDensityMenuClose();
                      }}
                    >
                      <span className="density-menu-item-text">Comfort</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {showHideEditableCells ? (
              <div className="show-hide-editable-cells-container">
                <Button
                  data-icon="show-hide-editable-cells"
                  data-type="table-icon"
                  variant="secondary"
                  onClick={() => {
                    setShowEditableCells(!showEditableCells);
                    handleShowHideEditableCells();
                  }}
                  className={
                    showEditableCells
                      ? "show-editable-cells-icon"
                      : "hide-editable-cells-icon"
                  }
                >
                  {!showEditableCells
                    ? "Hide editable cells"
                    : "Show editable cells"}
                </Button>
              </div>
            ) : null}
            {isGroupRows ? (
              <div className="group-row-container">
                <Button
                  data-icon="unfold-row-group"
                  data-type="table-icon"
                  variant="secondary"
                  // icon={!isExpand ? <CollapseIcon /> : <ExpandIcon />}
                  onClick={handleChange}
                  className={isExpand ? "expand-icon" : "collapse-icon"}
                >
                  {!isExpand ? "Expand all rows" : "Collapse all rows"}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div
        className={`${
          showTableSetting ? "show-table-settings" : ""
        } table-settings-wrapper`}
      >
        <TableSettings
          showTableSetting={showTableSetting}
          Columns={Columns}
          actualRef={actualRef}
          handleMenuClick={handleMenuClick}
          tableFontSize={tableFontSize}
          setTableFontSize={setTableFontSize}
          onNumberFormatChange={onNumberFormatChange}
          colDefs={colDefs}
          setShowMenu={setShowMenu}
          setShowTableSetting={setShowTableSetting}
          showMenu={showMenu}
          setTableSettingOpen={setTableSettingOpen}
          tableActions={tableActions}
          onTableActionsTabClick={onTableActionsTabClick}
          showFilterStrip={showFilterStrip}
          hideTableFormat={hideTableFormat}
          hideTableActions={hideTableActions}
        />
      </div>
    </>
  );
}
