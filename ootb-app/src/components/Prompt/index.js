import React, { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Close } from "@mui/icons-material";

import { Button } from "../Button";

import "./Prompt.styles.scss";

export const Prompt = ({
  variant = "info",
  title,
  children,
  primaryButtonLabel,
  secondaryButtonLabel,
  isOpen,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  handleClose,
  ...args
}) => {
  const variantClassName = useMemo(() => {
    let retVal = "";
    switch (variant) {
      case "error":
        retVal = "ia-prompt-error";
        break;
      case "success":
        retVal = "ia-prompt-success";
        break;
      case "warning":
        retVal = "ia-prompt-warning";
        break;
      case "info":
      default:
        retVal = "ia-prompt-info";
        break;
    }

    return retVal;
  }, [variant]);

  return (
    <Dialog
      className={`ia-styles ia-prompt ${variantClassName}`}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...args}
    >
      <div onClick={handleClose} className="ia-prompt-close-button">
        {handleClose && <Close className="ia-prompt-close-icon" />}
      </div>
      <DialogContent>
        <div className={`ia-prompt-info-icon-container ${variantClassName}`} />
        <DialogTitle className={`ia-dialog-title ${variantClassName}`}>
          {title}
        </DialogTitle>
        <DialogContentText className="ia-dialog-content">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {secondaryButtonLabel ? (
          <Button
            onClick={onSecondaryButtonClick}
            label={secondaryButtonLabel}
            variant="text"
          >
            {secondaryButtonLabel}
          </Button>
        ) : null}
        {primaryButtonLabel && variant !== "success" ? (
          <Button
            onClick={onPrimaryButtonClick}
            label={primaryButtonLabel}
            autoFocus
            type={variant === "error" ? "destructive" : ""}
          >
            {primaryButtonLabel}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

Prompt.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  primaryButtonLabel: PropTypes.string,
  secondaryButtonLabel: PropTypes.string,
  handleClose: PropTypes.func,
  onPrimaryButtonClick: PropTypes.func,
  onSecondaryButtonClick: PropTypes.func,
  isOpen: PropTypes.bool,
};
