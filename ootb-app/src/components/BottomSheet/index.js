import React, { useState, Fragment } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { ExpandMore, ExpandLess, Close } from "@mui/icons-material";
import "./BottomSheet.styles.scss";

export const BottomSheet = ({
  open,
  onClose,
  title,
  children,
  footerOptions,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const hasFooter = footerOptions && Object.keys(footerOptions)?.length > 0;

  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      className={`bottom-sheet ${isExpanded ? "expanded" : ""} ${hasFooter ? "with-footer" : ""}`}
      isBottomSheet={true}
      isExpanded={isExpanded}
      onExpand={handleExpandClick}
      footerOptions={footerOptions}
      {...props}
    >
      {children}
    </Modal>
  );
};
