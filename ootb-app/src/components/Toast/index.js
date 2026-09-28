import React from "react";
import Snackbar from "@mui/material/Snackbar";

import "./Toast.styles.scss";

export const Toast = ({
  isOpen = true,
  position = "top-right",
  message = "This is a toast",
  variant = "success",

  // autoHideDuration is dependent on onClose because it calls onClose after the duration is over
  onClose,
  autoHideDuration = 5000,
  ...args
}) => {
  const [vertical, horizontal] = position.split("-");

  return (
    <Snackbar
      {...args}
      anchorOrigin={{ vertical, horizontal }}
      className={`ia-styles ia-snackbar ia-snackbar-${variant}`}
      open={isOpen}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      message={message}
      key={vertical + horizontal}
    />
  );
};
