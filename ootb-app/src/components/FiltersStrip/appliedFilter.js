import React, { useState, useEffect } from "react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Input } from "../Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function AppliedFilters(props) {
  const {
    selectedFilter,
    setSelectedFilter,
    recentFilters,
    savedFiltersBadge,
    savedFilterLists,
    handleApplyFilter,
    handleCancelFilter,
    handleBadgeChange,
    setShowDropDown,
    selectedBadge,
    setSelectedBadge,
    tempSelectedFilter,
    setTempSelectedFilter,
    selectedFilterOnApply,
    setSelectedFilterOnApply,
  } = props;
  const [savedLists, setSavedLists] = useState(savedFilterLists);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSavedLists(savedFilterLists);
  }, [savedFilterLists]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    const searchTerm = event.target.value.trim().toUpperCase();
    // Split the search term by spaces and create a regex for each word
    const searchTerms = searchTerm.split(/\s+/).filter(Boolean); // Split by space and remove empty entries

    if (searchTerms.length > 0) {
      const searchResults = savedFilterLists.filter((option) => {
        // Check if all words in searchTerms are present in option.label
        return searchTerms.every((term) =>
          new RegExp(term, "i").test(option.label)
        );
      });
      setSavedLists([...searchResults]);
    } else {
      setSavedLists(savedFilterLists);
    }
  };

  return (
    <div className="impact-filter-dropdown-wrapper">
      {recentFilters.length > 0 && (
        <div className="impact-filter-dropdown-recent-container">
          <div className="impact-filter-dropdown-label">Recent</div>
          <div className="impact-filter-dropdown-recent-filters-wrapper">
            {recentFilters.map((filter, index) => {
              return (
                <div
                  key={index}
                  className="impact-filter-dropdown-recent-filters"
                  onClick={() => {
                    filter.handleRecentFilter(filter);
                    setShowDropDown(false);
                  }}
                >
                  {filter.filterSet.slice(0, 2).map((fil, index) => (
                    <span key={index}>
                      {fil.label}
                      {index === 0 && filter.filterSet.length > 1 && ", "}
                    </span>
                  ))}
                  {filter.filterSet.length > 2 && ",..."}
                </div>
              );
            })}
          </div>
          <div className="impact-notification-horizontal-separator" />
        </div>
      )}
      <div className="impact-filter-dropdown-saved-container">
        <div className="impact-filter-dropdown-label">Saved Filters</div>
        <div className="impact-filter-dropdown-saved-filters-badge-wrapper">
          {savedFiltersBadge.map((badge, index) => {
            return (
              <Badge
                key={index}
                color={selectedBadge === badge.label ? "info" : "default"}
                label={badge.label}
                onClick={() => {
                  handleBadgeChange(badge);
                  setSelectedBadge(badge.label);
                }}
                variant="stroke"
              />
            );
          })}
        </div>
        {savedFilterLists.length > 0 ? (
          <>
            <div className="impact-filter-dropdown-saved-filters-search-wrapper">
              <Input
                value={searchInput}
                placeholder="Search filters..."
                onChange={handleSearch}
                leftIcon={<SearchOutlinedIcon />}
              />
            </div>
            <div className="impact-filter-dropdown-saved-filters-lists-wrapper">
              {savedLists.length > 0 ? (
                savedLists.map((list) => {
                  return (
                    <div
                      key={list.value}
                      className={`impact-filter-dropdown-saved-filters-list ${
                        selectedFilterOnApply === list.label
                          ? "filter-dropdown-selected-list"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedFilter(list.label);
                        setSelectedFilterOnApply(list.label);
                      }}
                    >
                      {list.label}
                    </div>
                  );
                })
              ) : (
                <div className="impact-filter-dropdown-saved-filters-no-data">
                  <span className="impact-filter-dropdown-saved-filters-no-data-text">
                    {"No saved filters found"}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="impact-filter-dropdown-saved-filters-no-data">
            <span className="impact-filter-dropdown-saved-filters-no-data-text">
              {"No saved filters found"}
            </span>
          </div>
        )}
      </div>
      <div className="impact-filter-dropdown-action-wrapper">
        <div className="impact-notification-horizontal-separator" />
        <div className="impact-filter-dropdown-action-btns">
          <Button
            className=""
            iconPlacement="left"
            onClick={() => {
              setSelectedFilterOnApply(tempSelectedFilter);
              handleCancelFilter();
              setShowDropDown(false);
            }}
            size="large"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            className=""
            iconPlacement="left"
            onClick={() => {
              setTempSelectedFilter(selectedFilterOnApply);
              handleApplyFilter(selectedFilter);
              setShowDropDown(false);
            }}
            size="large"
            variant="primary"
            disabled={savedLists.length === 0}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
