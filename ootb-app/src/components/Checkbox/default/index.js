import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";
import WithoutFormLabel from "../withoutFormLabel";
import WithDropDown from "../withDropDown";

export default function Default({
  defaultChecked,
  checked,
  onChange,
  isRequired,
  isDisabled,
  label,
  withoutFormLabel,
  withDropDown,
  dropDownData,
  ...args
}) {
  if (withoutFormLabel) {
    return (
      <WithoutFormLabel
        {...args}
        label={label}
        isDisabled={isDisabled}
        isRequired={isRequired}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
      />
    );
  }

  if (withDropDown && dropDownData && dropDownData.length > 0) {
    return (
      <WithDropDown
        {...args}
        label={label}
        isDisabled={isDisabled}
        isRequired={isRequired}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
        dropDownData={dropDownData}
      />
    );
  }
  return (
    <FormControlLabel
      className={`impact-form-checkbox-container ${
        checked || defaultChecked ? "checked" : ""
      }`}
      control={
        <MUICheckbox
          {...args}
          className="impact-checkbox-container default-variant"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
          disableRipple={true}
        />
      }
      required={isRequired}
      disabled={isDisabled}
      label={label}
    />
  );
}
