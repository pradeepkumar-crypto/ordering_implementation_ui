import React, { forwardRef, useRef, useState } from "react";
import { Tag } from "../Tag";
import { Tooltip } from "../Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const SelectedOptionsTags = ({ selectedOptions, onChange }) => {
  const optionListTagRef = useRef(null);
  const [isSelectedOptionsTagListOpen, setSelectedOptionsTagListOpen] =
    useState(false);

  const handleOptionTagRemove = (option) => {
    const updatedOptions = selectedOptions.filter(
      (op) => op.value !== option.value,
    );
    onChange(updatedOptions);
  };
  return (
    <div className="select-options-tag-group">
      {selectedOptions.length > 0 ? (
        <>
          {/* to only display first 3 selected options under select */}
          {selectedOptions.slice(0, 3).map((option, index) => {
            return (
              <SelectedOptionTag
                orientation="bottom"
                key={index}
                label={option.label}
                onClose={() => handleOptionTagRemove(option)}
                className="selected-option-tag"
              />
            );
          })}
          {/* rest of the options are hidden and displayed in the popup list */}
          {selectedOptions.length > 3 && (
            <>
              <div className="tag-group-open" ref={optionListTagRef}>
                <Tag
                  size="small"
                  onClick={(e) => {
                    setSelectedOptionsTagListOpen((prevState) => !prevState);
                  }}
                  label={<span className="tag-group-more" />}
                />
              </div>
              {isSelectedOptionsTagListOpen && (
                <SelectedOptionsTagList
                  selectedOptions={selectedOptions}
                  ref={optionListTagRef}
                  handleOptionTagRemove={handleOptionTagRemove}
                  className="selected-option-tag"
                />
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export const SelectedOptionsTagList = forwardRef(
  ({ selectedOptions, handleOptionTagRemove }, ref) => {
    return (
      <div
        className="select-options-tag-list"
        style={{
          top: ref.current?.offsetTop + 25,
          left: ref.current?.offsetLeft,
        }}
      >
        {/* to display rest of the options in list */}
        {selectedOptions.slice(3, selectedOptions.length).map((option) => {
          return (
            <SelectedOptionTag
              orientation="right"
              label={option.label}
              onClose={() => handleOptionTagRemove(option)}
            />
          );
        })}
      </div>
    );
  },
);

const SelectedOptionTag = ({ orientation, onClose, label }) => {
  return (
    <Tooltip
      title={label}
      orientation={orientation}
      trigger="hover"
      variant="primary"
    >
      <span>
        <Tag size="small" isRemovable onDelete={onClose} label={label} />
      </span>
    </Tooltip>
  );
};
