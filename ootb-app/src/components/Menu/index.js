import MUIMenu from "@mui/material/Menu";
import React, { forwardRef, useState } from "react";

import { nestedMenuItemsFromObject } from "./nestedMenuItemsFromObject";
import { Button } from "../Button";
import "./Menu.styles.scss";

export const Menu = forwardRef(function Menu(props, ref) {
  const {
    options: data,
    onClick,
    ButtonProps,
    MenuProps,
    onClose,
    iconPlacement = "left",
    withCheckbox = false,
    withActionButtons = false,
    onPrimaryButtonClick = () => {},
    onTertiaryButtonClick = () => {},
    withSection,
    anchorEl,
    open,
    selected,
    ...rest
  } = props;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSelect = (opt) => {
    setSelectedItems(
      (prev) =>
        prev.includes(opt.value)
          ? prev.filter((item) => item !== opt.value) // Deselect
          : [...prev, opt.value], // Select
    );
    opt.onClick && opt.onClick(opt.value);
  };

  const menuItems = nestedMenuItemsFromObject({
    handleClose: onClose,
    isOpen: open,
    menuItemsData: data ?? [],
    withCheckbox,
    handleSelect,
    selectedItems,
    selected,
    ...rest,
  });

  return (
    <div ref={ref} {...rest} style={{ display: "none" }}>
      {/* hiding this parent div as it is taking extra space */}
      <MUIMenu
        id="basic-menu"
        className="ia-styles ia-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...MenuProps}
      >
        {menuItems}
        {withActionButtons && withCheckbox && (
          <div>
            <hr className="ia-vertical-line" />
            <div className="ia-menu-action-button-container">
              <Button variant="tertiary" onClick={onTertiaryButtonClick}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onPrimaryButtonClick}>
                Apply
              </Button>
            </div>
          </div>
        )}
      </MUIMenu>
    </div>
  );
});
