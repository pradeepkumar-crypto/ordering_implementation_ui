import React, { useState, Fragment, useCallback } from "react";
import FilterDropDown from "./filterDropDown";
import { Button } from "../Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./FiltersStrip.styles.scss";
import FilterSlider from "./Slider";
import { Tag } from "../Tag";

export const FiltersStrip = (props) => {
  const {
    selectedFilter,
    setSelectedFilter = () => {},
    recentFilters = [],
    savedFiltersBadge = [],
    savedFilterLists = [],
    filterTags = [],
    handleBadgeChange = () => {},
    handleApplyFilter,
    handleCancelFilter,
    filterButtonLabel = "All Filters",
    filterButtonClick,
    filterButtonProps,
    hideSelectedFilterBadge = false,
    savedFilterSelectedBadge = null,
    handleSavedRecentFilterDropdown = () => {},
    filterDropDownLabel,
  } = props;
  const [showSeparator, setShowSeparator] = useState(false);
  const [currDropShow, setCurrDropShow] = useState(null);
  const handleCurrDropSet = useCallback((val) => {
    setCurrDropShow(val);
  }, []);

  const handleClick = (event) => {
    // this is to not close the dropdown when clicking on the dropdown itself
    if (!event?.target?.closest(".impact-selected-filter-tags-dropdown"))
      setCurrDropShow(null);
  };
  return (
    <div className="impact-info-panel-container">
      <div className="impact-info-panel-left-container">
        {(savedFilterLists || recentFilters) && (
          <React.Fragment>
            <FilterDropDown
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              recentFilters={recentFilters}
              savedFilterLists={savedFilterLists}
              savedFiltersBadge={savedFiltersBadge}
              handleApplyFilter={handleApplyFilter}
              handleCancelFilter={handleCancelFilter}
              handleBadgeChange={handleBadgeChange}
              hideSelectedFilterBadge={hideSelectedFilterBadge}
              savedFilterSelectedBadge={savedFilterSelectedBadge}
              handleSavedRecentFilterDropdown={handleSavedRecentFilterDropdown}
              filterDropDownLabel={filterDropDownLabel}
            />
            {!hideSelectedFilterBadge && (
              <span className="impact-filter-strip-separator" />
            )}
          </React.Fragment>
        )}
        {filterTags.length > 0 && (
          <FilterSlider
            list={filterTags}
            containerChildren={(item, index) => (
              <>
                {index != 0 && (
                  <span className="impact-filter-strip-separator" />
                )}
                <div className="impact-selected-filter-label">
                  {item.label}{" "}
                  {item.required && <span style={{ color: "red" }}>*</span>}
                </div>
              </>
            )}
            tagsChildren={(item, index) => (
              <Fragment>
                {item.values.slice(0, 2).map((value, idx) => (
                  <Tag
                    key={idx}
                    label={value.label}
                    onDelete={() => {}}
                    size="medium"
                    variant="solid"
                  />
                ))}
                {item.values.length > 2 && (
                  <Tag
                    label={`+${item.values.length - 2}`}
                    onClick={() => {
                      handleCurrDropSet(currDropShow === index ? null : index);
                    }}
                    size="medium"
                    variant="solid"
                  />
                )}
              </Fragment>
            )}
            setShowSeparator={setShowSeparator}
            onNextClick={handleClick}
            onPrevClick={handleClick}
            currDropShow={currDropShow}
            handleClickOutside={handleClick}
          />
        )}
      </div>

      {filterButtonLabel && (
        <div className="impact-info-panel-right-container">
          {showSeparator && <span className="impact-filter-strip-separator" />}
          <Button
            className=""
            icon={<FilterListIcon fontSize="small" />}
            iconPlacement="left"
            onClick={filterButtonClick}
            size="large"
            variant="tertiary"
            {...filterButtonProps}
          >
            {filterButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
