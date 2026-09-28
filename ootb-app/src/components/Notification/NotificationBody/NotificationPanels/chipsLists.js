import React, { useState, useEffect } from "react";
import { Badge } from "../../../Badge";
import FilterSlider from "../../../../components/FiltersStrip/Slider";
import { Loader } from "../../../Loader";

export default function ChipsLists({
  list,
  setList,
  list1,
  list2,
  currActiveListType,
  setCurrActiveListType,
  expandList,
  setExpandList,
  setSearchExpand,
  activeBadge,
  showBadgeLoader,
}) {
  const [btnSwitch, setBtnSwitch] = useState(false);
  const handleClick = (currList) => {
    currList.handleClick();
    setCurrActiveListType(currList.label);
  };

  const handleExpandClick = () => {
    if (!expandList) {
      setSearchExpand(false);
    }
    setExpandList((prev) => !prev);

    // Set a delay to change the button value during the middle of the transition
    const transitionDuration = 400; // Adjust this to match your CSS transition duration
    setTimeout(() => {
      setBtnSwitch((prev) => !prev);
    }, transitionDuration / 2); // Change halfway through the transition
  };

  return showBadgeLoader ? (
    <Loader showSkeleton={true} />
  ) : (
    <div className="impact-notification-task-list-chips">
      <div
        className={`impact-notification-task-list-item ${
          expandList ? "list-item-full-width" : ""
        }`}
      >
        <FilterSlider
          list={list}
          width={expandList ? "75%" : "20%"}
          isExpanded={expandList}
          handleExpandClick={handleExpandClick}
          tagsChildren={(item, index) => (
            <Badge
              key={index}
              color={
                (activeBadge || currActiveListType) === item.label
                  ? "info"
                  : "default"
              }
              label={`${item.label} ${
                item.numberOfTypes ? `(${item.numberOfTypes})` : ""
              }`}
              onClick={() => handleClick(item)}
              variant="stroke"
            />
          )}
        />
      </div>
    </div>
  );
}
