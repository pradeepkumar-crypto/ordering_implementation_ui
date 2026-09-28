import React from "react";
import { Button } from "../Button";
import "./EmptyState.styles.scss";

export function EmptyState({
  heading,
  description,
  secondaryButtonLabel,
  onSecondaryButtonClick,
  primaryButtonLabel,
  onPrimaryButtonClick,
  emptyStateIcon = null,
  emptyStateBottomOptions = null,
}) {
  return (
    <div className="impact_emptystate">
      <div
        className={`impact_center_svg ${
          emptyStateIcon ? "impact_center_svg_with_icon" : ""
        }`}
      >
        {emptyStateIcon}
      </div>
      <div className="impact_heading">{heading}</div>
      <div className="impact_paragraph">{description}</div>
      <div className="bottom_cta_container">
        {/* Both the buttons needs to be replaced with design system buttons */}
        {secondaryButtonLabel && (
          <Button
            className="secondary_btn"
            variant="secondary"
            onClick={onSecondaryButtonClick}
          >
            {secondaryButtonLabel}
          </Button>
        )}
        {primaryButtonLabel && (
          <Button className="primary_btn" onClick={onPrimaryButtonClick}>
            {primaryButtonLabel}
          </Button>
        )}
        {emptyStateBottomOptions}
      </div>
    </div>
  );
}
