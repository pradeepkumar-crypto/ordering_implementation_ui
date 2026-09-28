import MenuItem from "@mui/material/MenuItem";
import { Checkbox } from "../Checkbox";
import React, { forwardRef, RefObject } from "react";
import "./Menu.styles.scss";
import { ListItemIcon } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const IconMenuItem = forwardRef(function IconMenuItem(
  {
    MenuItemProps,
    className,
    item,
    handleSelect,
    icon,
    renderLabel,
    withCheckbox,
    selectedItems,
    selected,
    children,
    childOpen = false,
    ...props
  },
  ref,
) {
  return (
    <MenuItem
      {...props}
      key={item?.label}
      ref={ref}
      disabled={item?.disabled}
      onClick={
        withCheckbox
          ? (e) => handleSelect(item, e)
          : (e) => item?.onClick && item.onClick(item.value, e)
      }
      disableRipple
      disableTouchRipple
      selected={
        withCheckbox
          ? selectedItems.includes(item?.value)
          : selected === item?.value
      }
      disablePortal
      disableScrollLock
      {...MenuItemProps}
      className={
        className
          ? `${className} ${childOpen && "child-hover"}`
          : childOpen && "child-hover"
      }
    >
      <div className="ia-list-body">
        {withCheckbox && !item?.section && (
          <div className="ia-menu-checkbox">
            <Checkbox
              variant="default"
              disabled={item?.disabled}
              checked={selectedItems.includes(item?.value)}
            />
          </div>
        )}
        {item.icon && (
          <ListItemIcon className="ia-list-icon">{item.icon}</ListItemIcon>
        )}
        {item?.section ? (
          <div className="menu-section-header">{item.section}</div>
        ) : (
          <div className="ia-list-label-container">
            <div className="ia-list-label">{item?.label}</div>
            {item?.subLabel && (
              <div className="ia-list-sublabel">{item.subLabel}</div>
            )}
          </div>
        )}
      </div>
      {item?.rightIcon ? item?.rightIcon : children && <ChevronRightIcon />}
    </MenuItem>
  );
});
