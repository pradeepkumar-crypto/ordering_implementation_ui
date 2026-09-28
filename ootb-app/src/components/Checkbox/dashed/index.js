import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";

export default function Dashed({
  defaultChecked,
  checked,
  onChange,
  isRequired,
  isDisabled,
  label,
  ...args
}) {
  return (
    <FormControlLabel
      className={`impact-form-checkbox-container ${
        checked || defaultChecked ? "checked" : ""
      }`}
      control={
        <MUICheckbox
          {...args}
          className="impact-checkbox-container dashed-variant"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          disableRipple={true}
        />
      }
      required={isRequired}
      disabled={isDisabled}
      label={label}
    />
  );
}
