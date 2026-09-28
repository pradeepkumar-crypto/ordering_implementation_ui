import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MyFormHelperText from "./helperText";

export default function InputWithIcon({
  label,
  isRequired,
  leftIcon,
  leftIconClick,
  rightIcon,
  rightIconClick,
  isError,
  isDisabled,
  helperText,
  isHelperText,
  focusedText,
  htmlFor,
  iconClickOnDisabled,
  ...args
}) {
  if (isError) {
    return (
      <FormControl className="impact_inputbox_container_with_icons input-with-error">
        {label && (
          <label htmlFor={htmlFor}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <div className="impact-input-wrapper">
          {leftIcon && (
            <div
              role="button"
              className="left-input-icon"
              onClick={leftIconClick}
            >
              {leftIcon}
            </div>
          )}
          <OutlinedInput {...args} />
          {rightIcon && (
            <div
              role="button"
              className="right-input-icon"
              onClick={rightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {isHelperText && (
          <MyFormHelperText helper={helperText} focusedText={focusedText} />
        )}
      </FormControl>
    );
  }

  if (isDisabled) {
    return (
      <FormControl
        className={`impact_inputbox_container_with_icons input-with-disabled ${
          iconClickOnDisabled ? "icon-click-on-disabled" : ""
        }`}
      >
        {label && (
          <label htmlFor={htmlFor}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <div className="impact-input-wrapper">
          {leftIcon && (
            <div
              role="button"
              className="left-input-icon"
              onClick={leftIconClick}
            >
              {leftIcon}
            </div>
          )}
          <OutlinedInput {...args} disabled={isDisabled} />
          {rightIcon && (
            <div
              role="button"
              className="right-input-icon"
              onClick={rightIconClick}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {isHelperText && (
          <MyFormHelperText helper={helperText} focusedText={focusedText} />
        )}
      </FormControl>
    );
  }

  return (
    <FormControl className="impact_inputbox_container_with_icons">
      {label && (
        <label htmlFor={htmlFor}>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div className="impact-input-wrapper">
        {leftIcon && (
          <div
            role="button"
            className="left-input-icon"
            onClick={leftIconClick}
          >
            {leftIcon}
          </div>
        )}
        <OutlinedInput {...args} />
        {rightIcon && (
          <div
            role="button"
            className="right-input-icon"
            onClick={rightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {isHelperText && (
        <MyFormHelperText helper={helperText} focusedText={focusedText} />
      )}
    </FormControl>
  );
}
