import React, { forwardRef } from "react";
import FilledTags from "./filled";
import StrokeTags from "./stroke";
import SolidTags from "./solid";
import "./Tags.styles.scss";

export const Tag = forwardRef((props, ref) => {
  const {
    label,
    size = "large",
    variant = "filled",
    icon,
    onClick,
    isRemovable = false,
    onDelete,
  } = props;

  if (variant === "stroke") {
    return (
      <StrokeTags
        label={label}
        size={size}
        icon={icon}
        onClick={onClick}
        isRemovable={isRemovable}
        onDelete={onDelete}
      />
    );
  }

  if (variant === "solid") {
    return (
      <SolidTags
        label={label}
        size={size}
        icon={icon}
        onClick={onClick}
        isRemovable={isRemovable}
        onDelete={onDelete}
      />
    );
  }

  return (
    <FilledTags
      label={label}
      size={size}
      icon={icon}
      onClick={onClick}
      isRemovable={isRemovable}
      onDelete={onDelete}
    />
  );
});
