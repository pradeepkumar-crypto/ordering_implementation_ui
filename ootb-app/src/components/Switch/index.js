import React from "react";
import MUISwitch from "@mui/material/Switch";
import PropTypes from "prop-types";

import "./Switch.styles.scss";

export const Switch = ({
  value,
  leftLabel = "",
  rightLabel = "",
  disabled = false,
  onChange,
  ...args
}) => {
  return (
    <div className="ia-styles ia-switch-container">
      {leftLabel ? (
        <span
          className={`ia-styles ia-switch-label ${
            disabled ? "ia-switch-disabled" : ""
          }`}
        >
          {leftLabel}
        </span>
      ) : null}
      <div style={{ display: "flex", alignItems: "center" }}>
        <MUISwitch
          disabled={disabled}
          disableRipple
          checked={value}
          onChange={onChange}
          className={`ia-styles ia-switch ${
            disabled ? "ia-switch-disabled" : ""
          } ${!value ? "ia-switch-off" : ""}`}
          {...args}
        />
      </div>
      {rightLabel ? (
        <span
          className={`ia-styles ia-switch-label ${
            disabled ? "ia-switch-disabled" : ""
          }`}
        >
          {rightLabel}
        </span>
      ) : null}
    </div>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
