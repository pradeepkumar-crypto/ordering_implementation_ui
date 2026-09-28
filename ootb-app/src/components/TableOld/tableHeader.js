import React, { useEffect, useState, useMemo } from "react";
import { Button } from "../Button";
import TableMoreOptions from "../Table/tableMoreOptions";
import { Tooltip } from "../Tooltip";

export default function TableHeader({
  actualRef,
  colDefs,
  Columns,
  tableFontSize,
  setTableFontSize,
  rowHeight,
  setRowHeight,
  tableHeader,
  topRightOptions,
  topLeftOptions,
  onGlobalSearchClick,
  cardContainer,
  onNumberFormatChange,
  hideRowHeightOptionMenu,
  showDownloadButton,
  onDownloadButtonClick,
  closeButton,
  handleCloseButtonClick,
  additionalButtons,
  setTableSettingOpen,
  showHideEditableCells,
  handleShowHideEditableCells,
  topCenterOptions,
  tableActions,
  onTableActionsTabClick,
  hideTableFormat,
  hideTableActions,
  hideTableSetting,
  explicitlyCloseTableSetting,
}) {
  // manages displaying table setting
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const rowHeightMenuOpen = Boolean(anchorEl);
  const handleWidthButtonClick = (event) => setAnchorEl(event.currentTarget);
  const handleWidthButtonClose = () => setAnchorEl(null);
  const [showTableSetting, setShowTableSetting] = useState(false);

  const onRowHeightChange = (val) => {
    setRowHeight(val);
    setTimeout(() => {
      actualRef?.current?.api?.resetRowHeights();
    }, 0);
    handleWidthButtonClose();
  };

  const handleMenuClose = () => {
    setSelectedMenuTab("Columns");
  };

  const handleMenuClick = (e) => {
    document.body.style.overflowX = "hidden";
    e.stopPropagation();
    setShowMenu((prev) => !prev);
    setShowTableSetting(false);
    setTableSettingOpen(false);
    setTimeout(() => {
      document.body.style.overflowX = "unset";
    }, 200);
  };

  const isGroupRows = useMemo(() => {
    const hasGroupRows = (cols) =>
      cols.some(
        (col) => col.rowGroup || (col.children && hasGroupRows(col.children))
      );
    return hasGroupRows(colDefs);
  }, [colDefs]);

  const handleClickOutside = (event) => {
    if (
      showMenu &&
      !showTableSetting &&
      !event.target.closest(".table-more-options-container")
    ) {
      setShowMenu(false);
    }
    if (
      showTableSetting &&
      !event.target.closest(".table-setting-main-container") &&
      !event.target.closest(".table-more-options-container")
    ) {
      setShowTableSetting(false);
      setShowMenu(false);
      setTableSettingOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu, showTableSetting]);

  return (
    <div
      className="impact-table-main-header"
      style={{
        // width: showMenu ? "calc(100% - 285px)" : null,
        padding: "0 16px", //cardContainer ? "0 16px" : "0px 16px 0 0",
      }}
    >
      <div className="impact-table-main-header-left">
        <div className="table-heading">{tableHeader}</div>
        {topLeftOptions}
      </div>
      <div className="impact-table-center-cta-container">
        {topCenterOptions}
      </div>
      <div className="right-table-cta-container">
        {topRightOptions}
        {onGlobalSearchClick ? (
          <Button
            data-icon="table-search"
            data-type="table-icon"
            variant="secondary"
            onClick={onGlobalSearchClick}
          />
        ) : null}
        {topRightOptions && <div className="divider-line" />}
        {showDownloadButton && (
          <Tooltip title="Download" variant="tertiary">
            <Button
              data-icon="download"
              data-type="table-icon"
              variant="secondary"
              onClick={onDownloadButtonClick}
            />
          </Tooltip>
        )}
        {!hideTableSetting && (
          <Tooltip title="More" variant="tertiary">
            <Button
              data-icon="table-settings"
              data-type="table-icon"
              variant="text"
              onClick={handleMenuClick}
            />
          </Tooltip>
        )}
        {closeButton && (
          <>
            <div className="divider-line" />
            <Button
              data-icon="close"
              data-type="table-icon"
              variant="url"
              onClick={handleCloseButtonClick}
            />
          </>
        )}
        <TableMoreOptions
          showMenu={showMenu}
          extraButtons={additionalButtons}
          hideRowHeightOptionMenu={hideRowHeightOptionMenu}
          setShowTableSetting={setShowTableSetting}
          onRowHeightChange={onRowHeightChange}
          rowHeight={rowHeight}
          setRowHeight={setRowHeight}
          isGroupRows={isGroupRows}
          actualRef={actualRef}
          Columns={Columns}
          handleMenuClick={handleMenuClick}
          tableFontSize={tableFontSize}
          setTableFontSize={setTableFontSize}
          onNumberFormatChange={onNumberFormatChange}
          colDefs={colDefs}
          setShowMenu={setShowMenu}
          showTableSetting={showTableSetting}
          setTableSettingOpen={setTableSettingOpen}
          showHideEditableCells={showHideEditableCells}
          handleShowHideEditableCells={handleShowHideEditableCells}
          tableActions={tableActions}
          onTableActionsTabClick={onTableActionsTabClick}
          hideTableFormat={hideTableFormat}
          hideTableActions={hideTableActions}
          explicitlyCloseTableSetting={explicitlyCloseTableSetting}
        />
      </div>
    </div>
  );
}
