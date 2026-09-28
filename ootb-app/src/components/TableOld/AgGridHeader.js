import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "../Input";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import { debounce } from "../../utils/debounce";
import { Badge } from "@mui/material";
import TableSortIcon from "../../assets/tableSortIcon.svg";
import TableSortAscIcon from "../../assets/Up.svg";
import TableSortDescIcon from "../../assets/Down.svg";

function AgGridHeader({
  children,
  sortModel,
  handleInlineSearch,
  handleClearSearchInline,
  handleCloseInputField,
  debounceTime,
  ...rest
}) {
  const menuRef = useRef();
  const inputRef = useRef();
  const [showInputField, setShowInputField] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [menuVisible, setMenuvisible] = useState(false);
  const [columnWidth, setColumnWidth] = useState({});
  const [currentSort, setCurrentSort] = useState(null);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  const onFilterChanged = useCallback(() => {
    const newFilterModel = rest?.api?.getFilterModel();
    if (newFilterModel) {
      const filterValue = newFilterModel[rest?.column?.colId]?.filter;
      setSearchText(filterValue);
      setHasActiveSearch(!!filterValue);
    }
  }, [rest?.api, rest?.column?.colId]);

  useEffect(() => {
    // Load initial filter state when grid loads
    const filterModel = rest.api.getFilterModel();
    if (filterModel[rest.column?.colId]) {
      const filterValue = filterModel[rest.column.colId]?.filter;
      setSearchText(filterValue);
      setHasActiveSearch(!!filterValue);
    } else {
      setSearchText("");
      setHasActiveSearch(false);
    }
    rest.api.addEventListener("filterChanged", onFilterChanged);
    return () => {
      rest.api.removeEventListener("filterChanged", onFilterChanged);
    };
  }, [rest.api, rest.column?.colId, onFilterChanged]);

  const handleSearchChange = (value) => {
    if (handleInlineSearch) {
      handleInlineSearch?.(value);
      return;
    }
    let inputValue =
      rest?.column?.colDef?.filter === "agNumberColumnFilter"
        ? parseFloat(value)
        : value;
    const currentFilterModel = rest.api.getFilterModel();
    currentFilterModel[rest.column.colId] =
      inputValue != null || inputValue !== ""
        ? {
            type: "contains",
            filter: inputValue,
          }
        : undefined; // Remove the filter if the input is empty
    rest.api.setFilterModel(currentFilterModel);

    rest.api.onFilterChanged();

    if (rest.onFilterChanged) {
      rest.onFilterChanged(rest);
    }
  };

  const debouncedHandleSearchChange = useCallback(
    debounce((value) => {
      handleSearchChange(value);
    }, debounceTime),
    [],
  );

  const handleSearch = (e) => {
    e.stopPropagation();
    setShowInputField((prev) => !prev);
    setColumnWidth((prev) => ({
      ...prev,
      [rest?.column?.colId]: rest?.column?.actualWidth,
    }));
  };

  const onCloseIconClick = (colId) => {
    setSearchText("");
    setHasActiveSearch(false);
    rest.api.destroyFilter(colId);
  };

  const handleClickOutside = (event) => {
    setMenuvisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuVisible]);

  const onHeaderClick = () => {
    if (rest.applySort) {
      rest.applySort(rest.column.colId);
      return;
    }
    if (rest?.column?.colDef?.sortable) {
      const currentSortModel = rest.api.getColumnState();
      const currentSort = currentSortModel.find(
        (model) => model.colId === rest.column.colId,
      );
      const newSort = currentSort?.sort === "asc" ? "desc" : "asc";
      setCurrentSort(newSort);
      rest.columnApi.applyColumnState({
        state: [{ colId: rest.column.colId, sort: newSort }],
        defaultState: { sort: null },
      });
    }
  };

  const onColumnMoved = (params) => {
    if (params?.column?.colId && showInputField) {
      setColumnWidth((prev) => ({
        ...prev,
        [params.column.colId]: params.column.actualWidth,
      }));
      // Store width in column state for cell renderers to access
      rest?.columnApi?.applyColumnState({
        state: [
          {
            colId: params.column.colId,
            width: params.column.actualWidth,
          },
        ],
        defaultState: { width: null },
      });
    }
  };

  useEffect(() => {
    if (rest) {
      rest?.api?.addEventListener("columnResized", onColumnMoved);
    }
    return () => {
      rest?.api?.removeEventListener("columnResized", onColumnMoved);
    };
  }, [rest]);

  return (
    <div className="custom-ag-header-container" onClick={() => rest.onClick()}>
      {showInputField ? (
        <div
          className={`ia-search-input-field ${
            (columnWidth[rest?.column?.colId] ?? rest?.column?.actualWidth) <
            200
              ? "ia-search-input-narrow"
              : ""
          }`}
        >
          <Input
            ref={inputRef}
            rightIcon={
              <Fragment>
                {searchText?.toString()?.length > 0 &&
                  (columnWidth[rest?.column?.colId] ??
                    rest?.column?.actualWidth) >= 200 && (
                    <CloseIcon
                      onClick={() => {
                        if (handleClearSearchInline) {
                          handleClearSearchInline(rest);
                        }
                        onCloseIconClick(rest.column.colId);
                      }}
                    />
                  )}
                {rest?.column?.colDef?.advanceSearchEnabled && (
                  <TuneIcon
                    onClick={() => {
                      if (rest.onAdvanceSearchClick) {
                        rest.onAdvanceSearchClick(rest.column);
                        return;
                      }
                      rest.toggleAdvanceSearch(rest.column.colId);
                    }}
                  />
                )}
              </Fragment>
            }
            value={searchText}
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
              setHasActiveSearch(!!e.target.value);
              debouncedHandleSearchChange(e.target.value);
            }}
          />
          <CloseIcon
            className="ia-search-input-field-close-icon"
            onClick={() => {
              handleCloseInputField?.();
              setShowInputField(false);
              // setSearchText("");
              // rest.api.setFilterModel(null);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <React.Fragment>
          <div
            className={`ag-header-cell-text ${
              rest?.column?.colDef?.sortable ? "sortable" : ""
            }`}
          >
            {children !== "Selection" && children}
            {rest?.column?.colDef?.sortable && (
              <img
                className="ia-table-sort-icon"
                src={
                  currentSort === "asc"
                    ? TableSortAscIcon
                    : currentSort === "desc"
                      ? TableSortDescIcon
                      : TableSortIcon
                }
                alt="TableSortIcon"
                onClick={onHeaderClick}
              />
            )}
          </div>
          <div
            className={`ia-icon-div ${
              hasActiveSearch ? "has-active-search" : ""
            }`}
          >
            {rest?.column?.colDef?.customHeaderIcons &&
              rest?.column?.colDef?.customHeaderIcons.map((icon) => {
                return icon;
              })}
            {rest?.column?.colDef?.isSearchable &&
              (hasActiveSearch || !showInputField) && (
                <Badge variant="dot" invisible={!hasActiveSearch}>
                  <SearchIcon
                    fontSize="small"
                    onClick={
                      rest.onColumnSearchClick
                        ? () => {
                            rest.onColumnSearchClick(rest);
                            setShowInputField(true);
                          }
                        : handleSearch
                    }
                    style={{
                      color: "#60697D",
                      cursor: "pointer",
                      backgroundColor: hasActiveSearch && "#ECEEFD",
                    }}
                  />
                </Badge>
              )}
            {!rest?.column?.colDef?.suppressMenu && (
              <div className="custom-ag-header-icons">
                <button
                  ref={menuRef}
                  className={`custom-ag-menu-icon-button ${
                    menuVisible ? "menu-visible" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    rest.showColumnMenu(menuRef.current);
                    setMenuvisible(true);
                  }}
                />
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default AgGridHeader;
