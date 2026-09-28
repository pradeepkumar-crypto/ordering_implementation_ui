import React from "react";
import VanilaInput from "./vanilaInput";
import InputWithIcon from "./inputWithIcon";
import "./Input.styles.scss";

export function Input({
  label,
  isRequired,
  leftIcon,
  rightIcon,
  leftIconClick,
  rightIconClick,
  helperText,
  isHelperText,
  focusedText,
  autoComplete,
  isError,
  isDisabled,
  htmlFor,
  iconClickOnDisabled = false,
  ...args
}) {
  if (leftIcon || rightIcon) {
    return (
      <InputWithIcon
        {...args}
        label={label}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        leftIconClick={leftIconClick}
        rightIconClick={rightIconClick}
        isRequired={isRequired}
        isError={isError}
        isDisabled={isDisabled}
        isHelperText={isHelperText}
        helperText={helperText}
        focusedText={focusedText}
        htmlFor={htmlFor}
        iconClickOnDisabled={iconClickOnDisabled}
      />
    );
  }

  return (
    <VanilaInput
      {...args}
      label={label}
      isRequired={isRequired}
      isError={isError}
      isDisabled={isDisabled}
      isHelperText={isHelperText}
      helperText={helperText}
      focusedText={focusedText}
      htmlFor={htmlFor}
    />
  );
}
