import React from "react";
import "./styles.css";
import "./Badges.style.scss";
import FilledBadges from "./filled";
import StrokeBadges from "./stroke";
import SubtleBadges from "./subtle";

export const Badge = ({
  label,
  icon,
  variant,
  color,
  isIcon,
  size,
  ...args
}) => {
  if (variant === "stroke") {
    return (
      <StrokeBadges
        label={label}
        icon={icon}
        color={color}
        isIcon={isIcon}
        size={size}
        {...args}
      />
    );
  }

  if (variant === "subtle") {
    return (
      <SubtleBadges
        label={label}
        icon={icon}
        color={color}
        isIcon={isIcon}
        size={size}
        {...args}
      />
    );
  }

  return (
    <FilledBadges
      label={label}
      icon={icon}
      color={color}
      isIcon={isIcon}
      size={size}
      {...args}
    />
  );
};
