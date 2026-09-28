import React, { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";
import MUIMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function WithDropDown({
  defaultChecked,
  checked,
  onChange,
  isRequired,
  isDisabled,
  label,
  dropDownData,
  ...args
}) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const isOpen = Boolean(anchorEl);

  const onClose = () => {
    setAnchorEl(null);
    setOpenDropDown((prev) => !prev);
  };

  const hanldeClick = (event) => {
    setOpenDropDown((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="impact-form-checkbox">
      <div
        onClick={hanldeClick}
        style={{ display: "flex", alignItems: "center" }}
      >
        <FormControlLabel
          className={`impact-form-checkbox-container ${
            checked || defaultChecked ? "checked" : ""
          }`}
          control={
            <MUICheckbox
              {...args}
              className="impact-checkbox-container default-variant"
              defaultChecked={defaultChecked}
              checked={checked}
              onChange={onChange}
              disabled={isDisabled}
              disableRipple={true}
            />
          }
          required={isRequired}
          disabled={isDisabled}
          label={label}
        />
        <KeyboardArrowDown
          className={`impact-arrow-button ${openDropDown ? "up" : "down"}`}
        />
      </div>
      <MUIMenu
        id="basic-menu"
        className="ia-styles ia-checkbox-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dropDownData.map((opt) => {
          return (
            <MenuItem
              onClick={() => {
                setSelected((prev) => (prev === opt.value ? null : opt.value));
                opt.onClick && opt.onClick();
                onClose();
              }}
              key={opt.label}
              disableRipple
              disableTouchRipple
              disabled={opt.disabled}
              selected={selected === opt.value}
            >
              {opt.label}
            </MenuItem>
          );
        })}
      </MUIMenu>
    </div>
  );
}
