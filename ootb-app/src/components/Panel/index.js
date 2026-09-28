import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button } from "../Button";
import "./Panel.styles.scss";

export function Panel({
  className,
  title,
  size,
  anchor = "right",
  open,
  setIsOpen,
  children,
  onClose,
  primaryButtonLabel,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  onSecondaryButtonClick,
  width,
}) {
  const toggleDrawer = (anchor, isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (onClose) {
      onClose();
    }
    setIsOpen(!open);
  };

  const getSize = (size) => {
    switch (size) {
      case "medium":
        return "impact_drawer_container_medium";
      default:
        return "impact_drawer_container_large";
    }
  };

  if (!secondaryButtonLabel && !primaryButtonLabel) {
    return (
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
        <div
          className={`impact_drawer_container ${getSize(size)} ${className}`}
          style={{ width: `${width}px` }}
        >
          <div className="impact_drawer_header">
            <div className="impact_drawer_heading">{title}</div>
            <span
              role="button"
              className="close_icon"
              onClick={toggleDrawer(anchor, false)}
            ></span>
          </div>
          <div
            className="impact_drawer_body"
            style={{ height: "calc(100% - 40px)" }}
          >
            {children}
          </div>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
      <div
        className={`impact_drawer_container ${getSize(size)} ${className}`}
        style={{ width: `${width}px` }}
      >
        <div className="impact_drawer_header">
          <div className="impact_drawer_heading">{title}</div>
          <span
            role="button"
            className="close_icon"
            onClick={toggleDrawer(anchor, false)}
          ></span>
        </div>
        <div className="impact_drawer_body">{children}</div>
        <div className="impact_drawer_footer">
          {secondaryButtonLabel && (
            <Button
              label={secondaryButtonLabel}
              variant="secondary"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonLabel}
            </Button>
          )}
          {primaryButtonLabel && (
            <Button label={primaryButtonLabel} onClick={onPrimaryButtonClick}>
              {primaryButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}
