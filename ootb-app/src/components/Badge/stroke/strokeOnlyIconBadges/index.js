import React from "react";
import Chip from "@mui/material/Chip";

export default function StrokeOnlyIconBadges({ color, icon, size, ...args }) {
  /// this function fetch class name according to given props color
  const getStrokeBadgesColor = (color) => {
    switch (color) {
      case "info":
        return "info-badge-stroke";
      case "error":
        return "error-badge-stroke";
      case "warning":
        return "warning-badge-stroke";
      case "success":
        return "success-badge-stroke";
      default:
        return "";
    }
  };

  return (
    <Chip
      className={`impact_badges_only_icon_stroke ${getStrokeBadgesColor(
        color,
      )} ${size === "small" ? "small-badge" : ""}`}
      icon={icon}
      disableRipple
      {...args}
    />
  );
}
