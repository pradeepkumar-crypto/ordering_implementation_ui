import React from "react";
import { Button } from "../Button";

export default function DatePickerFooter({
  tertiaryButtonProps,
  secondaryButtonProps,
  primaryButtonProps,
  setSelectedDate,
  setFocused,
  onTertiaryButtonClick,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  setIsOpen,
}) {
  const handleClear = () => {
    setSelectedDate(null);
    setFocused(false);
    onTertiaryButtonClick();
  };

  const handleCancel = () => {
    setIsOpen(false);
    setFocused(false);
    onSecondaryButtonClick();
  };

  const handelApply = () => {
    setIsOpen(false);
    onPrimaryButtonClick();
  };
  return (
    <div className="datePicker-buttons-container">
      <Button
        variant="url"
        size="small"
        onClick={handleClear}
        {...tertiaryButtonProps}
      >
        Clear
      </Button>

      <Button
        variant="secondary"
        size="small"
        onClick={handleCancel}
        {...secondaryButtonProps}
      >
        Cancel
      </Button>

      <Button
        variant="primary"
        size="small"
        onClick={handelApply}
        {...primaryButtonProps}
      >
        Apply
      </Button>
    </div>
  );
}
