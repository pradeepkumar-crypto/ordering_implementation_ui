import React from "react";
import { components } from "react-select";
import { Badge } from "../Badge";

export const CustomGroupHeading = (props) => {
  return (
    <div className="ia-select-group-heading-container">
      <components.GroupHeading {...props} />
      {props.customBadgeLabel && (
        <Badge
          label={props.customBadgeLabel}
          variant="subtle"
          size="small"
          color={props.customBadgeColor}
        />
      )}
    </div>
  );
};
