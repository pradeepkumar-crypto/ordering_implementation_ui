import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Checkbox } from "../Checkbox/index";
import { Input } from "../Input";
import { IconButton } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const onColMenuFreezeClick = (params) => {
  const { pinned } = params.column;
  // if column is pinned then unpin, vice-versa
  if (pinned) {
    freezeColumn(params, false);
  } else {
    freezeColumn(params, true);
  }
};

export const freezeColumn = (params, isPinned) => {
  const { colId } = params.column;
  params.api.applyColumnState({
    state: [{ colId, pinned: isPinned ? "left" : null }],
  });
};

export const onColMenuAutoAdjustClick = (params) => {
  let colDefExtra = { ...params.column.colDef.extra };
  // delete colDefExtra.width;
  params.column.colDef.extra = colDefExtra;
  params.api.autoSizeColumn(params.column);
};

export const sortFunc = (columnData, sortBy, api) => {
  // applyColumnState - to manually set the sort order for a particular column
  api.api.applyColumnState({
    state: [{ colId: columnData.colId, sort: sortBy }],
    defaultState: { sort: null },
  });
};

export const getMainMenuItems = (params) => {
  const { onFontSizeChange, onNumberFormatChange } = params;
  const { colDef, pinned, sort, actualWidth } = params.column;
  const columnMenuItems = [];

  // grid column menu title
  columnMenuItems.push(
    {
      name: "Column Settings",
      cssClasses: ["settings-main-container"],
    },
    "separator"
  );

  // ability to sort column
  columnMenuItems.push({
    name: "Sort",
    subMenu: [
      {
        name: "Sort A to Z",
        action: () => sortFunc(params.column, "asc", params),
        checked: sort === "asc",
      },
      {
        name: "Sort Z to A",
        checked: sort === "desc",
        action: () => sortFunc(params.column, "desc", params),
      },
      {
        name: "Reset",
        action: () => sortFunc(params.column, null, params),
      },
    ],
    disabled: false,
  });

  // ability to pin/unpin columns based on current state
  columnMenuItems.push({
    name: pinned ? "Unfreeze Column" : "Freeze Column",
    action: () => {
      onColMenuFreezeClick(params);
    },
  });

  // ability to adjust column width to custom or auto
  columnMenuItems.push({
    name: "Column width",
    subMenu: [
      {
        name: "Auto Adjust",
        action: () => {
          onColMenuAutoAdjustClick(params);
        },
        // if extra.width property is not present- column is auto adjusted
        checked: actualWidth !== colDef?.extra?.width,
      },
      {
        name: "Custom width",
        action: () => {
          // add extra.width property for custom width
          params.api.setColumnWidth(params.column.colDef, colDef?.extra?.width);
        },
        // if extra.width property is present- column has custom width
        checked: colDef?.extra?.width === actualWidth,
        disabled: !colDef?.extra?.width,
      },
    ],
  });

  // text wrap action
  columnMenuItems.push({
    name: "Wrap Text",
    disabled: true,
  });

  columnMenuItems.push(
    {
      name: "Format",
      cssClasses: ["format-main-container"],
    },
    "separator"
  );

  columnMenuItems.push({
    name: "Numeric Values",
    subMenu: [
      {
        name: "Full Number",
        action: () => onNumberFormatChange("full"),
      },
      {
        name: "In K",

        action: () => onNumberFormatChange("thousand"),
      },
      {
        name: "In Mn",
        action: () => onNumberFormatChange("million"),
      },
      {
        name: "In Bn",
        action: () => onNumberFormatChange("billion"),
      },
    ],
    disabled: !onFontSizeChange,
  });
  columnMenuItems.push({
    name: "Font Size",
    subMenu: [
      {
        name: "Small Font",
        action: () => onFontSizeChange("small"),
      },
      {
        name: "Medium Font",

        action: () => onFontSizeChange("medium"),
      },
      {
        name: "Large Font",
        action: () => onFontSizeChange("large"),
      },
    ],
    disabled: !onNumberFormatChange,
  });

  return columnMenuItems;
};

export const Columns = forwardRef((props, ref) => {
  const [searchText, setSearchText] = useState("");
  const [collapsedScrollable, setCollapsedScrollable] = useState(false);
  const [collapsedColumn, setCollapsedcolumn] = useState(false);
  const [frozenColumn, setFrozenColumn] = useState([]);
  const [scrollableColumn, setScrollableColumn] = useState([]);
  const [filteredFrozenColumns, setFilteredFrozenColumns] = useState([]);
  const [filteredScrollableColumns, setFilteredScrollableColumns] = useState(
    []
  );
  const [allColumnVisibility, setAllColumnvisisbility] = useState(true);
  const [mainChecked, setMainChecked] = useState(true);
  const [collapsedScrollColumns, setCollapsedScrollColumns] = useState({});
  const [collapsedFrozenColumns, setCollapsedFrozenColumns] = useState({});
  const isColumnPinnedRef = useRef(false);
  const isFirstRender = useRef(false);

  useEffect(() => {
    if (
      (props.showMenu && !isFirstRender.current) ||
      isColumnPinnedRef.current
    ) {
      isFirstRender.current = true;
      isColumnPinnedRef.current = false;
      const updateColumnState = () => {
        const getColumnState = (columns) => {
          return columns.map((column) => {
            // Handle the parent column definition
            const columnState = {
              colId: column.colId || column.field || column.headerName,
              headerName: column.headerName || column.field || "N/A",
              isVisible: !column?.is_hidden,
              isPinned: column.pinned ? true : false,
              children:
                column?.children?.length > 0
                  ? getColumnState(column.children)
                  : null, // Recursively handle child columns
            };

            return columnState;
          });
        };

        // Call the function to get the column state
        const columnState = ref?.current?.api?.getColumnDefs()
          ? getColumnState(ref.current.api.getColumnDefs())
          : getColumnState(props.column);
        let frozColumn = [];
        let scrollColumn = [];

        columnState?.map((column) => {
          if (column.isPinned) {
            frozColumn.push(column);
          } else {
            scrollColumn.push(column);
          }
        });
        setFrozenColumn(frozColumn);
        setFilteredFrozenColumns(frozColumn);
        setScrollableColumn(scrollColumn);
        setFilteredScrollableColumns(scrollColumn);
      };

      updateColumnState();

      const onColumnPinned = () => {
        isColumnPinnedRef.current = true;
        updateColumnState();
      };

      if (ref?.current) {
        ref.current?.api?.addEventListener("columnPinned", onColumnPinned);
      }

      return () => {
        if (ref?.current) {
          ref.current?.api?.removeEventListener("columnPinned", onColumnPinned);
        }
      };
    }
  }, [props.showMenu]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();

    const filterColumns = (columns, searchText) => {
      return columns
        .map((column) => {
          // Check if the current column matches the search text
          const matches = column.headerName.toLowerCase().includes(searchText);

          // If the column has children, filter them recursively
          const filteredChildren = column.children
            ? filterColumns(column.children, searchText)
            : [];

          // Include the column if it matches or any of its children match
          if (matches || filteredChildren.length > 0) {
            return {
              ...column,
              children: filteredChildren,
              isVisible: column.isVisible,
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    const filteredFrozenColumns = filterColumns(frozenColumn, searchText);
    const filteredScrollableColumns = filterColumns(
      scrollableColumn,
      searchText
    );

    setSearchText(searchText);
    setFilteredFrozenColumns(filteredFrozenColumns);
    setFilteredScrollableColumns(filteredScrollableColumns);
  };

  const updateColumnVisibility = (columns, colId, newVisibility) => {
    return columns.map((column) => {
      if (column.colId === colId) {
        // Update the column's visibility
        ref?.current?.api.setColumnVisible(column.colId, newVisibility);

        // If it's a parent column, update all children
        if (column.children) {
          const updatedChildren = column.children.map((child) => {
            ref?.current?.api.setColumnVisible(child.colId, newVisibility);
            return {
              ...child,
              isVisible: newVisibility,
              children: child.children
                ? child.children.map((grandChild) => ({
                    ...grandChild,
                    isVisible: newVisibility,
                  }))
                : null,
            };
          });
          return {
            ...column,
            isVisible: newVisibility,
            children: updatedChildren,
          };
        }

        // If it's a column without children, update only this column
        return {
          ...column,
          isVisible: newVisibility,
        };
      }

      // If it's not the target column but has children, check them
      if (column.children) {
        const updatedChildren = column.children.map((child) => {
          if (child.colId === colId) {
            ref?.current?.api.setColumnVisible(child.colId, newVisibility);
            return {
              ...child,
              isVisible: newVisibility,
            };
          }
          return {
            ...child,
            isVisible: child.isVisible,
          };
        });

        // Update parent visibility based on children
        const isAnyChildVisible = updatedChildren.some(
          (child) => child.isVisible
        );
        ref?.current?.api.setColumnVisible(column.colId, isAnyChildVisible);

        return {
          ...column,
          isVisible: isAnyChildVisible,
          children: updatedChildren,
        };
      }

      // If it's a column without children and not the target, preserve its current state
      return {
        ...column,
        isVisible: column.isVisible,
      };
    });
  };

  const toggleColumnVisibilityFrozen = (colId) => {
    // Find the current visibility state of the column
    const findColumnVisibility = (columns) => {
      for (const column of columns) {
        if (column.colId === colId) {
          return !column.isVisible;
        }
        if (column.children) {
          const childVisibility = findColumnVisibility(column.children);
          if (childVisibility !== null) {
            return childVisibility;
          }
        }
      }
      return null;
    };

    const newVisibility = findColumnVisibility(frozenColumn);

    // Update both frozen and filtered frozen columns
    const updatedFrozenColumns = updateColumnVisibility(
      frozenColumn,
      colId,
      newVisibility
    );
    const updatedFilteredFrozenColumns = updateColumnVisibility(
      filteredFrozenColumns,
      colId,
      newVisibility
    );

    setFrozenColumn(updatedFrozenColumns);
    setFilteredFrozenColumns(updatedFilteredFrozenColumns);
  };

  const toggleColumnVisibilityScroll = (colId) => {
    // Find the current visibility state of the column
    const findColumnVisibility = (columns) => {
      for (const column of columns) {
        if (column.colId === colId) {
          return !column.isVisible;
        }
        if (column.children) {
          const childVisibility = findColumnVisibility(column.children);
          if (childVisibility !== null) {
            return childVisibility;
          }
        }
      }
      return null;
    };

    const newVisibility = findColumnVisibility(scrollableColumn);

    // Update the main scrollable columns array first
    const updatedScrollableColumns = updateColumnVisibility(
      scrollableColumn,
      colId,
      newVisibility
    );

    // Then re-filter the updated columns based on current search text
    const filterColumns = (columns, searchText) => {
      return columns
        .map((column) => {
          const matches = column.headerName.toLowerCase().includes(searchText);
          const filteredChildren = column.children
            ? filterColumns(column.children, searchText)
            : [];

          if (matches || filteredChildren.length > 0) {
            return {
              ...column,
              children: filteredChildren,
              isVisible: column.isVisible,
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    const updatedFilteredScrollableColumns = filterColumns(
      updatedScrollableColumns,
      searchText
    );

    // Update state with the new arrays
    setScrollableColumn(updatedScrollableColumns);
    setFilteredScrollableColumns(updatedFilteredScrollableColumns);
  };

  const toggleScrollableCollapse = (e) => {
    e.stopPropagation();
    setCollapsedScrollable(!collapsedScrollable);
  };

  const toggleColumnCollapse = (e) => {
    e.stopPropagation();
    setCollapsedcolumn(!collapsedColumn);
  };

  const onMainCheckboxChange = () => {
    // Toggle the main checkbox state
    setMainChecked((prev) => !prev);

    // Helper function to recursively update visibility for all columns and children
    const updateVisibility = (columns, visibility) => {
      return columns.map((column) => {
        // Set column visibility
        ref?.current?.api?.setColumnVisible(column.colId, visibility);

        // If the column has children, recursively update their visibility
        if (column.children) {
          updateVisibility(column.children, visibility);
        }

        // Return the updated column with new visibility state
        return {
          ...column,
          isVisible: visibility,
          children: column.children
            ? updateVisibility(column.children, visibility)
            : null,
        };
      });
    };

    // Update the visibility for all columns (parent + children)
    const updatedColumns = updateVisibility(
      filteredScrollableColumns,
      !mainChecked
    );
    setFilteredScrollableColumns(updatedColumns);
  };

  const onAllColumnCheckBoxChange = () => {
    setAllColumnvisisbility((prev) => !prev); // Toggle visibility state
    setMainChecked(!allColumnVisibility);
    // Helper function to recursively update visibility for all columns and children
    const updateColumnVisibility = (columns, visibility) => {
      return columns.map((column) => {
        // Set column visibility in ag-Grid API
        ref?.current?.api?.setColumnVisible(column.colId, visibility);

        // If column has children, recursively update their visibility
        if (column.children) {
          updateColumnVisibility(column.children, visibility);
        }

        // Return the updated column with new visibility state
        return {
          ...column,
          isVisible: visibility,
          children: column.children
            ? updateColumnVisibility(column.children, visibility)
            : null,
        };
      });
    };

    // Update visibility for frozen columns
    const updatedFrozenColumns = updateColumnVisibility(
      filteredFrozenColumns,
      !allColumnVisibility
    );

    const updatedScrollableColumns = updateColumnVisibility(
      filteredScrollableColumns,
      !allColumnVisibility
    );

    // Update the state with the new visibility for all columns
    setFilteredFrozenColumns(updatedFrozenColumns);
    setFilteredScrollableColumns(updatedScrollableColumns);
  };

  const toggleScrollColumnCollapse = (colId) => {
    setCollapsedScrollColumns((prev) => ({
      ...prev,
      [colId]: !prev[colId], // Toggle collapse state for the specific column
    }));
  };

  const renderScrollColumn = (column, level = 0) => {
    const isCollapsed = collapsedScrollColumns[column.colId] || false; // Check if the column is collapsed

    return (
      <>
        <div
          className="table-setting-scroll-inner-column"
          style={{ marginLeft: `${level * 20}px` }}
        >
          {/* Collapsible Icon if the column has children */}
          {Array.isArray(column.children) && column.children.length > 0 && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleScrollColumnCollapse(column.colId);
              }}
              style={{ padding: "0px" }}
            >
              {isCollapsed ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )}
            </IconButton>
          )}

          {/* Checkbox and column label */}
          <Checkbox
            checked={column.isVisible}
            onChange={() => toggleColumnVisibilityScroll(column.colId)}
          />
          <DragIndicator className="table-setting-scroll-columns-list-drag-icon" />
          {column.headerName.charAt(0).toUpperCase() +
            column.headerName.slice(1)}
        </div>

        {/* Render children if not collapsed */}
        {Array.isArray(column.children) &&
          column.children.length > 0 &&
          !isCollapsed && (
            <div
              style={{
                marginLeft: "20px", // Indentation for child columns
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              {column.children.map((child) => (
                <div key={child.colId}>
                  {renderScrollColumn(child, level + 1)}
                </div>
              ))}
            </div>
          )}
      </>
    );
  };

  const toggleFrozenColumnCollapse = (colId) => {
    setCollapsedFrozenColumns((prev) => ({
      ...prev,
      [colId]: !prev[colId], // Toggle collapse state for the specific frozen column
    }));
  };

  const renderFrozencolumn = (column, level = 0) => {
    const isCollapsed = collapsedFrozenColumns[column.colId] || false; // Check if the frozen column is collapsed

    return (
      <>
        <div
          className="table-setting-frozen-columns-list-item"
          style={{ marginLeft: `${level * 20}px` }}
        >
          {/* Collapsible Icon if the column has children */}
          {Array.isArray(column.children) && column.children.length > 0 && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleFrozenColumnCollapse(column.colId);
              }}
              style={{ padding: "0px" }}
            >
              {isCollapsed ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )}
            </IconButton>
          )}

          {/* Checkbox and column label */}
          <Checkbox
            checked={column.isVisible}
            onChange={() => toggleColumnVisibilityFrozen(column.colId)}
          />
          <DragIndicator className="table-setting-frozen-columns-list-drag-icon" />
          {column.headerName.charAt(0).toUpperCase() +
            column.headerName.slice(1)}
        </div>

        {/* Render children if not collapsed */}
        {Array.isArray(column.children) &&
          column.children.length > 0 &&
          !isCollapsed && (
            <div
              style={{
                marginLeft: "20px", // Indentation for child columns
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              {column.children.map((child) => (
                <div key={child.colId}>
                  {renderFrozencolumn(child, level + 1)}
                </div>
              ))}
            </div>
          )}
      </>
    );
  };

  return (
    <div className="table-setting-columns-settings">
      <div className="table-setting-column-search-container">
        <IconButton onClick={toggleColumnCollapse} style={{ padding: "5px" }}>
          {collapsedColumn ? (
            <KeyboardArrowRightIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </IconButton>
        <Checkbox
          checked={allColumnVisibility}
          onChange={onAllColumnCheckBoxChange}
        />
        <Input
          rightIcon={<SearchIcon />}
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      {!collapsedColumn && (
        <div className="table-setting-column-collapse-container">
          {/* Frozen Columns */}
          {frozenColumn.length > 0 &&
            !(
              frozenColumn.length === 1 && frozenColumn[0].headerName === "N/A"
            ) && (
              <div className="table-setting-collapse-columns-container">
                <h3>Frozen columns</h3>
                <div className="table-setting-frozen-columns-list">
                  {filteredFrozenColumns?.map(
                    (column, index) =>
                      column.headerName !== "N/A" && (
                        <div key={column.colId}>
                          {renderFrozencolumn(column)}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          {/* Scrollable Columns */}
          <div className="table-setting-scroll-columns-container">
            <h3>Scrollable Columns</h3>
            <div className="table-setting-scroll-main-column-list">
              <div className="table-setting-scroll-main-column">
                <IconButton
                  onClick={toggleScrollableCollapse}
                  style={{ padding: "0px" }}
                >
                  {collapsedScrollable ? (
                    <KeyboardArrowRightIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )}
                </IconButton>
                <Checkbox
                  checked={mainChecked}
                  onChange={onMainCheckboxChange}
                />
                <DragIndicator className="table-setting-scroll-columns-list-drag-icon" />
                Main Column
              </div>
              <div className="table-setting-scroll-inner-column-list">
                {!collapsedScrollable &&
                  filteredScrollableColumns?.map(
                    (column, index) =>
                      column.headerName !== "N/A" && (
                        <div key={column.colId}>
                          {renderScrollColumn(column)}
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export const updateFontSizeOnToolPanel = (fontSizeType) => {
  let fontSize;
  switch (fontSizeType) {
    case "small":
      fontSize = "12px";
      break;
    case "medium":
      fontSize = "14px";
      break;
    case "large":
      fontSize = "16px";
      break;
    default:
      fontSize = "14px";
  }
  return fontSize;
};

// export const formatNumber = (num, format, cellprops, item) => {
//   if (!num) return "";
//   switch (format) {
//     case "billion":
//       // Nine Zeroes for Billions
//       let billionFormat = (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B";
//       return String(billionFormat) === "0.00B" ? "0B" : billionFormat;
//     case "million":
//       // Six Zeroes for Millions
//       let millionFormat = (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M";
//       return String(millionFormat) === "0.00M" ? "0M" : millionFormat;
//     case "thousand":
//       let thousandFormat = (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K";
//       return String(thousandFormat) === "0.00K" ? "0K" : thousandFormat;
//     default:
//       return formatDefaultCase(cellprops, item);
//   }
// };

// <div style={{ paddingTop: "10px", paddingLeft: "17.5px" }}>
//             <Typography variant="body2" className="ia-scrollable">
//               Scrollable Columns
//             </Typography>
//             <div className="ia-frozen-colum">
//               {/* Main Column */}
//               <div className="ia-column">
//                 <IconButton
//                   onClick={toggleScrollableCollapse}
//                   style={{ padding: "0px" }}
//                 >
//                   {collapsedScrollable ? (
//                     <KeyboardArrowRightIcon />
//                   ) : (
//                     <KeyboardArrowUpIcon />
//                   )}
//                 </IconButton>
//                 <Checkbox
//                   checked={mainChecked}
//                   onChange={onMainCheckboxChange}
//                 />
//                 <DragIndicator className="ia-drag" />
//                 Main Column
//               </div>
//               {/* Inner Columns */}
//               {!collapsedScrollable &&
//                 filteredScrollableColumns?.map((column, index) => (
//                   <div key={index} className="ia-inner-column">
//                     <Checkbox
//                       checked={column.isVisible}
//                       onChange={() =>
//                         toggleColumnVisibilityScroll(column.colId)
//                       }
//                     />
//                     <DragIndicator className="ia-drag" />
//                     {column.headerName.charAt(0).toUpperCase() +
//                       column.headerName.slice(1)}
//                   </div>
//                 ))}
//             </div>
//           </div>
