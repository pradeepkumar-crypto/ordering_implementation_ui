import React from "react";

import { IconMenuItem } from "./IconMenuItem";
import { NestedMenuItem } from "./NestedMenuItem";
import { ListItemIcon, MenuItem } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import "./Menu.styles.scss";

/**
 * Create a JSX element with nested elements creating a nested menu.
 * Every menu item should have a uid provided
 */
export function nestedMenuItemsFromObject({
  menuItemsData: items,
  isOpen,
  handleClose,
  withCheckbox,
  label,
  ...rest
}) {
  // Handle the root node if it has a label
  if (label && (!Array.isArray(items) || items.length === 0)) {
    return (
      <MenuItem key={label} onClick={handleClose}>
        {rest?.icon && (
          <ListItemIcon className="ia-list-icon">{rest?.icon}</ListItemIcon>
        )}
        <div className="ia-list-body">
          <div className="ia-list-label-container">
            <div className="ia-list-label">{label}</div>
            {rest?.subLabel && (
              <div className="ia-list-sublabel">{rest?.subLabel}</div>
            )}
          </div>
          <ChevronRight />
        </div>
      </MenuItem>
    );
  }

  // Check if items is not an array or is an empty array
  if (!Array.isArray(items) || items.length === 0) {
    return null; // Return null if there are no items to render
  }
  return items.map((item) => {
    const { icon, label, children, callback, sx, disabled, delay } = item;

    if (children && children?.length > 0) {
      // Recurse deeper
      return (
        <NestedMenuItem
          key={label}
          icon={<ChevronRight />}
          label={label}
          parentMenuOpen={isOpen}
          sx={sx}
          delay={delay}
          disabled={disabled}
          item={item}
        >
          {/* Call this function to nest more items */}
          {nestedMenuItemsFromObject({
            handleClose,
            isOpen,
            menuItemsData: children,
            label,
            ...rest,
          })}
        </NestedMenuItem>
      );
    } else {
      // No children elements, return MenuItem
      return (
        <IconMenuItem
          item={item}
          key={label}
          icon={icon}
          label={label || item?.section}
          onClick={(event) => {
            handleClose();
            callback && callback(event, item);
          }}
          sx={sx}
          disabled={disabled}
          withCheckbox={withCheckbox}
          {...rest}
        />
      );
    }
  });
}
