import React from "react";
import Chip from "@mui/material/Chip";

export default function SubtleIconLabelBadges({
  label,
  icon,
  color,
  size,
  ...args
}) {
  // this function fetch class name according to given props color
  const getFilledBadgesColor = (color) => {
    switch (color) {
      case "info":
        return "info-badge-subtle";
      case "error":
        return "error-badge-subtle";
      case "warning":
        return "warning-badge-subtle";
      case "success":
        return "success-badge-subtle";
      default:
        return "";
    }
  };

  return (
    <Chip
      className={`impact_badges_icon_label_subtle ${getFilledBadgesColor(
        color,
      )} ${size === "small" ? "small-badge" : ""}`}
      icon={icon}
      label={label}
      disableRipple
      {...args}
    />
  );
}
