import React from "react";
import Box from "@mui/material/Box";
import MUIModal from "@mui/material/Modal";

import { Button } from "../Button";

import "./Modal.styles.scss";

export const Modal = ({
  className = "",
  title,
  size = "medium",
  children,
  primaryButtonLabel,
  secondaryButtonLabel,
  open,
  onPrimaryButtonClick,
  primaryButtonProps,
  onSecondaryButtonClick,
  secondaryButtonProps,
  onClose,
  width,
  height,
  footerOptions,
  isBottomSheet = false,
  isExpanded = false,
  onExpand,
  ...args
}) => {
  const modalClasses = [
    "ia_modalPopover",
    `ia_modal_${size}`,
    className,
    isBottomSheet ? "is-bottom-sheet" : "",
    isExpanded ? "expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // ensures that it wont break existing logic of not rendering footer
  if (!primaryButtonLabel && !secondaryButtonLabel) {
    return (
      <MUIModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...args}
      >
        <Box className={modalClasses} style={{ width: width, height: height }}>
          <div className="ia_modalHeader">
            <div className="ia_modalHeading">{title}</div>
            <div className="modal-actions">
              {isBottomSheet && (
                <span
                  className={isExpanded ? "collapse_icon" : "expand_icon"}
                  onClick={onExpand}
                />
              )}
              <span className="close_icon" onClick={onClose} />
            </div>
          </div>

          <div className="ia_modalBody">{children}</div>
          {footerOptions && (
            <div className="ia_modalFooter">{footerOptions}</div>
          )}
        </Box>
      </MUIModal>
    );
  }

  return (
    <MUIModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...args}
    >
      <Box className={modalClasses} style={{ width: width, height: height }}>
        <div className="ia_modalHeader">
          <div className="ia_modalHeading">{title}</div>
          <div className="modal-actions">
            {isBottomSheet && (
              <span
                className={isExpanded ? "collapse_icon" : "expand_icon"}
                onClick={onExpand}
              />
            )}
            <span className="close_icon" onClick={onClose} />
          </div>
        </div>

        <div className="ia_modalBody">{children}</div>
        <div className="ia_modalFooter">
          {secondaryButtonLabel && (
            <Button
              onClick={onSecondaryButtonClick}
              label={secondaryButtonLabel}
              variant="url"
              {...secondaryButtonProps}
            >
              {secondaryButtonLabel}
            </Button>
          )}
          {primaryButtonLabel && (
            <Button
              onClick={onPrimaryButtonClick}
              label={primaryButtonLabel}
              autoFocus
              {...primaryButtonProps}
            >
              {primaryButtonLabel}
            </Button>
          )}
        </div>
      </Box>
    </MUIModal>
  );
};
