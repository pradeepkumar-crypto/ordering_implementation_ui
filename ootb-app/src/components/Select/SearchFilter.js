import React, { forwardRef, useRef, useState } from "react";
import { Checkbox } from "../Checkbox";

const SearchFilter = forwardRef(
  (
    {
      isClearable,
      onSearch,
      isMulti,
      onSelectAll,
      onClearAll,
      isSelectAll,
      selectedOptions,
      toggleSelectAll,
      isWithSearch,
      onKeyDown,
      searchPlaceholder,
      isLoading,
    },
    ref,
  ) => {
    return (
      <>
        {isWithSearch && (
          <input
            className="ia-select-search-box"
            placeholder={searchPlaceholder}
            ref={ref}
            onChange={onSearch}
            onKeyDown={onKeyDown}
          />
        )}
        {isMulti && toggleSelectAll && !isLoading && (
          <div className="ia-select-search-container">
            <div className="ia-select-selectAll-container">
              <Checkbox
                name="select-all"
                id="select-all"
                label={isSelectAll ? "Deselect All" : "Select All"}
                onChange={onSelectAll}
                checked={isSelectAll}
                //withoutFormLabel={true}
                className="select-selectAll-checkbox"
              />
              {isClearable && selectedOptions.length > 0 && (
                <button
                  className="ia-select-clear-all-button"
                  variant="url"
                  onClick={() => onClearAll()}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  },
);

export default SearchFilter;
