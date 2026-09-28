import React, { useMemo } from "react";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropTypes from "prop-types";

import "./Breadcrumbs.styles.scss";
import { Menu } from "../Menu";

export const HomeIcon = () => {
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.0013 11.1654H4.0013V7.83203C4.0013 7.64314 4.06519 7.48481 4.19297 7.35703C4.32075 7.22925 4.47908 7.16536 4.66797 7.16536H7.33464C7.52352 7.16536 7.68186 7.22925 7.80964 7.35703C7.93741 7.48481 8.0013 7.64314 8.0013 7.83203V11.1654H10.0013V5.16536L6.0013 2.16536L2.0013 5.16536V11.1654ZM0.667969 11.1654V5.16536C0.667969 4.95425 0.715191 4.75425 0.809635 4.56536C0.90408 4.37648 1.03464 4.22092 1.2013 4.0987L5.2013 1.0987C5.43464 0.92092 5.7013 0.832031 6.0013 0.832031C6.3013 0.832031 6.56797 0.92092 6.8013 1.0987L10.8013 4.0987C10.968 4.22092 11.0985 4.37648 11.193 4.56536C11.2874 4.75425 11.3346 4.95425 11.3346 5.16536V11.1654C11.3346 11.532 11.2041 11.8459 10.943 12.107C10.6819 12.3681 10.368 12.4987 10.0013 12.4987H7.33464C7.14575 12.4987 6.98741 12.4348 6.85964 12.307C6.73186 12.1793 6.66797 12.0209 6.66797 11.832V8.4987H5.33464V11.832C5.33464 12.0209 5.27075 12.1793 5.14297 12.307C5.01519 12.4348 4.85686 12.4987 4.66797 12.4987H2.0013C1.63464 12.4987 1.32075 12.3681 1.05964 12.107C0.798524 11.8459 0.667969 11.532 0.667969 11.1654Z"
        fill="#60697D"
      />
    </svg>
  );
};

export const Breadcrumbs = ({ list }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const breadCrumbList = useMemo(() => {
    const temp = list
      .filter((_i, idx) => idx < 2 || idx > list.length - 3)
      .map((item, index, arr) => {
        if (index < arr.length - 1) {
          return (
            <Link
              underline="none"
              key={item.label}
              className={`ia-styles ia-breadcrumb ${
                item.label === "Home" ? "ia-breadcrumb-home" : ""
              } ${item.disabled ? "ia-breadcrumb-disabled" : ""}`}
              href={(!item.disabled && item.to) || undefined}
              onClick={(!item.disabled && item.onClick) || undefined}
            >
              {item.label === "Home" ? <HomeIcon /> : item.label}
            </Link>
          );
        }

        return (
          <span
            key={item.label}
            className="ia-styles ia-breadcrumb ia-breadcrumb-noLink"
          >
            {item.label}
          </span>
        );
      });

    const extras = list.filter((_i, idx) => idx >= 2 && idx <= list.length - 3);

    if (extras.length > 0) {
      temp[1] = (
        <div style={{ display: "inline-flex" }}>
          {temp[1]}
          <div
            key="extras"
            className="ia-styles ia-breadcrumb ia-breadcrumb-extras"
          >
            <MoreHorizIcon onClick={handleClick} />
            <Menu
              open={isOpen}
              anchorEl={anchorEl}
              onClose={onClose}
              options={extras.map((e) => {
                return {
                  ...e,
                  label: e.label,
                  onClick: e.onClick || (() => window.open(e.to)),
                };
              })}
            />
          </div>
        </div>
      );
    }
    return temp;
  }, [list, isOpen]);

  return (
    <MUIBreadcrumbs separator="›" aria-label="breadcrumb">
      {breadCrumbList}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
    }),
  ),
};
