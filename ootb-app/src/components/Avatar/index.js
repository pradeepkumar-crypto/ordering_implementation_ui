import React, { useMemo } from "react";
import PropTypes from "prop-types";
import MUIAvatar from "@mui/material/Avatar";
import "./Avatar.styles.scss";

export const Avatar = ({
  label = "Unknown",
  type = "withoutPicture",
  src = undefined,
  size = "large",
  ...args
}) => {
  const initials =
    type !== "withPicture"
      ? label
          ?.trim()
          .split(" ")
          .filter((e) => e)
          .map((e) => e[0].toUpperCase())
          .join("")
      : "";

  const className = useMemo(() => {
    let retVal = "ia-styles ia-avatar";

    switch (size) {
      case "small":
        retVal += " ia-avatar-small";
        break;
      case "medium":
        retVal += " ia-avatar-medium";
        break;
      case "large":
      default:
        retVal += " ia-avatar-large";
        break;
    }

    return retVal;
  }, [type, size]);

  return (
    <MUIAvatar
      {...args}
      className={className}
      src={(type === "withPicture" && src) || undefined}
    >
      {initials.substring(0, type === "onlyName" ? 1 : 2)}
    </MUIAvatar>
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
};
