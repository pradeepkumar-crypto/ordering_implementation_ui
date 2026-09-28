import React, { useState } from "react";
import { Button } from "../../../Button";
import { Input } from "../../../Input";
import ChipsLists from "./chipsLists";
import NotificationList from "./notificationList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

export default function NotificationInfoList({
  expand,
  listTypes,
  notificationList,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  handleNotificationDeleteAll,
}) {
  const [list, setList] = useState(listTypes || []);
  const [currActiveListType, setCurrActiveListType] = useState(
    listTypes.length > 0 ? listTypes[0].label : ""
  );
  const [notificationListItems, setNotificationListItems] = useState(
    notificationList || []
  );
  const [expandList, setExpandList] = useState(false);
  const [searchExpand, setSearchExpand] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    const searchTerm = event.target.value.trim().toUpperCase();
    // Split the search term by spaces and create a regex for each word
    const searchTerms = searchTerm.split(/\s+/).filter(Boolean); // Split by space and remove empty entries

    if (searchTerms.length > 0) {
      const searchResults = notificationList.filter((option) => {
        // Check if all words in searchTerms are present in option.label
        return searchTerms.every((term) =>
          new RegExp(term, "i").test(option.label)
        );
      });
      setNotificationListItems([...searchResults]);
    } else {
      setNotificationListItems(notificationList);
    }
  };

  return (
    <div className="impact-notification-task-list-container">
      <div className="impact-notification-task-list-header">
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
        />
        <div className="impact-notification-task-list-actions">
          <div
            className={`impact-notification-task-list-search ${
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
          {/* <Button icon={<SearchOutlinedIcon />} size="medium" variant="text" /> */}
          <Button
            icon={<FilterListOutlinedIcon />}
            size="medium"
            variant="text"
          >
            3
          </Button>
        </div>
      </div>
      <NotificationList
        expand={expand}
        title={currActiveListType}
        notificationList={notificationListItems}
        handleSelectAll={handleSelectAll}
        handleMarkReadAll={handleMarkReadAll}
        handleMoveAllPending={handleMoveAllPending}
        handleNotificationDeleteAll={handleNotificationDeleteAll}
      />
    </div>
  );
}

// const listTypes = [
//   {
//     id: 1,
//     label: "Recent",
//     numberOfTypes: 4,
//     onClick: () => {},
//   },
//   {
//     id: 2,
//     label: "Old",
//     numberOfTypes: 4,
//     onClick: () => {},
//   },
//   {
//     id: 3,
//     label: "Archive",
//     onClick: () => {},
//   },
//   {
//     id: 4,
//     label: "All",
//     onClick: () => {},
//   },
// ];
