import React, { useState, useEffect } from "react";
import { Badge } from "../Badge";
import AppliedFilters from "./appliedFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function FilterDropDown(props) {
  const {
    selectedFilter,
    setSelectedFilter,
    recentFilters,
    savedFiltersBadge,
    savedFilterLists,
    handleApplyFilter,
    handleCancelFilter,
    handleBadgeChange,
    hideSelectedFilterBadge,
    savedFilterSelectedBadge,
    handleSavedRecentFilterDropdown,
    filterDropDownLabel = "Filters Applied",
  } = props;
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(savedFilterSelectedBadge);
  const [tempSelectedFilter, setTempSelectedFilter] = useState(selectedFilter);
  const [selectedFilterOnApply, setSelectedFilterOnApply] =
    useState(selectedFilter);

  const handleClickOutside = (event) => {
    if (
      showDropDown &&
      !event?.target?.closest(".impact-filter-dropdown-container") &&
      !event?.target?.closest(".impact-filter-dropdown-action-btns")
    ) {
      setShowDropDown(false);
      setSelectedFilterOnApply(tempSelectedFilter);
    }
  };

  useEffect(() => {
    setTempSelectedFilter(selectedFilter);
  }, [selectedFilter]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropDown]);

  return (
    <div className="impact-filter-dropdown-container">
      <div className="impact-filter-dropdown-label">{filterDropDownLabel}</div>
      {!hideSelectedFilterBadge && (
        <Badge
          color="info"
          label={tempSelectedFilter}
          onClick={() => {}}
          variant="stroke"
        />
      )}
      {!hideSelectedFilterBadge && (
        <div
          className="impact-filter-dropdown-button"
          style={{
            transform: showDropDown ? "rotate(180deg)" : "rotate(0deg)",
          }}
          role="button"
          onClick={() => {
            setShowDropDown((prev) => !prev);
            handleSavedRecentFilterDropdown();
          }}
        >
          <KeyboardArrowDownIcon />
        </div>
      )}
      {showDropDown && (
        <AppliedFilters
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          recentFilters={recentFilters}
          savedFilterLists={savedFilterLists}
          savedFiltersBadge={savedFiltersBadge}
          handleApplyFilter={handleApplyFilter}
          handleCancelFilter={handleCancelFilter}
          handleBadgeChange={handleBadgeChange}
          setShowDropDown={setShowDropDown}
          selectedBadge={selectedBadge}
          setSelectedBadge={setSelectedBadge}
          setTempSelectedFilter={setTempSelectedFilter}
          tempSelectedFilter={tempSelectedFilter}
          selectedFilterOnApply={selectedFilterOnApply}
          setSelectedFilterOnApply={setSelectedFilterOnApply}
        />
      )}
    </div>
  );
}
