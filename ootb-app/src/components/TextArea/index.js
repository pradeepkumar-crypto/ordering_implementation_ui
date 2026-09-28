import React from "react";
import FormControl from "@mui/material/FormControl";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./TextArea.styles.scss";

export function TextArea({
  label,
  maxRows = 5,
  placeholder,
  defaultValue,
  value,
  onChange,
  secondaryLabel,
  isDisabled,
  isRequired,
  characterLimit,
  isError = false,
  isSuccess = false,
  isWarning = false,
  width = "240px",
  height = "100px",
  ...props
}) {
  if (!secondaryLabel && !characterLimit) {
    return (
      <FormControl className="impact_textarea_layout">
        <div
          className={`impact_textarea_container ${
            isDisabled && "impact_textarea_disabled"
          }  ${isError && "impact_textarea_error"}
            ${isSuccess && "impact_textarea_success"}
            ${isWarning && "impact_textarea_warning"}
          `}
        >
          <label className="impact_textarea_label">
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </label>
          <div className="impact_textarea">
            <TextareaAutosize
              style={{
                minWidth: width,
                minHeight: height,
                width: width,
                height: height,
              }}
              maxRows={maxRows}
              aria-label="maximum height"
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              disableAutoFocus={true}
              {...props}
            />
          </div>
        </div>
      </FormControl>
    );
  }
  return (
    <FormControl className="impact_textarea_layout">
      <div
        className={`impact_textarea_container ${
          isDisabled && "impact_textarea_disabled"
        }  ${isError && "impact_textarea_error"}
           ${isSuccess && "impact_textarea_success"}
           ${isWarning && "impact_textarea_warning"}
        `}
      >
        <label className="impact_textarea_label">
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        <div className="impact_textarea">
          <TextareaAutosize
            style={{
              minWidth: width,
              minHeight: height,
              width: width,
              height: height,
            }}
            maxRows={maxRows}
            aria-label="maximum height"
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            disableAutoFocus={true}
            {...props}
          />
        </div>
        {secondaryLabel ? (
          <div className="impact_textarea_btm_container">
            <div className="left_secondary_label_container">
              {secondaryLabel}
            </div>
            {characterLimit && (
              <div className="right_numeric_container">
                {value.length}/{characterLimit}
              </div>
            )}
          </div>
        ) : (
          <div className="impact_textarea_btm_container">
            <div className="left_secondary_label_container"></div>
            {characterLimit && (
              <div className="right_numeric_container">
                {value.length}/{characterLimit}
              </div>
            )}
          </div>
        )}
      </div>
    </FormControl>
  );
}
