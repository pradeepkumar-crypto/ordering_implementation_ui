import React from "react";
import { SortableAccordionList } from "./SortableAccordionComp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./AccordionModern.styles.scss";
import { Badge } from "../Badge";

export function AccordionModern(props) {
  const {
    draggable = false,
    expanded,
    setExpanded,
    isMultiExpanded,
    data,
    onChange,
    isSingleItem,
    singleData,
  } = props;

  const handleMultiAccordionChange = (value) => {
    if (onChange) {
      onChange(value);
    }
    if (isMultiExpanded && !expanded.includes(value)) {
      setExpanded([...expanded, value]);
    } else if (isMultiExpanded && expanded.includes(value)) {
      setExpanded((prev) => prev.filter((curr) => curr.value !== value));
    } else if (expanded === value) {
      setExpanded("");
    } else {
      setExpanded(value);
    }
  };

  const checkExpand = (item) => {
    if (isMultiExpanded && expanded.includes(item.value)) {
      return "expand-content";
    } else if (expanded === item.value) {
      return "expand-content";
    }
    return "";
  };

  if (draggable && data.length > 0) {
    return (
      <SortableAccordionList
        data={data}
        handleMultiAccordionChange={handleMultiAccordionChange}
        checkExpand={checkExpand}
      />
    );
  }

  return (
    <div className="impact-accordion-modern-main-container">
      {data.map((item, index) => {
        return (
          <div className="impact-modern-accordion-container">
            <div className="impact-modern-accordion-item">
              <div className="impact-modern-accordion-header">
                <div
                  className={`impact-modern-accordion-expand-icon ${checkExpand(
                    item,
                  )}-icon`}
                  onClick={() => handleMultiAccordionChange(item.value)}
                >
                  <KeyboardArrowRightIcon />
                </div>
                <div
                  className={`impact-modern-accordion-title ${
                    item.childCount > 0 ? "child-count" : ""
                  }`}
                >
                  {item.header}
                  {item.childCount > 0 ? (
                    <Badge
                      label={item.childCount}
                      color="info"
                      variant="stroke"
                    />
                  ) : null}
                </div>
              </div>
              <div
                className={`impact-modern-accordion-content ${checkExpand(
                  item,
                )}`}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
