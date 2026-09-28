import React from "react";
import MUISlider from "@mui/material/Slider";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./Sliders.styles.scss";

export function Slider({
  headerOrientation = "top",
  header,
  label,
  inputPlaceholder,
  value = 0,
  onChange,
  required,
  disabled,
  min = 0,
  max = 100,
  variant = "default",
  inputPosition = "inline",
  ...args
}) {
  const isRangedSlider =
    Array.isArray(value) && variant == "ranged" && value.length == 2;
  let primaryValue;
  let secondaryValue;

  if (Array.isArray(value) && value.length == 2) {
    primaryValue = value[0];
    secondaryValue = value[1];
  }

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    // Ignore if the value is not a number
    if (isNaN(value)) return;
    e.persist(); // unpool the event

    // passing fakeEvent to maintain stability of values received from slider and input field
    const fakeEvent = {
      ...e,
      target: {
        ...e.target,
        value: [],
      },
    };
    if (key == "min") {
      if (Number(value) < min || Number(value) > secondaryValue) return;
      fakeEvent.target.value = [Number(value), secondaryValue];
      onChange(fakeEvent, key);
    } else if (key == "max") {
      if (Number(value) > max || Number(value) < primaryValue) return;
      fakeEvent.target.value = [primaryValue, Number(value)];
      onChange(fakeEvent, key);
    } else {
      onChange(e, key);
    }
  };

  return (
    <div
      className={`impact_slider_layout slider-container${
        headerOrientation === "top" ? "header-top" : "header-left"
      } input-position-${inputPosition}`}
    >
      {isRangedSlider && inputPosition == "inline" && (
        <div className="input_layout_style ranged ranged-start">
          <form noValidate autoComplete="off">
            <FormControl>
              <OutlinedInput
                value={isRangedSlider ? primaryValue : value}
                onChange={(e) => {
                  handleInputChange(e, isRangedSlider ? "min" : "");
                }}
              />
            </FormControl>
          </form>
        </div>
      )}
      <div className="impact_slider_container">
        {header && <div className="impact_slider_layout_heading">{header}</div>}
        {label && (
          <label className="impact_slider_labelname">
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <div
          className={`impact_slider_main_container ${
            disabled && "impact_slider_disabled"
          }`}
        >
          <MUISlider
            {...args}
            defaultValue={value}
            value={value}
            onChange={onChange}
            disabled={disabled}
            max={max}
            min={min}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </div>
      </div>

      <div
        className={`input_layout_style ${isRangedSlider ? "ranged" : "single"}`}
      >
        <form noValidate autoComplete="off">
          <FormControl>
            {(!isRangedSlider || inputPosition == "bottom") && (
              <OutlinedInput
                value={isRangedSlider ? primaryValue : value}
                onChange={(e) => {
                  handleInputChange(e, isRangedSlider ? "min" : "");
                }}
              />
            )}
            {isRangedSlider && (
              <OutlinedInput
                value={secondaryValue}
                onChange={(e) => {
                  handleInputChange(e, "max");
                }}
              />
            )}
          </FormControl>
        </form>
      </div>
    </div>
  );
}
