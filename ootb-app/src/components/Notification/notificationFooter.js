import React from "react";
import { Button } from "../Button";

export default function NotificationFooter({
  secondaryButtonLabel,
  onSecondaryButtonClick,
  primaryButtonLabel,
  onPrimaryButtonClick,
}) {
  if (!secondaryButtonLabel && !primaryButtonLabel) {
    return null;
  }
  return (
    <div className="impact-notification-footer-container">
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
  );
}
