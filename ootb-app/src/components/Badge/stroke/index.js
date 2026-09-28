import React from "react";
import StrokeIconLabelBadges from "./strokeIconLabelBadges";
import StrokeOnlyIconBadges from "./strokeOnlyIconBadges";
import StrokeOnlyLabelBadges from "./strokeOnlyLabelBadges";

export default function StrokeBadges({
  label,
  icon,
  variant,
  color,
  isIcon,
  size,
  ...args
}) {
  if (isIcon && label) {
    return (
      <StrokeIconLabelBadges
        label={label}
        icon={icon}
        color={color}
        isIcon={isIcon}
        size={size}
        {...args}
      />
    );
  }

  if (isIcon && !label) {
    return (
      <StrokeOnlyIconBadges
        icon={icon}
        color={color}
        isIcon={isIcon}
        size={size}
        {...args}
      />
    );
  }

  return (
    <StrokeOnlyLabelBadges label={label} color={color} size={size} {...args} />
  );
}
