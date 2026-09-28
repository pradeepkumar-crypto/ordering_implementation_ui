import React from "react";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import { getSize } from "./utils";

export default function FilledTags({
  label,
  size,
  icon,
  onClick,
  isRemovable,
  onDelete,
}) {
  if (icon && isRemovable) {
    return (
      <Chip
        className={`impact-tag ${getSize(size)}`}
        label={label}
        variant="filled"
        onClick={onClick}
        onDelete={onDelete}
        deleteIcon={icon}
      />
    );
  }

  if (!icon && isRemovable) {
    return (
      <Chip
        className={`impact-tag ${getSize(size)}`}
        label={label}
        variant="filled"
        onClick={onClick}
        onDelete={onDelete}
        deleteIcon={<CloseIcon />}
      />
    );
  }

  return (
    <Chip
      className={`impact-tag ${getSize(size)}`}
      label={label}
      variant="filled"
      onClick={onClick}
    />
  );
}
