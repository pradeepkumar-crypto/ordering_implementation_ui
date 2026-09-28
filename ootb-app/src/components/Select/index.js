import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Alert } from "../Alert";
import ReactSelect from "react-select";
import Dropdown from "./dropdown";
import { SelectedOptionsTags } from "./selected-option-tags";
import SearchFilter from "./SearchFilter";
import { MenuList } from "./menuList";
import { Option } from "./optionList";
import { Checkbox } from "../Checkbox";
import { Toast } from "../Toast";
import { Tooltip } from "../Tooltip";
import { CustomGroupHeading } from "./customGroupHeading";
import {
  handleSelectAll,
  handleClearAll,
  handleSearch,
  handleDropdownClose,
  handleDropdownOpen,
  getPlaceholder,
  onKeyDown,
  handleSelectAllWhenCompLoads,
  flattenOptions,
} from "./utils";
import "./Select.styles.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const selectStyles = {
  menu: () => ({}), // to remove default menu styles
};

export const Select = React.memo((props) => {
  const {
    isOpen,
    setIsOpen,
    label,
    isRequired,
    name,
    placeholder,
    searchPlaceholder = "Search here...",
    labelOrientation = "top",
    isMulti = false,
    isDisabled,
    isLoading,
    isWithIcon,
    isError,
    isWithSearch,
    isClearable,
    isWithSelectedOptionTags,
    toggleSelectAll,
    isSelectAll,
    icon,
    withPortal,
    dropDownPortalClassName,
    initialOptions,
    currentOptions,
    setCurrentOptions,
    selectedOptions = [],
    setSelectedOptions,
    portalContainer = document.body,
    isAgGridCellRenderer,
    onMenuScrollToBottom,
    setIsSelectAll,
    isWithSelectAll,
    isCloseWhenClickOutside = true,
    handleChange: externalOnChange,
    onSelectAll: externalOnSelectAll,
    onClearAll: externalOnClearAll,
    onSearch: externalOnSearch,
    onDropdownClose: externalOnDropdownClose,
    onDropdownOpen: externalOnDropdownOpen,
    minWidth,
    width,
    menuShouldBlockScroll = false,
    onBlur,
    isGrouped,
    selectId,
    column,
    customPlaceholderAfterSelect,
    isMultiInSubmenu = false,
    customBadgeLabel,
    customBadgeColor = "success",
  } = props;

  const [submenuOptions, setSubmenuOptions] = useState(null);
  const [submenuParent, setSubmenuParent] = useState(null);
  const flattenInitialOptions = flattenOptions(initialOptions);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const searchBarRef = useRef(null);
  const containerRef = useRef(null);
  const focusedIndex = useRef(0);
  const dropdownButtonRef = useRef(null);
  const textSpanRef = useRef(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const memoizedOptions = useMemo(() => currentOptions, [currentOptions]);
  const submenuTimeoutRef = useRef(null);
  const [submenuPosition, setSubmenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownMenuRef = useRef(null);
  const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);

  // Get column width from column state
  const [columnWidth, setColumnWidth] = useState(
    (column?.getActualWidth?.() || column?.getWidth?.()) - 12
  );

  // Check if text is truncated
  useEffect(() => {
    if (textSpanRef.current) {
      const isTruncated =
        textSpanRef.current.scrollWidth > textSpanRef.current.clientWidth;
      setIsTextTruncated(isTruncated);
    }
  }, [columnWidth, currentOptions, selectedOptions, placeholder]);

  // Add effect to force re-render on column width changes
  useEffect(() => {
    if (isAgGridCellRenderer && column) {
      const handleColumnResized = () => {
        const newWidth = column.getActualWidth?.() || column.getWidth?.();
        setColumnWidth(newWidth - 12);
      };

      column.addEventListener("widthChanged", handleColumnResized);
      return () => {
        column.removeEventListener("widthChanged", handleColumnResized);
      };
    }
  }, [isAgGridCellRenderer, column, columnWidth]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        isCloseWhenClickOutside &&
        !event.target.closest(".ia-select-container-v3-styled-menu")
      ) {
        if (isOpen) {
          handleDropdownClose({
            externalOnDropdownClose,
            setCurrentOptions,
            initialOptions: isGrouped ? flattenInitialOptions : initialOptions,
            currentOptions,
            setIsOpen,
            onBlur,
            event,
          });
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    containerRef,
    isCloseWhenClickOutside,
    externalOnDropdownClose,
    setIsOpen,
    isOpen,
    currentOptions,
  ]);

  useEffect(() => {
    if (isWithSelectAll) {
      handleSelectAllWhenCompLoads({
        currentOptions,
        selectedOptions,
        setSelectedOptions,
        ...props,
      });
    }
  }, [isWithSelectAll]);

  const handleSelect = useCallback(
    (selectedValues, event, index) => {
      if (event?.action === "clear") {
        if (externalOnChange) {
          externalOnChange([], event, index);
        }
        return;
      }

      // Multi-select: handle parent with children
      if (isMulti) {
        let newSelectedOptions = Array.isArray(selectedOptions)
          ? [...selectedOptions]
          : [];
        const option = event?.option || selectedValues;
        const isParent =
          option && option.children && option.children.length > 0;
        const isSelected = newSelectedOptions.some(
          (sel) => sel.value === option.value
        );

        if (isParent) {
          // If selecting a parent
          if (!isSelected) {
            // Add parent with all its children
            newSelectedOptions.push({
              ...option,
              children: option.children,
            });
          } else {
            // Remove parent and all its children
            newSelectedOptions = newSelectedOptions.filter(
              (sel) => sel.value !== option.value
            );
          }
        } else {
          // If selecting a child or a regular option
          const parentOption = (initialOptions || []).find(
            (parent) =>
              parent.children &&
              parent.children.some((child) => child.value === option.value)
          );

          if (parentOption) {
            // Handle child selection
            const parentIndex = newSelectedOptions.findIndex(
              (sel) => sel.value === parentOption.value
            );

            if (isSelected) {
              // Remove the child from parent's children
              if (parentIndex !== -1) {
                const parent = newSelectedOptions[parentIndex];
                parent.children = parent.children.filter(
                  (child) => child.value !== option.value
                );

                // If no children left, remove the parent
                if (parent.children.length === 0) {
                  newSelectedOptions = newSelectedOptions.filter(
                    (sel) => sel.value !== parentOption.value
                  );
                }
              }
            } else {
              // Add the child to parent's children
              if (parentIndex !== -1) {
                // Parent exists, add child to its children if not already present
                const parent = newSelectedOptions[parentIndex];
                if (
                  !parent.children.some((child) => child.value === option.value)
                ) {
                  parent.children.push(option);
                }
              } else {
                // Parent doesn't exist, add parent with this child
                newSelectedOptions.push({
                  ...parentOption,
                  children: [option],
                });
              }
            }
          } else {
            // Handle regular option selection (no parent)
            if (isSelected) {
              // Remove the option
              newSelectedOptions = newSelectedOptions.filter(
                (sel) => sel.value !== option.value
              );
            } else {
              // Add the option
              newSelectedOptions.push(option);
            }
          }
        }

        setSelectedOptions(newSelectedOptions);
        setIsSelectAll(newSelectedOptions.length === initialOptions.length);

        if (externalOnChange) {
          externalOnChange(newSelectedOptions, event, index);
        }
        return;
      }

      if (isGrouped && isMulti) {
        const flattenSelectedValues = flattenOptions(selectedValues);
        setSelectedOptions(flattenSelectedValues);
        setIsSelectAll(
          flattenSelectedValues.length === flattenInitialOptions.length
        );
        if (externalOnChange) {
          externalOnChange(flattenSelectedValues, event, index);
        }
      } else {
        setSelectedOptions(selectedValues);
        if (externalOnChange) {
          externalOnChange(selectedValues, event, index);
        }
      }

      if (isMulti && !isGrouped) {
        if (initialOptions.length > 0)
          setIsSelectAll(selectedValues.length === initialOptions.length);
        else setIsSelectAll(selectedValues.length === currentOptions.length);
      }

      if (!isMulti) {
        handleDropdownClose({
          externalOnDropdownClose,
          setCurrentOptions,
          initialOptions,
          currentOptions,
          setIsOpen,
          undefined, // TODO: implement other solution for single select
          event,
        });
      }
    },
    [
      isMulti,
      setIsSelectAll,
      setIsOpen,
      externalOnChange,
      initialOptions,
      onBlur,
      selectedOptions,
      setSelectedOptions,
      setIsSelectAll,
      flattenInitialOptions,
      isGrouped,
      currentOptions,
    ]
  );

  // Helper to sync parent/child selection after any change
  function syncParentChildSelection(selectedArr) {
    // Only one level deep
    if (!selectedArr || selectedArr.length === 0) {
      setSelectedOptions([]);
      setIsSelectAll(false);
      return;
    }
    let updated = [...selectedArr];
    (initialOptions || []).forEach((parent) => {
      if (parent.children && parent.children.length > 0) {
        const allChildrenSelected = parent.children.every((child) =>
          updated.some((sel) => sel.value === child.value)
        );
        const parentSelected = updated.some(
          (sel) => sel.value === parent.value
        );
        if (allChildrenSelected && !parentSelected) {
          updated.push(parent);
        } else if (!allChildrenSelected && parentSelected) {
          updated = updated.filter((sel) => sel.value !== parent.value);
        }
      }
    });
    setSelectedOptions(updated);
    setIsSelectAll(
      updated.length ===
        (initialOptions.length > 0
          ? initialOptions.length
          : currentOptions.length)
    );
  }

  const handleOptionHover = useCallback(
    (option, index, event) => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
      if (option?.children?.length > 0) {
        const optionNode = event?.currentTarget;
        const dropdownRect = dropdownMenuRef.current?.getBoundingClientRect();
        const optionRect = optionNode?.getBoundingClientRect();
        if (dropdownRect && optionRect) {
          setSubmenuPosition({
            top: optionRect.top - dropdownRect.top,
            left: dropdownRect.width + 12,
            width: dropdownRect.width,
          });
        }
        setSubmenuOptions(option.children);
        setSubmenuParent(option);
        setIsSubmenuHovered(true);
      } else {
        setIsSubmenuHovered(false);
        setSubmenuOptions(null);
        setSubmenuParent(null);
      }
    },
    [isSubmenuHovered]
  );

  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  // Helper to get all options (parents and children)
  function getAllOptions(options) {
    let all = [];
    (options || []).forEach((opt) => {
      all.push(opt);
      if (opt.children && opt.children.length > 0) {
        all = all.concat(getAllOptions(opt.children));
      }
    });
    return all;
  }

  // Update handleSelectAll logic
  function handleSelectAllWrapper({
    event,
    externalOnChange,
    setIsSelectAll,
    initialOptions,
    setSelectedOptions,
  }) {
    if (externalOnSelectAll) {
      externalOnSelectAll(event);
    } else {
      if (event && event.target.checked) {
        setIsSelectAll(true);

        //currentOptions without selectedOptions
        const restCurrentOptions = currentOptions.filter(
          (option) =>
            !selectedOptions.find(
              (selectedOption) =>
                selectedOption.label === option.label &&
                option.value === selectedOption.value
            )
        );
        setSelectedOptions([...selectedOptions, ...restCurrentOptions]);
        if (externalOnChange)
          externalOnChange([...selectedOptions, ...restCurrentOptions]);
      } else {
        setIsSelectAll(false);
        setSelectedOptions([]);
        if (externalOnChange) externalOnChange([]);
      }
    }
  }

  // Update handleSelectAllWhenCompLoads logic
  function handleSelectAllWhenCompLoadsWrapper({
    currentOptions,
    selectedOptions,
    setSelectedOptions,
  }) {
    setSelectedOptions(getAllOptions(currentOptions));
  }

  // Update handleClearAll logic
  function handleClearAllWrapper({
    externalOnClearAll,
    setSelectedOptions,
    setIsSelectAll,
    handleSelect,
    syncParentChildSelection,
  }) {
    if (externalOnClearAll) {
      externalOnClearAll();
      setSelectedOptions([]);
      setIsSelectAll(false);
    } else {
      handleSelect([], { action: "clear" });
      setSelectedOptions([]);
      setIsSelectAll(false);
    }
    syncParentChildSelection([]);
  }

  if (isMulti && !setIsSelectAll) {
    return (
      <Alert
        description="isMulti cannot be used without isSelectAll & setIsSelectAll"
        title="Select Error"
        severity="error"
      />
    );
  }

  return (
    <div
      className={`ia-select-main-container-v3 ${
        labelOrientation == "top" ? "top-orientation" : ""
      } ${isAgGridCellRenderer ? "isAgGridCellRenderer" : ""}`}
    >
      {label && (
        <div className="ia-select-label-v3">
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: isAgGridCellRenderer ? "100%" : "auto",
          minWidth: isAgGridCellRenderer ? "0" : "auto",
          maxWidth: isAgGridCellRenderer ? columnWidth || "100%" : "none",
        }}
      >
        <Dropdown
          isOpen={isOpen}
          onClose={(event) => {
            handleDropdownClose({
              externalOnDropdownClose,
              setCurrentOptions,
              initialOptions,
              currentOptions,
              setIsOpen,
              onBlur,
              event,
            });
          }}
          disabled={isDisabled}
          containerRef={containerRef}
          withPortal={withPortal}
          portalContainer={portalContainer}
          dropDownPortalClassName={dropDownPortalClassName}
          dropdownButtonRef={dropdownButtonRef}
          target={
            <>
              <button
                name={name}
                id={selectId}
                className={`ia-select-styled-dropdown-main-button${
                  isError ? "impact-select-error" : ""
                } ${isDisabled ? "impact-select-disabled" : ""}`}
                style={{
                  minWidth: isAgGridCellRenderer ? "0" : minWidth ?? "240px",
                  width: isAgGridCellRenderer
                    ? "100%"
                    : width ?? minWidth ?? "240px",
                  maxWidth: isAgGridCellRenderer
                    ? columnWidth || "100%"
                    : "300px",
                  flex: isAgGridCellRenderer ? "1 1 auto" : "none",
                }}
                variant="primary"
                disabled={isDisabled}
                onBlur={(e) => {
                  if (!isMulti) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.target.value = selectedOptions.value;
                    onBlur(e);
                  }
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  isOpen
                    ? handleDropdownClose({
                        externalOnDropdownClose,
                        setCurrentOptions,
                        initialOptions,
                        currentOptions,
                        setIsOpen,
                        onBlur,
                        event: e,
                      })
                    : handleDropdownOpen({
                        externalOnDropdownOpen,
                        isOpen,
                        setIsOpen,
                      });
                }}
                //isSelected={Object.entries(selectedOptions || {}).length > 0}
                //isAgGridCellRenderer={isAgGridCellRenderer}
                //isOpen={isOpen}
                onKeyDown={
                  !isWithSearch
                    ? (e) => onKeyDown({ e, focusedIndex, currentOptions })
                    : undefined
                }
                ref={dropdownButtonRef}
              >
                <div
                  className={`ia-select-button-text ${
                    getPlaceholder(
                      isMulti,
                      selectedOptions,
                      placeholder,
                      customPlaceholderAfterSelect
                    ) === placeholder
                      ? "placeholder"
                      : ""
                  } ${
                    !(
                      (isClearable && selectedOptions) ||
                      (isMulti &&
                        selectedOptions &&
                        selectedOptions.length > 0 &&
                        isClearable)
                    )
                      ? "ia-select-button-text-full-width"
                      : ""
                  } ${isAgGridCellRenderer ? "impact-select-table" : ""}`}
                >
                  {isWithIcon && { ...icon }}
                  {isTextTruncated && isAgGridCellRenderer ? (
                    <Tooltip
                      title={getPlaceholder(
                        isMulti,
                        selectedOptions,
                        placeholder
                      )}
                      variant="tertiary"
                      orientation="top"
                    >
                      <span
                        ref={textSpanRef}
                        className="ia-select-button-text-span"
                      >
                        {isMultiInSubmenu &&
                        !isMulti &&
                        selectedOptions &&
                        selectedOptions.children &&
                        selectedOptions.children.length > 0
                          ? selectedOptions.children.length === 1
                            ? selectedOptions.children[0].label
                            : `Selected (${selectedOptions.children.length})`
                          : getPlaceholder(
                              isMulti,
                              selectedOptions,
                              placeholder,
                              customPlaceholderAfterSelect
                            )}
                      </span>
                    </Tooltip>
                  ) : (
                    <span
                      ref={textSpanRef}
                      className="ia-select-button-text-span"
                    >
                      {!isMulti &&
                      selectedOptions &&
                      selectedOptions.children &&
                      selectedOptions.children.length > 0
                        ? selectedOptions.children.length === 1
                          ? selectedOptions.children[0].label
                          : `Selected (${selectedOptions.children.length})`
                        : getPlaceholder(
                            isMulti,
                            selectedOptions,
                            placeholder,
                            customPlaceholderAfterSelect
                          )}
                    </span>
                  )}
                </div>
                {isMulti &&
                  selectedOptions &&
                  selectedOptions.length > 0 &&
                  isClearable && (
                    <div
                      className="ia-select-button-clear-icon"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (externalOnClearAll) {
                          externalOnClearAll();
                        } else {
                          setSelectedOptions([]);
                          setIsSelectAll(false);
                          syncParentChildSelection([]);
                        }
                      }}
                    />
                  )}
                {!isMulti &&
                  isClearable &&
                  selectedOptions &&
                  Object.keys(selectedOptions).length > 0 && (
                    <div
                      className="ia-select-button-clear-icon"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (externalOnClearAll) {
                          externalOnClearAll();
                        } else {
                          setSelectedOptions([]);
                          setIsSelectAll(false);
                          syncParentChildSelection([]);
                        }
                      }}
                    />
                  )}
                <div className={`ia-select-chevron-icon ${isOpen && "open"}`} />
              </button>
              {isMulti && isWithSelectedOptionTags && (
                <SelectedOptionsTags
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  onChange={handleSelect}
                />
              )}
            </>
          }
        >
          <SearchFilter
            ref={searchBarRef}
            onSearch={(event) =>
              handleSearch({
                isMulti,
                event,
                externalOnSearch,
                initialOptions,
                setCurrentOptions,
                setOpenToast,
                setToastMessage,
              })
            }
            isMulti={isMulti}
            onSelectAll={(event) =>
              handleSelectAllWrapper({
                event,
                externalOnChange,
                setIsSelectAll,
                initialOptions,
                setSelectedOptions,
              })
            }
            onClearAll={() => {
              handleClearAllWrapper({
                externalOnClearAll,
                setSelectedOptions,
                setIsSelectAll,
                handleSelect,
                syncParentChildSelection,
              });
            }}
            isSelectAll={isSelectAll}
            selectedOptions={selectedOptions}
            toggleSelectAll={toggleSelectAll}
            isWithSearch={isWithSearch}
            setSelectedOptions={setSelectedOptions}
            onKeyDown={(e) => onKeyDown({ e, focusedIndex, currentOptions })}
            isClearable={isClearable}
            searchPlaceholder={searchPlaceholder}
            isLoading={isLoading}
          />
          <div className="ia-select-dropdown-container" ref={dropdownMenuRef}>
            <ReactSelect
              {...props}
              className="ia-select-dropdown-v3"
              classNames={{
                option: () => "ia-select-option",
              }}
              isMulti={isMulti}
              autoFocus
              backspaceRemovesValue={false}
              components={{
                IndicatorSeparator: null,
                Option: (optionProps) => {
                  const optionIndex = memoizedOptions.findIndex(
                    (opt) => opt.value === optionProps.data.value
                  );

                  // Check if it's a child option
                  const parentOption = (initialOptions || []).find(
                    (parent) =>
                      parent.children &&
                      parent.children.some(
                        (child) => child.value === optionProps.data.value
                      )
                  );

                  let isSelected;
                  if (!isMulti) {
                    if (isMultiInSubmenu) {
                      // For isMultiInSubmenu mode
                      if (parentOption) {
                        // For child options, check if this child is selected
                        isSelected =
                          selectedOptions &&
                          selectedOptions.children &&
                          selectedOptions.children.some(
                            (child) => child.value === optionProps.data.value
                          );
                      } else if (optionProps.data.children) {
                        // For parent options, check if any of its children are selected
                        isSelected =
                          selectedOptions &&
                          selectedOptions.children &&
                          selectedOptions.children.length > 0 &&
                          selectedOptions.value === optionProps.data.value;
                      } else {
                        // For regular options
                        isSelected =
                          selectedOptions &&
                          selectedOptions.value === optionProps.data.value;
                      }
                    } else {
                      // Normal single select behavior
                      if (parentOption) {
                        // For child options, check if this child is in selected parent's children
                        isSelected =
                          selectedOptions &&
                          selectedOptions.children &&
                          selectedOptions.children.some(
                            (child) => child.value === optionProps.data.value
                          );
                      } else if (optionProps.data.children) {
                        // For parent options, check if this parent has selected children
                        isSelected =
                          selectedOptions &&
                          selectedOptions.value === optionProps.data.value;
                      } else {
                        // For regular options
                        isSelected =
                          selectedOptions &&
                          selectedOptions.value === optionProps.data.value;
                      }
                    }
                  } else {
                    // Multi select behavior remains unchanged
                    if (parentOption) {
                      const selectedParent = Array.isArray(selectedOptions)
                        ? selectedOptions.find(
                            (sel) => sel.value === parentOption.value
                          )
                        : null;
                      isSelected =
                        selectedParent &&
                        selectedParent.children.some(
                          (child) => child.value === optionProps.data.value
                        );
                    } else {
                      isSelected = Array.isArray(selectedOptions)
                        ? selectedOptions.some(
                            (sel) => sel.value === optionProps.data.value
                          )
                        : false;
                    }
                  }

                  return (
                    <Option
                      {...optionProps}
                      isSelected={isSelected}
                      selectedOptions={selectedOptions}
                      initialOptions={initialOptions}
                      customOptionProps={{
                        onMouseEnter: (e) => {
                          handleOptionHover(optionProps.data, optionIndex, e);
                        },
                      }}
                    />
                  );
                },
                ...(!isGrouped && { MenuList }),
                ...(isGrouped && {
                  GroupHeading: (props) => (
                    <CustomGroupHeading
                      {...props}
                      customBadgeLabel={customBadgeLabel}
                      customBadgeColor={customBadgeColor}
                    />
                  ),
                }),
              }}
              controlShouldRenderValue={true}
              hideSelectedOptions={false}
              isClearable={isClearable}
              menuIsOpen
              tabSelectsValue={false}
              onChange={(selectedOptions, actionMeta) => {
                const option = actionMeta?.option;
                const index = memoizedOptions.findIndex(
                  (opt) =>
                    opt.value === (option?.value || selectedOptions?.value)
                );
                handleSelect(selectedOptions, actionMeta, index);
              }}
              options={memoizedOptions}
              placeholder="Search..."
              value={selectedOptions}
              styles={selectStyles}
              isLoading={isLoading}
              onMenuScrollToBottom={onMenuScrollToBottom}
              menuShouldBlockScroll={menuShouldBlockScroll}
              captureMenuScroll={false}
            />
            {submenuOptions && (
              <div
                className="ia-select-submenu"
                style={{
                  position: "absolute",
                  top: submenuPosition.top,
                  left: submenuPosition.left,
                  width: submenuPosition.width,
                }}
                onMouseEnter={() => {
                  setIsSubmenuHovered(true);
                  if (submenuTimeoutRef.current) {
                    clearTimeout(submenuTimeoutRef.current);
                  }
                }}
                onMouseLeave={() => {
                  setIsSubmenuHovered(false);
                  submenuTimeoutRef.current = setTimeout(() => {
                    if (!isSubmenuHovered) {
                      setSubmenuOptions(null);
                      setSubmenuParent(null);
                    }
                  }, 100);
                }}
              >
                <div className="ia-select-submenu-content">
                  {submenuOptions.map((option) => {
                    // For single select with multi submenu, check if this child is selected
                    const isChildSelected = !isMulti
                      ? isMultiInSubmenu
                        ? selectedOptions &&
                          selectedOptions.children &&
                          selectedOptions.children.some(
                            (child) => child.value === option.value
                          )
                        : selectedOptions &&
                          selectedOptions.children &&
                          selectedOptions.children.some(
                            (child) => child.value === option.value
                          )
                      : (() => {
                          const selectedOptionsArray = Array.isArray(
                            selectedOptions
                          )
                            ? selectedOptions
                            : [];
                          const parentOption = selectedOptionsArray.find(
                            (sel) => sel.value === submenuParent.value
                          );
                          return parentOption
                            ? parentOption.children.some(
                                (child) => child.value === option.value
                              )
                            : false;
                        })();

                    return (
                      <div
                        key={option.value}
                        className={`select-option-content${
                          isChildSelected ? " selected" : ""
                        }`}
                        onClick={(event) => {
                          if (!isMulti) {
                            if (isMultiInSubmenu) {
                              // Handle multi-select in submenu for single select mode
                              if (isChildSelected) {
                                // If child is already selected, remove it
                                if (
                                  selectedOptions &&
                                  selectedOptions.children
                                ) {
                                  const updatedChildren =
                                    selectedOptions.children.filter(
                                      (child) => child.value !== option.value
                                    );
                                  if (updatedChildren.length === 0) {
                                    // If no children left, remove the parent completely
                                    setSelectedOptions(null);
                                    if (externalOnChange) {
                                      externalOnChange(null, { option }, null);
                                    }
                                  } else {
                                    const newSelectedOptions = {
                                      ...selectedOptions,
                                      children: updatedChildren,
                                    };
                                    setSelectedOptions(newSelectedOptions);
                                    if (externalOnChange) {
                                      externalOnChange(
                                        newSelectedOptions,
                                        { option },
                                        null
                                      );
                                    }
                                  }
                                }
                              } else {
                                // If child is not selected, add it
                                if (!selectedOptions) {
                                  // First selection - initialize with current parent
                                  const newSelectedOptions = {
                                    ...submenuParent,
                                    children: [option],
                                  };
                                  setSelectedOptions(newSelectedOptions);
                                  if (externalOnChange) {
                                    externalOnChange(
                                      newSelectedOptions,
                                      { option },
                                      null
                                    );
                                  }
                                } else if (
                                  selectedOptions.value === submenuParent.value
                                ) {
                                  // Same parent - add to existing children
                                  const newSelectedOptions = {
                                    ...selectedOptions,
                                    children: [
                                      ...(selectedOptions.children || []),
                                      option,
                                    ],
                                  };
                                  setSelectedOptions(newSelectedOptions);
                                  if (externalOnChange) {
                                    externalOnChange(
                                      newSelectedOptions,
                                      { option },
                                      null
                                    );
                                  }
                                } else {
                                  // Different parent - replace with new parent and child
                                  const newSelectedOptions = {
                                    ...submenuParent,
                                    children: [option],
                                  };
                                  setSelectedOptions(newSelectedOptions);
                                  if (externalOnChange) {
                                    externalOnChange(
                                      newSelectedOptions,
                                      { option },
                                      null
                                    );
                                  }
                                }
                              }
                            } else {
                              // Normal single select behavior - always pass parent with selected child
                              const newSelectedOptions = {
                                ...submenuParent,
                                children: [option],
                              };
                              setSelectedOptions(newSelectedOptions);
                              if (externalOnChange) {
                                externalOnChange(
                                  newSelectedOptions,
                                  { option },
                                  null
                                );
                              }
                              handleDropdownClose({
                                externalOnDropdownClose,
                                setCurrentOptions,
                                initialOptions,
                                currentOptions,
                                setIsOpen,
                                onBlur,
                                event: event,
                              });
                            }
                          } else {
                            // Existing multi-select logic
                            const newSelectedOptions = Array.isArray(
                              selectedOptions
                            )
                              ? [...selectedOptions]
                              : [];
                            const parentIndex = newSelectedOptions.findIndex(
                              (sel) => sel.value === submenuParent.value
                            );

                            if (isChildSelected) {
                              if (parentIndex !== -1) {
                                const parent = newSelectedOptions[parentIndex];
                                parent.children = parent.children.filter(
                                  (child) => child.value !== option.value
                                );
                                if (parent.children.length === 0) {
                                  newSelectedOptions.splice(parentIndex, 1);
                                }
                              }
                            } else {
                              if (parentIndex !== -1) {
                                const parent = newSelectedOptions[parentIndex];
                                if (
                                  !parent.children.some(
                                    (child) => child.value === option.value
                                  )
                                ) {
                                  parent.children.push(option);
                                }
                              } else {
                                newSelectedOptions.push({
                                  ...submenuParent,
                                  children: [option],
                                });
                              }
                            }
                            setSelectedOptions(newSelectedOptions);
                            if (externalOnChange) {
                              externalOnChange(
                                newSelectedOptions,
                                { option },
                                null
                              );
                            }
                          }
                        }}
                      >
                        {isMulti || isMultiInSubmenu ? (
                          <Checkbox
                            withoutFormLabel={true}
                            label={
                              <div className="select-label-with-icon">
                                {option.label}
                              </div>
                            }
                            checked={isChildSelected || false}
                            onChange={() => null}
                            disabled={false}
                          />
                        ) : (
                          <div className="select-label-with-icon">
                            {option.label}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
      <Toast
        isOpen={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(!openToast)}
        position="top-right"
        variant="error"
      />
    </div>
  );
});
