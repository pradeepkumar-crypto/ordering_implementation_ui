import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import "./Chip.style.scss";
import PropTypes from "prop-types";

export const Chips = ({
  label,
  onClick,
  disabled,
  type = "default",
  isActive = false,
  ...args
}) => {
  return (
    <div
      className={`impact-chip-container ${type} ${isActive ? "selected" : ""}`}
    >
      <Chip
        label={label}
        onClick={() => onClick?.(label)}
        disabled={disabled}
        disableRipple
        {...args}
      />
    </div>
  );
};

Chips.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
