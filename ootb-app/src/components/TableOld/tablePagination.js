import React, { useState } from "react";
import { Button } from "../Button";
import { Menu } from "../Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";

export default function TablePagination({
  actualRef,
  localPageSize,
  setLocalPageSize,
  paginationPageSizeSelector,
  buttonRef,
}) {
  const [paginationOptionsAnchorEl, setPaginationOptionsAnchorEl] =
    useState(null);
  const paginationOptionsOpen = Boolean(paginationOptionsAnchorEl);

  const handlePageSizeClick = (e) => {
    setPaginationOptionsAnchorEl(e.currentTarget);
  };
  const onPageSizeChange = (val) => {
    setLocalPageSize(val);
    actualRef?.current?.api?.paginationSetPageSize(val);
    setPaginationOptionsAnchorEl(null);
  };

  return (
    <div className="pagination-container">
      <div ref={buttonRef} className="select-button-container">
        <Button
          variant="secondary"
          label={`${localPageSize} per page`}
          onClick={handlePageSizeClick}
          data-type="pagination-btn"
          data-collapsed={!Boolean(paginationOptionsOpen)}
          icon={<ExpandLess />}
          iconPlacement="right"
        >
          <span className="ia-pageSize">{`${localPageSize} per page`}</span>
        </Button>
      </div>
      <Menu
        anchorEl={paginationOptionsAnchorEl}
        open={paginationOptionsOpen}
        onClose={() => {
          setPaginationOptionsAnchorEl(null);
        }}
        selected={localPageSize}
        options={paginationPageSizeSelector.map((opt) => ({
          label: `${opt} per page`,
          onClick: () => onPageSizeChange(opt),
          value: opt,
        }))}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </div>
  );
}
