import React from "react";
import Chip from "@mui/material/Chip";

export default function FilledOnlyLabelBadges({ label, color, size, ...args }) {
  // this function fetch class name according to given props color
  const getFilledBadgesColor = (color) => {
    switch (color) {
      case "info":
        return "info-badge-filled";
      case "error":
        return "error-badge-filled";
      case "warning":
        return "warning-badge-filled";
      case "success":
        return "success-badge-filled";
      default:
        return "";
    }
  };

  return (
    <Chip
      className={`impact_badges_only_label_filled ${getFilledBadgesColor(
        color,
      )} ${size === "small" ? "small-badge" : ""}`}
      label={label}
      disableRipple
      {...args}
    />
  );
}
