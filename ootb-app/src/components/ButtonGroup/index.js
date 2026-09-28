import React, { useMemo } from "react";
import PropTypes from "prop-types";
import MUIToggleButton from "@mui/material/ToggleButton";
import MUIButtonGroup from "@mui/material/ToggleButtonGroup";
import "./ButtonGroup.styles.scss";

const ToggleButton = ({
  selfProps: { icon, label, ...selfProps },
  parentProps: { selectedOption, isDisabled },
}) => {
  const buttonClassName = useMemo(() => {
    let retVal = "ia-styles ia-buttonGroupButton";

    if (selfProps.disabled || isDisabled)
      retVal += " ia-buttonGroupButton-disabled";
    if (selfProps.value === selectedOption)
      retVal += " ia-buttonGroupButton-selected";
    if (icon) retVal += " ia-buttonGroupButton-withIcon";

    return retVal;
  });

  return (
    <MUIToggleButton className={buttonClassName} disableRipple {...selfProps}>
      {icon}
      {label}
    </MUIToggleButton>
  );
};

ToggleButton.propTypes = {
  selfProps: PropTypes.shape({
    icon: PropTypes.node,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
  }),
  parentProps: PropTypes.shape({
    isDisabled: PropTypes.bool,
    selectedOption: PropTypes.string,
  }),
};

export const ButtonGroup = ({
  options,
  selectedOption,
  isDisabled = false,
  onChange,
  ...args
}) => {
  // const ref = useRef();

  const groupClassName = useMemo(() => {
    let retVal = "ia-styles ia-buttonGroup";

    if (isDisabled) retVal += " ia-buttonGroup-disabled";

    return retVal;
  }, [isDisabled]);

  return (
    <MUIButtonGroup
      {...args}
      className={groupClassName}
      orientation="horizontal"
      value={selectedOption}
    >
      {options.map((opt) => (
        <ToggleButton
          key={opt.value}
          parentProps={{ isDisabled, selectedOption }}
          selfProps={{ onClick: onChange, ...opt }}
        />
      ))}
    </MUIButtonGroup>
  );
};

ButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape),
  selectedOption: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};
