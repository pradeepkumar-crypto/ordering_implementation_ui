import React from "react";
import { rangeSelectorTypes } from "./utils";
import { RadioButtonGroup } from "../RadioButtonGroup";

export default function DateRangePickerCustom({
  handleRangeSelectorChange,
  selectedRange,
}) {
  return (
    <div className="dateRangePicker-show-range-main-container">
      <div className="dateRangePicker-shortcut-heading">Date Range</div>
      <div className="dateRangePicker-shortcut-list">
        <RadioButtonGroup
          className="dateRangePicker-shortcut-list-item"
          options={rangeSelectorTypes}
          onChange={handleRangeSelectorChange}
          value={selectedRange}
        />
      </div>
    </div>
  );
}
