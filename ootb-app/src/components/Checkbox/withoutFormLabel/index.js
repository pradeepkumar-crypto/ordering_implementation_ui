import React from "react";
import MUICheckbox from "@mui/material/Checkbox";

export default function WithoutFormLabel({
  defaultChecked,
  checked,
  onChange,
  isDisabled,
  label,
  isRequired,
  ...args
}) {
  return (
    <div className="impact-form-checkbox-container">
      <MUICheckbox
        {...args}
        className="impact-checkbox-container default-variant"
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        disabled={isDisabled}
        disableRipple={true}
      />
      {isRequired ? (
        <div className="impact-checkbox-label-with-required">
          <div
            className={`impact-checkbox-label ${
              checked || defaultChecked ? "checked" : ""
            } ${isDisabled ? "disabled" : ""}`}
          >
            {label}
          </div>
          <span>*</span>
        </div>
      ) : (
        <div
          className={`impact-checkbox-label ${
            checked || defaultChecked ? "checked" : ""
          } ${isDisabled ? "disabled" : ""}`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
