import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MyFormHelperText from "./helperText";

export default function VanilaInput({
  label,
  isRequired,
  isHelperText,
  helperText,
  focusedText,
  isError,
  isDisabled,
  htmlFor,
  ...args
}) {
  // if input text is wrong
  if (isError) {
    return (
      <FormControl className="impact_inputbox_container impact_input_error">
        {label && (
          <label htmlFor={htmlFor}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <OutlinedInput {...args} />
        {isHelperText && (
          <MyFormHelperText helper={helperText} focusedText={focusedText} />
        )}
      </FormControl>
    );
  }
  // if input is disabled
  if (isDisabled) {
    return (
      <FormControl className="impact_inputbox_container impact_input_disabled">
        {label && (
          <label htmlFor={htmlFor}>
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <OutlinedInput {...args} disabled={isDisabled} />
        {isHelperText && (
          <MyFormHelperText helper={helperText} focusedText={focusedText} />
        )}
      </FormControl>
    );
  }

  return (
    <FormControl className="impact_inputbox_container">
      {label && (
        <label htmlFor={htmlFor}>
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <OutlinedInput {...args} />
      {isHelperText && (
        <MyFormHelperText helper={helperText} focusedText={focusedText} />
      )}
    </FormControl>
  );
}
