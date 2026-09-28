import React, { useEffect, useRef } from "react";
import { components } from "react-select";
import { Tooltip } from "../Tooltip";
import MUICheckbox from "@mui/material/Checkbox";
import { Checkbox } from "../Checkbox";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Add helper function to get selected children count
const getSelectedChildrenCount = (parent, selectedOptions) => {
  if (!parent.children || !selectedOptions || !Array.isArray(selectedOptions))
    return 0;
  const selectedParent = selectedOptions.find(
    (sel) => sel.value === parent.value,
  );
  return selectedParent ? selectedParent.children.length : 0;
};

// Helper to check if all children are selected
const areAllChildrenSelected = (option, selectedOptions) => {
  if (!option.children || !selectedOptions || !Array.isArray(selectedOptions))
    return false;
  const selectedParent = selectedOptions.find(
    (sel) => sel.value === option.value,
  );
  return (
    selectedParent && selectedParent.children.length === option.children.length
  );
};

export const Option = ({ isLoadingOption, customOptionProps, ...props }) => {
  const {
    data,
    isSelected,
    isMulti,
    isWithIcon,
    selectedOptions,
    initialOptions,
  } = props;

  const resolveComponent = (type) => {
    if (isMulti) {
      const hasChildren = data.children && data.children.length > 0;
      const selectedCount = hasChildren
        ? getSelectedChildrenCount(data, selectedOptions)
        : 0;
      const allChildrenSelected = hasChildren
        ? areAllChildrenSelected(data, selectedOptions)
        : false;

      return (
        <Checkbox
          withoutFormLabel={true}
          label={
            <div className="select-label-with-icon">
              {data.children ? (
                <>
                  {data.label.length > 25 ? (
                    <Tooltip
                      title={data.label}
                      orientation="right"
                      variant="tertiary"
                      className="select-tooltip"
                    >
                      <span>{data.label}</span>
                    </Tooltip>
                  ) : (
                    <span>{data.label}</span>
                  )}
                  {hasChildren && selectedCount > 0 && (
                    <span className="selected-children-count">
                      ({selectedCount})
                    </span>
                  )}
                </>
              ) : data.label.length > 25 ? (
                <Tooltip
                  title={data.label}
                  orientation="right"
                  variant="tertiary"
                  className="select-tooltip"
                >
                  <span>{data.label}</span>
                </Tooltip>
              ) : (
                <span>{data.label}</span>
              )}
            </div>
          }
          checked={isSelected}
          variant={
            hasChildren && selectedCount > 0 && !allChildrenSelected
              ? "dashed"
              : "default"
          }
          onChange={() => null}
          disabled={isLoadingOption}
        />
      );
    } else {
      // Handle non-multi case
      const isParentSelected =
        data.children &&
        data.children.some(
          (child) => selectedOptions && selectedOptions.value === child.value,
        );
      const isOptionSelected = isSelected || isParentSelected;

      return (
        <div
          className={`select-label-with-icon ${isOptionSelected ? "selected" : ""}`}
        >
          {data.children ? (
            <>
              {data.label.length > 25 ? (
                <Tooltip
                  title={data.label}
                  orientation="right"
                  variant="tertiary"
                  className="select-tooltip"
                >
                  <span>{data.label}</span>
                </Tooltip>
              ) : (
                <span>{data.label}</span>
              )}
            </>
          ) : data.label.length > 25 ? (
            <Tooltip
              title={data.label}
              orientation="right"
              variant="tertiary"
              className="select-tooltip"
            >
              <span>{data.label}</span>
            </Tooltip>
          ) : (
            <span>{data.label}</span>
          )}
        </div>
      );
    }
  };

  const renderOption = (type) => (
    <components.Option {...props}>
      <div
        className={`select-option-content ${
          props.isSelected ||
          (data.children &&
            data.children.some(
              (child) =>
                selectedOptions && selectedOptions.value === child.value,
            ))
            ? "selected"
            : ""
        }`}
        {...customOptionProps}
      >
        {resolveComponent(type)}
        {props.data.children && props.data.children.length > 0 && (
          <ChevronRightIcon className="select-submenu-chevron" />
        )}
      </div>
    </components.Option>
  );

  if (props.selectProps.isMulti && props.selectProps.isWithIcon) {
    return renderOption("isMulti-with-icon");
  }

  if (props.selectProps.isMulti && !props.selectProps.isWithIcon) {
    return renderOption("isMulti");
  }

  if (!props.selectProps.isMulti && props.selectProps.isWithIcon) {
    return renderOption("with-icon");
  }

  return renderOption(props.isMulti ? "isMulti" : "default");
};
