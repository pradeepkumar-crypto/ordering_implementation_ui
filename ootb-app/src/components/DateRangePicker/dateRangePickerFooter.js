import React from "react";
import { Button } from "../Button";

export default function DareRangePickerFooter({
  selectedDaysNumber,
  handleResetDates,
  handleCancelDates,
  onSecondaryButtonClick,
  tertiaryButtonProps,
  handleApplyDates,
  primaryButtonProps,
}) {
  return (
    <div className="dateRangePicker-footer-container">
      <div className="dateRangePicker-buttons-left-container">
        <div className="dateRangePicker-footer-label-container">
          Selected:{" "}
          <span className="dateRangePicker-footer-value">
            {selectedDaysNumber} days
          </span>
        </div>
      </div>
      <div className="dateRangePicker-buttons-right-container">
        <Button variant="url" size="small" onClick={handleResetDates}>
          Clear
        </Button>
        {onSecondaryButtonClick && (
          <Button
            variant="secondary"
            size="small"
            onClick={handleCancelDates}
            {...tertiaryButtonProps}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          size="small"
          onClick={handleApplyDates}
          {...primaryButtonProps}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
