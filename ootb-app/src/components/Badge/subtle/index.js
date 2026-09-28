import React from "react";
import SubtleIconLabelBadges from "./subtleIconLabelBadges";
import SubtleOnlyIconBadges from "./subtleIOnlyIconBadges";
import SubtleOnlyLabelBadges from "./subtleOnlyLabelBadges";

export default function SubtleBadges({
  label,
  icon,
  color,
  isIcon,
  size,
  ...args
}) {
  if (isIcon && label) {
    return (
      <SubtleIconLabelBadges
        label={label}
        icon={icon}
        color={color}
        size={size}
        {...args}
      />
    );
  }

  if (isIcon && !label) {
    return (
      <SubtleOnlyIconBadges
        icon={icon}
        color={color}
        isIcon={isIcon}
        size={size}
        {...args}
      />
    );
  }

  return (
    <SubtleOnlyLabelBadges label={label} color={color} size={size} {...args} />
  );
}
