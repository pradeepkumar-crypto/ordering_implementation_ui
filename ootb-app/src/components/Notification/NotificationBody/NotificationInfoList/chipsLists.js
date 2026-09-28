import React, { useRef, useEffect, useState } from "react";
import { Badge } from "../../../Badge";
import { Button } from "../../../Button";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

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
}) {
  const [btnSwitch, setBtnSwitch] = useState(false);
  const handleClick = (currList) => {
    currList.handleClick();
    const olderList = list.filter((item) => item.label !== currList.label);
    const newList = [currList, ...olderList];
    setList(newList);
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

  return (
    <div className="impact-notification-task-list-chips">
      <div
        className={`impact-notification-task-list-item ${
          expandList ? "list-item-full-width" : ""
        }`}
      >
        {list1.map((list, index) => {
          if (currActiveListType === list.label) {
            return (
              <Badge
                key={index}
                color="info"
                label={`${list.label} ${
                  list.numberOfTypes ? `(${list.numberOfTypes})` : ""
                }`}
                onClick={() => handleClick(list)}
                variant="stroke"
              />
            );
          } else {
            return (
              <Badge
                key={index}
                color="default"
                label={`${list.label} ${
                  list.numberOfTypes ? `(${list.numberOfTypes})` : ""
                }`}
                onClick={() => handleClick(list)}
                variant="stroke"
              />
            );
          }
        })}
        <div
          className={`impact-notification-task-list-item-hidden ${
            expandList ? "list-item-full-width" : ""
          }`}
        >
          {list2.map((list, index) => {
            if (currActiveListType === list.label) {
              return (
                <Badge
                  key={index}
                  color="info"
                  label={`${list.label} ${
                    list.numberOfTypes ? `(${list.numberOfTypes})` : ""
                  }`}
                  onClick={() => handleClick(list)}
                  variant="stroke"
                />
              );
            } else {
              return (
                <Badge
                  key={index}
                  color="default"
                  label={`${list.label} ${
                    list.numberOfTypes ? `(${list.numberOfTypes})` : ""
                  }`}
                  onClick={() => handleClick(list)}
                  variant="stroke"
                />
              );
            }
          })}
        </div>
      </div>
      {btnSwitch ? (
        <Button
          icon={<ChevronLeftOutlinedIcon />}
          size="small"
          variant="text"
          onClick={handleExpandClick}
        />
      ) : (
        <Button
          icon={<ChevronRightOutlinedIcon />}
          size="small"
          variant="text"
          onClick={handleExpandClick}
        >
          {"+2"}
        </Button>
      )}
    </div>
  );
}

//expandList &&
// const contRef = useRef(null);
//   const [btnSwitch, setBtnSwitch] = useState(false);
//   useEffect(() => {
//     if (contRef.current) {
//       const style = window.getComputedStyle(contRef.current);
//       if (style.width !== "0px") {
//         setBtnSwitch(true);
//       } else {
//         setBtnSwitch(false);
//       }
//       console.log(style.width);
//     }
//   }, [contRef.current, expandList, setExpandList, btnSwitch, setBtnSwitch]);

//ref={contRef}
