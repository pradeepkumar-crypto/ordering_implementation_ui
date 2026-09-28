import React from "react";
import { Button } from "../Button";

export default function PanelFooter({
  quaternaryButtonLabel,
  onQuaternaryButtonClick,
  tertiaryButtonLabel,
  onTertiaryButtonClick,
  secondaryButtonLabel,
  onSecondaryButtonClick,
  primaryButtonLabel,
  onPrimaryButtonClick,
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
  quaternaryButtonProps,
}) {
  return (
    <div className="impact_drawer_filter_footer">
      <div className="impact_drawer_filter_footer_left_container">
        {tertiaryButtonLabel ? (
          <Button
            label={tertiaryButtonLabel}
            variant="secondary"
            onClick={onTertiaryButtonClick}
            {...tertiaryButtonProps}
          >
            {tertiaryButtonLabel}
          </Button>
        ) : null}
        {quaternaryButtonLabel ? (
          <Button
            label={tertiaryButtonLabel}
            variant="secondary"
            onClick={onQuaternaryButtonClick}
            {...quaternaryButtonProps}
          >
            {quaternaryButtonLabel}
          </Button>
        ) : null}
      </div>
      <div className="impact_drawer_filter_footer_right_container">
        {secondaryButtonLabel ? (
          <Button
            label={secondaryButtonLabel}
            variant="secondary"
            onClick={onSecondaryButtonClick}
            {...secondaryButtonProps}
          >
            {secondaryButtonLabel}
          </Button>
        ) : null}
        {primaryButtonLabel ? (
          <Button
            label={primaryButtonLabel}
            onClick={onPrimaryButtonClick}
            {...primaryButtonProps}
          >
            {primaryButtonLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
