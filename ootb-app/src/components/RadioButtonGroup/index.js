import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./RadioButtonGroup.styles.scss";

const RadioButton = ({
  selfProps: { icon, label, ...selfProps },
  parentProps,
}) => {
  const radioButtonClassName = useMemo(() => {
    let retVal = "ia-styles ia-radioButton";

    if (selfProps.disabled || parentProps.isDisabled)
      retVal += " ia-radioButton-disabled";
    if (selfProps.value === parentProps.selectedOption)
      retVal += " ia-radioButton-selected";

    return retVal;
  });

  return (
    <FormControlLabel
      {...parentProps}
      className={radioButtonClassName}
      control={<Radio disableRipple disableElevation />}
      disableRipple
      disableElevation
      label={label}
      disabled={parentProps.isDisabled}
      {...selfProps}
    />
  );
};

RadioButton.propTypes = {
  selfProps: PropTypes.shape({
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
  }),
  parentProps: PropTypes.shape({
    disabled: PropTypes.bool,
    selectedOption: PropTypes.string,
  }),
};

export const RadioButtonGroup = ({
  options,
  isDisabled,
  selectedOption,
  onChange,
  name,
  orientation,
  ...args
}) => {
  const getOrientation = (orientation) => {
    switch (orientation) {
      case "row":
        return "orientation-row";
      default:
        return "orientation-column";
    }
  };

  // console.log(orientation);

  return (
    <RadioGroup
      className={`ia-styles ia-radioGroup ${getOrientation(orientation)}`}
      aria-labelledby={name}
      disableRipple
      disableElevation
      value={selectedOption}
      onChange={onChange} //
      name={name}
      {...args}
    >
      {options.map((opt) => {
        return (
          <RadioButton
            key={opt.value}
            parentProps={{ ...args, isDisabled, selectedOption }}
            selfProps={opt}
          />
        );
      })}
    </RadioGroup>
  );
};

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape),
  selectedOption: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  orientation: PropTypes.string,
};
