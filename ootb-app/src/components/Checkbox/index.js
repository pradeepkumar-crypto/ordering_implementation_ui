import React from "react";
import Default from "./default";
import Dashed from "./dashed";
import "./Checkbox.styles.scss";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export function Checkbox({
  label,
  variant,
  disabled,
  required,
  defaultChecked,
  checked,
  onChange,
  withoutFormLabel,
  withDropDown,
  dropDownData,
  ...args
}) {
  if (variant === "dashed") {
    return (
      <Dashed
        {...args}
        label={label}
        isDisabled={disabled}
        isRequired={required}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange}
      />
    );
  }
  return (
    <Default
      {...args}
      label={label}
      isDisabled={disabled}
      isRequired={required}
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={onChange}
      withoutFormLabel={withoutFormLabel}
      withDropDown={withDropDown}
      dropDownData={dropDownData}
    />
  );
}
