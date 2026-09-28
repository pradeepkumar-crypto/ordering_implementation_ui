import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import ChipsLists from "./chipsLists";
import NotificationList from "./notificationList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Badge } from "../../../Badge";

export default function NotificationTaskList({
  expand,
  type,
  listTypes,
  notificationList,
  handleSettingClick,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  moveToPendingDropdownOptions,
  handleNotificationDeleteAll,
  notificationPanels,
  setNotificationPanels,
  activeBadge,
  filterChip,
  handleApplyFilter,
  isMultiSelectFilter,
  showBadgeLoader,
  showNotificationListLoader,
  selectedFilterChip,
}) {
  const [list, setList] = useState(listTypes || []);
  const [currActiveListType, setCurrActiveListType] = useState(
    activeBadge || listTypes.length > 0 ? listTypes[0].label : "",
  );

  // Set the list and currActiveListType when listTypes changes
  useMemo(() => {
    if (Array.isArray(listTypes)) {
      setList(listTypes);
      if (listTypes.length > 0)
        setCurrActiveListType(activeBadge || listTypes[0].label);
    }
  }, [listTypes]);

  const [notificationListItems, setNotificationListItems] = useState(
    notificationList || [],
  );
  const [expandList, setExpandList] = useState(false);
  const [searchExpand, setSearchExpand] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(
    selectedFilterChip || (isMultiSelectFilter ? [] : {}),
  );

  useEffect(() => {
    setNotificationListItems(notificationList);
  }, [notificationList]);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    const searchTerm = event.target.value.trim().toUpperCase();
    // Split the search term by spaces and create a regex for each word
    const searchTerms = searchTerm.split(/\s+/).filter(Boolean); // Split by space and remove empty entries

    if (searchTerms.length > 0) {
      const searchResults = notificationList.filter((option) => {
        // Check if all words in searchTerms are present in option.label
        return searchTerms.every((term) =>
          new RegExp(term, "i").test(option.label),
        );
      });
      setNotificationListItems([...searchResults]);
    } else {
      setNotificationListItems(notificationList);
    }
  };

  const handleClickOutside = (event) => {
    if (
      showFilter &&
      !event.target.closest(".impact-notification-task-list-filter-container")
    ) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div className="impact-notification-task-list-container">
      <div
        className="impact-notification-task-list-header"
        style={{
          justifyContent: list.length > 0 ? "space-between" : "flex-end",
        }}
      >
        {list.length > 0 && (
          <ChipsLists
            list={list}
            setList={setList}
            list1={list.slice(0, 2)}
            list2={list.slice(2)}
            currActiveListType={currActiveListType}
            setCurrActiveListType={setCurrActiveListType}
            expandList={expandList}
            setExpandList={setExpandList}
            setSearchExpand={setSearchExpand}
            activeBadge={activeBadge}
            showBadgeLoader={showBadgeLoader}
          />
        )}
        <div className="impact-notification-task-list-actions">
          <div
            className={`impact-notification-task-list-search-container ${
              searchExpand ? "search-expand" : ""
            }`}
          >
            <Input
              value={searchInput}
              placeholder="Search notification..."
              onChange={handleSearch}
              autoFocus={searchExpand}
              rightIcon={<SearchOutlinedIcon />}
              rightIconClick={() => {
                if (expandList) {
                  setExpandList(false);
                }
                setSearchExpand((prev) => !prev);
              }}
            />
          </div>
          {handleSettingClick && (
            <Button
              icon={<FilterListOutlinedIcon />}
              size="medium"
              variant="text"
              onClick={() => {
                setShowFilter((prev) => !prev);
                handleSettingClick();
              }}
            >
              {filterChip?.length > 0 ? filterChip.length : null}
            </Button>
          )}
          {showFilter && (
            <div className="impact-notification-task-list-filter-container">
              <div className="impact-notification-task-list-title">
                <span className="impact-notification-task-list-title-text">
                  Select Filter
                </span>
                <span className="impact-notification-task-list-title-text-sub">
                  {isMultiSelectFilter ? "(Multi Select)" : "(Single Select)"}
                </span>
              </div>
              <div className="impact-notification-task-list-filter-item">
                {filterChip.map((item) => (
                  <div
                    className={`impact-notification-task-list-filter-item-badge ${
                      isMultiSelectFilter
                        ? selectedFilter?.some(
                            (filter) => filter.value === item.value,
                          )
                          ? "selected"
                          : ""
                        : selectedFilter?.value === item?.value
                          ? "selected"
                          : ""
                    }`}
                    key={item.value}
                  >
                    <Badge
                      key={item.value}
                      label={item.label}
                      onClick={() =>
                        setSelectedFilter((prev) =>
                          isMultiSelectFilter
                            ? prev.some((el) => el.value === item.value)
                              ? prev.filter(
                                  (filter) => filter.value !== item.value,
                                )
                              : [...prev, item]
                            : prev === item
                              ? null
                              : item,
                        )
                      }
                      variant="subtle"
                      color="default"
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="url"
                onClick={() => {
                  handleApplyFilter(selectedFilter);
                  setShowFilter(false);
                }}
              >
                Apply
              </Button>
            </div>
          )}
        </div>
      </div>
      <NotificationList
        expand={expand}
        type={type}
        title={currActiveListType}
        notificationList={notificationListItems}
        notificationPanels={notificationPanels}
        setNotificationPanels={setNotificationPanels}
        handleSelectAll={handleSelectAll}
        handleMarkReadAll={handleMarkReadAll}
        handleMoveAllPending={handleMoveAllPending}
        moveToPendingDropdownOptions={moveToPendingDropdownOptions}
        handleNotificationDeleteAll={handleNotificationDeleteAll}
        showNotificationListLoader={showNotificationListLoader}
        showBadgeLoader={showBadgeLoader}
      />
    </div>
  );
}
