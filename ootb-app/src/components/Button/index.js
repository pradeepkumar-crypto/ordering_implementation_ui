import React, { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import MUIButton from "@mui/material/Button";
import "./Button.styles.scss";

export const Button = forwardRef(
  (
    {
      children,
      size = "large",
      variant = "contained",
      loading = false,
      icon = undefined,
      iconPlacement = "left",
      disabled,
      className,
      type = "default",
      ...args
    },
    ref,
  ) => {
    // Create a single object with all event handlers and other props
    const buttonProps = {
      ref,
      className,
      disabled,
      type,
      ...args,
    };

    const convertedVariant = useMemo(() => {
      switch (variant) {
        case "secondary":
        case "outlined":
          return "outlined";
        case "tertiary":
          return "tertiary";
        case "text":
          return "text";
        case "url":
          return "link";
        case "primary":
        default:
          return "contained";
      }
    }, [variant]);

    const classStr = useMemo(() => {
      let retVal = `ia-styles ia-btn ${
        type == "destructive" && "ia-btn-destructive"
      } ${className}`;

      switch (convertedVariant) {
        case "outlined":
          retVal += " ia-btn-outlined";
          break;
        case "link":
          retVal += " ia-btn-link";
          break;
        case "text":
          retVal += " ia-btn-text";
          break;
        case "tertiary":
          retVal += " ia-btn-tertiary";
          break;
        case "contained":
        default:
          retVal += " ia-btn-contained";
          break;
      }

      switch (size) {
        case "small":
          retVal += " ia-btn-small";
          break;
        case "medium":
          retVal += " ia-btn-medium";
          break;
        case "large":
        default:
          retVal += " ia-btn-large";
          break;
      }

      if (disabled) {
        retVal += " ia-btn-disabled";
      }

      if (icon) {
        if (children) {
          retVal += " ia-btn-with-icon";
        } else retVal += " ia-btn-only-icon";
      }

      return retVal;
    }, [children, convertedVariant, size, loading, disabled, icon, type]);

    const finalLabel =
      variant === "url" && !disabled && loading && children
        ? "Loading..."
        : children;

    const finalIcon = icon ? (
      <div className={`ia-btn-icon ${loading ? "ia-btn-icon-loading" : ""}`}>
        {loading && (convertedVariant !== "link" || !children) ? (
          <div className="ia-btn-loading-icon">
            <span
              className={`ia-btn-loading-track ia-btn-loading-${
                convertedVariant === "contained" ? "dark" : "light"
              }`}
            />
          </div>
        ) : (
          icon
        )}
      </div>
    ) : null;

    if (iconPlacement === "right") {
      return (
        <MUIButton
          {...buttonProps}
          disabled={disabled}
          className={classStr}
          disableRipple
          disableElevation
        >
          {finalLabel}
          {finalIcon}
        </MUIButton>
      );
    }

    return (
      <MUIButton
        {...buttonProps}
        type={type}
        disabled={disabled}
        className={classStr}
        disableRipple
        disableElevation
      >
        {finalIcon}
        {finalLabel}
      </MUIButton>
    );
  },
);

Button.displayName = "Button";

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  iconPlacement: PropTypes.string,
  type: PropTypes.string,
};
