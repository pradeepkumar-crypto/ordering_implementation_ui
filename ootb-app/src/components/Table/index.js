import React, {
  forwardRef,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cloneDeep } from "lodash";
import { LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional Theme applied to the Data Grid
import "./Table.styles.scss";

import TableHeader from "./tableHeader";
import AgGridHeader from "./AgGridHeader";
import TablePagination from "./tablePagination";
import {
  getMainMenuItems,
  Columns,
  updateFontSizeOnToolPanel,
} from "./tableFunctions";
import TableAdvanceSearchModal from "./advanceSearchModal";
import { convertToOptions } from "../../utils/helper";

export const Table = forwardRef(
  (
    {
      defaultColDef: defColDef,
      columnDefs: colDefs,
      tableHeader = "",
      rowHeight: rowHei,
      height,
      topRightOptions,
      topLeftOptions,
      onGlobalSearchClick,
      paginationPageSizeSelector = [10, 20, 50, 100],
      defaultPageSize,
      onNumberFormatChange = () => {},
      onColumnSearchClick,
      tableActionOptions,
      bottomLeftOptions,
      cardContainer = true,
      hideRowHeightOptionMenu = false,
      onPaginationChanged = () => {},
      showDownloadButton = false,
      onDownloadButtonClick = () => {},
      nestedTable = false,
      nestedTableComponent = null,
      closeButton = false,
      handleCloseButtonClick,
      additionalButtons,
      applySort,
      onFilterChanged,
      sortModel,
      onSearchApplyClick,
      gridId,
      showHideEditableCells = false,
      handleShowHideEditableCells = () => {},
      topCenterOptions,
      bottomCenterOptions,
      toShowDuplicateColumnInAdvanceSearch = false,
      savedAdvanceSearchConfig,
      handleInlineSearch,
      showContentualFilter = false,
      showContentualFilterBadge = false,
      onContentualFilterClick = () => {},
      contentualFilterProps,
      contentualFilterComponent,
      onAdvanceSearchClick,
      tableActions,
      customGetMainMenuItems,
      hidePaginationPageSizeSelector = false,
      onTableActionsTabClick,
      hideTableFormat = false,
      hideTableActions = false,
      handleClearSearchInline,
      aboveTableComponent: belowHeaderComponent,
      hideTableSetting = false,
      explicitlyCloseTableSetting = false,
      handleCloseInputField,
      customHeaderComponent,
      debounceTime = 1500,
      ...args
    },
    ref
  ) => {
    LicenseManager.setLicenseKey(
      "Using_this_{AG_Grid}_Enterprise_key_{AG-072820}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Impact_Analytics}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{31_December_2025}____[v3]_[01]_MTc2NzEzOTIwMDAwMA==acb63fc998feb69e3a3ca9ad323b2577"
    );

    const tempRef = useRef();
    const actualRef = ref || tempRef;
    const [localPageSize, setLocalPageSize] = useState(
      defaultPageSize || paginationPageSizeSelector[0]
    );
    const [initialFilters, setInitialFilters] = useState([]);
    const [girdColumns, setGridColumns] = useState([]);
    const [tableSettingOpen, setTableSettingOpen] = useState(false);

    const [rowHeight, setRowHeight] = useState(
      rowHei === "comfort" ? 52 : rowHei === "compact" ? 30 : 46
    );

    const [tableFontSize, setTableFontSize] = useState("medium");
    const buttonRef = useRef(null);
    const nestedTableRef = useRef(null);
    const [isAdvanceSearch, setAdvanceSearch] = useState(false);
    const [currentColumnId, setCurrentColumnId] = useState(null);
    const [
      selectedThirdOptionDropdownValue,
      setSelectedThirdOptionDropdownValue,
    ] = useState(null);
    const filteredColumnsInitialOptions = useMemo(
      () => convertToOptions(colDefs || []),
      [colDefs]
    );
    const toggleAdvanceSearch = (colId) => {
      setAdvanceSearch((prev) => !prev);

      if (Array.isArray(colId)) {
        // Handle multiple fields
        setCurrentColumnId(colId[0] || null); // You can pick the first one for UI reference

        setInitialFilters((prev) => {
          const newFilters = [...prev];

          colId.forEach((id) => {
            const isColumnHave = newFilters.find(
              (filter) => filter.column?.value === id
            );

            if (!isColumnHave) {
              const columnOption = filteredColumnsInitialOptions?.find(
                (opt) => opt?.value === id
              );

              if (columnOption) {
                newFilters.push({
                  column: columnOption,
                  operation: null,
                  value: "",
                });
              }
            }
          });

          return newFilters;
        });
      } else if (typeof colId === "string" || typeof colId === "number") {
        // Handle single field
        setCurrentColumnId(colId || null);

        setInitialFilters((prev) => {
          const isColumnHave = prev?.find(
            (filter) => filter.column?.value === colId
          );

          if (isColumnHave) {
            return prev;
          } else {
            const columnOption = filteredColumnsInitialOptions?.find(
              (opt) => opt?.value === colId
            );

            return [
              ...prev,
              {
                column: columnOption,
                operation: null,
                value: "",
              },
            ];
          }
        });
      }
    };

    const defaultColDef = useMemo(() => {
      return {
        ...defColDef,
        filter: true,
        resizable: true,
      };
    }, []);

    const addSpecialAttributes = (children) =>
      children.map((child) => {
        const obj = {
          ...child,
          cellClass:
            (child.cellClass || "") +
            (child.editable ? " editable-ag-cell" : "") +
            (child.type === "number" ? " number-cell" : "") +
            (rowHeight === 46
              ? " default-cell"
              : rowHeight === 30
              ? " compact-cell"
              : " comfort-cell"),
          headerClass:
            (child.headerClass || "") +
            (child.type === "number" ? " number-cell" : ""),
          width:
            child.checkboxSelection || child.headerCheckboxSelection
              ? "40px"
              : child.width || undefined,
        };

        if (child.children) {
          obj.children = addSpecialAttributes(child.children);
        } else {
          const temp = obj.headerComponent;

          obj.headerComponent = customHeaderComponent
            ? customHeaderComponent
            : (props) => (
                <AgGridHeader
                  {...props}
                  onClick={() => {
                    selectColumn([props.column.colId]);
                  }}
                  onColumnSearchClick={onColumnSearchClick}
                  applySort={applySort}
                  onFilterChanged={onFilterChanged}
                  sortModel={sortModel}
                  toggleAdvanceSearch={toggleAdvanceSearch}
                  handleInlineSearch={handleInlineSearch}
                  onAdvanceSearchClick={onAdvanceSearchClick}
                  handleClearSearchInline={handleClearSearchInline}
                  handleCloseInputField={handleCloseInputField}
                  debounceTime={debounceTime}
                >
                  {temp ? temp(props) : props.displayName}
                </AgGridHeader>
              );
        }
        return obj;
      });

    const columnDefs = useMemo(() => {
      if (actualRef?.current?.api) {
        actualRef?.current?.api?.setGridOption("columnDefs", colDefs);
      }
      return addSpecialAttributes(colDefs);
    }, [colDefs, rowHeight, actualRef]);

    const selectColumn = (cols) => {
      actualRef?.current.api.clearRangeSelection();
      actualRef?.current.api.addCellRange({ columns: cols });
    };

    useEffect(() => {
      const copyColumns = cloneDeep(actualRef?.current?.api?.getColumnDefs());
      let cols = copyColumns;
      if (tableFontSize) {
        cols = cols?.map((value) => {
          if (value?.field !== "Selection") {
            if (typeof value?.cellStyle !== "function") {
              value.cellStyle = {
                ...value.cellStyle,
                fontSize: updateFontSizeOnToolPanel(tableFontSize),
              };
            }
          }
          return value;
        });
      }
      setGridColumns(cols);
    }, [columnDefs, tableFontSize]);

    useEffect(() => {
      setGridColumns(columnDefs);
    }, [columnDefs]);

    const paginationChanged = (params) => {
      setDynmaicStyleToButtonComponent();
      onPaginationChanged(params);
    };

    const setDynmaicStyleToButtonComponent = () => {
      const span = document.querySelector(".ag-paging-row-summary-panel");
      if (span) {
        let actualWidth = span.offsetWidth + 61;
        if (buttonRef?.current) {
          buttonRef.current.style.right = `${actualWidth}px`;
          if (tableSettingOpen) {
            buttonRef.current.style.right = `${actualWidth + 375}px`;
          } else {
            buttonRef.current.style.right = `${actualWidth}px`;
          }
        }
      }
    };

    useEffect(() => {
      setDynmaicStyleToButtonComponent();
      const div = document.querySelector(".ag-root-wrapper-body");
      if (div) {
        let actualHeight = div.offsetHeight;
        let tableContainer = document.querySelector(`#${gridId || "myGrid"}`);
        if (tableSettingOpen) {
          if (actualHeight < 480) {
            if (tableContainer) {
              tableContainer.style.height = `551px`;
              if (buttonRef && buttonRef.current)
                buttonRef.current.style.bottom = `${480 - actualHeight - 37}px`;
            }
          } else {
            document.querySelector(
              ".display-table-setting"
            ).style.height = `${actualHeight}px`;
          }
        } else {
          if (tableContainer) tableContainer.style.height = `unset`;
          if (buttonRef && buttonRef.current)
            buttonRef.current.style.bottom = cardContainer ? `25px` : `13px`;
        }
      }
    }, [tableSettingOpen, cardContainer]);

    useEffect(() => {
      if (nestedTable && nestedTableRef.current) {
        const rect = nestedTableRef.current.getBoundingClientRect();
        setTimeout(() => {
          window.scrollTo({
            top: rect.top,
            behavior: "smooth",
          });
        }, 100);
      }
    }, [nestedTable]);

    const onSearchApplyClicks = (formValues) => {
      if (onSearchApplyClick) {
        onSearchApplyClick(formValues);
        toggleAdvanceSearch();
        return;
      }
      const rest = actualRef?.current;
      formValues.forEach((value) => {
        // Recursively find the column definition
        const findColumnDef = (cols, field) => {
          for (const col of cols) {
            if (col.children) {
              const found = findColumnDef(col.children, field);
              if (found) return found;
            }
            if (col.field === field) return col;
          }
          return null;
        };

        const columnDef = findColumnDef(colDefs, value?.column?.value);
        const type = columnDef?.type;

        const parsedValue =
          type === "number"
            ? parseFloat(value?.value)
            : typeof value?.value === "string"
            ? value?.value
            : value?.value?.value;

        const currentFilterModel = rest?.sortModel
          ? rest?.sortModel
          : rest.api.getFilterModel();
        currentFilterModel[value?.column?.value] =
          parsedValue != null || parsedValue !== ""
            ? {
                type: value?.operation?.value || "contains",
                filter: parsedValue,
                filterType: type,
              }
            : undefined;

        rest.api.setFilterModel(currentFilterModel);
      });
      rest.api.onFilterChanged();
      toggleAdvanceSearch();
    };

    return (
      <div
        className="ag-theme-alpine ia-basic-table-layout table-v32"
        style={{
          width: "100%",
          "--ag-grid-height": height || "500px",
        }}
      >
        <div
          className={`impact-table-main-container  ${
            cardContainer ? "card-container" : ""
          } ${tableSettingOpen ? "table-setting-open" : ""} ${
            bottomLeftOptions || bottomCenterOptions
              ? "footer-button-with-bottom-options"
              : ""
          }`}
          id={gridId || "myGrid"}
        >
          <TableHeader
            actualRef={actualRef}
            colDefs={colDefs}
            Columns={Columns}
            rowHeight={rowHeight}
            setRowHeight={setRowHeight}
            tableFontSize={tableFontSize}
            setTableFontSize={setTableFontSize}
            tableHeader={tableHeader}
            topRightOptions={topRightOptions}
            topLeftOptions={topLeftOptions}
            onGlobalSearchClick={onGlobalSearchClick}
            cardContainer={cardContainer}
            onNumberFormatChange={onNumberFormatChange}
            hideRowHeightOptionMenu={hideRowHeightOptionMenu}
            showDownloadButton={showDownloadButton}
            onDownloadButtonClick={onDownloadButtonClick}
            closeButton={closeButton}
            handleCloseButtonClick={handleCloseButtonClick}
            additionalButtons={additionalButtons}
            setTableSettingOpen={setTableSettingOpen}
            showHideEditableCells={showHideEditableCells}
            handleShowHideEditableCells={handleShowHideEditableCells}
            topCenterOptions={topCenterOptions}
            showContentualFilter={showContentualFilter}
            showContentualFilterBadge={showContentualFilterBadge}
            onContentualFilterClick={onContentualFilterClick}
            contentualFilterProps={contentualFilterProps}
            contentualFilterComponent={contentualFilterComponent}
            tableActions={tableActions}
            onTableActionsTabClick={onTableActionsTabClick}
            hideTableFormat={hideTableFormat}
            hideTableActions={hideTableActions}
            hideTableSetting={hideTableSetting}
            explicitlyCloseTableSetting={explicitlyCloseTableSetting}
          />
          {belowHeaderComponent && belowHeaderComponent}
          <AgGridReact
            {...args}
            ref={actualRef}
            domLayout="autoHeight"
            rowHeight={rowHeight}
            columnDefs={girdColumns}
            headerHeight={40}
            defaultColDef={defaultColDef}
            enableRangeSelection
            suppressMenuHide
            getMainMenuItems={customGetMainMenuItems || getMainMenuItems}
            paginationPageSize={localPageSize}
            onPaginationChanged={paginationChanged}
            popupParent={document.body}
          />
          {(bottomLeftOptions || bottomCenterOptions || args.pagination) && (
            <div
              className={`table-footer-section ${
                !bottomLeftOptions && !bottomCenterOptions
                  ? "table-footer-section-with-only-pagination"
                  : ""
              } ${
                !args.pagination
                  ? "table-footer-section-without-pagination"
                  : ""
              }`}
              style={{
                width: hidePaginationPageSizeSelector && "60%",
              }}
              ref={buttonRef}
            >
              {bottomLeftOptions && (
                <div className="table-footer-left-section">
                  {bottomLeftOptions}
                </div>
              )}
              {bottomCenterOptions && (
                <div className="table-footer-center-section">
                  {bottomCenterOptions}
                </div>
              )}
              {!hidePaginationPageSizeSelector && args.pagination ? (
                <TablePagination
                  actualRef={actualRef}
                  localPageSize={localPageSize}
                  setLocalPageSize={setLocalPageSize}
                  paginationPageSizeSelector={
                    paginationPageSizeSelector.length > 0
                      ? paginationPageSizeSelector
                      : [10]
                  }
                  defaultPageSize={defaultPageSize}
                />
              ) : null}
            </div>
          )}
          {nestedTable && (
            <div className="nested-table-container" ref={nestedTableRef}>
              {nestedTableComponent}
            </div>
          )}
          {isAdvanceSearch && (
            <TableAdvanceSearchModal
              isAdvanceSearch={isAdvanceSearch}
              toggleAdvanceSearch={toggleAdvanceSearch}
              colDefs={colDefs}
              actualRef={actualRef}
              onSearchApplyClick={onSearchApplyClicks}
              currentColumnId={currentColumnId}
              initialFilters={initialFilters}
              setInitialFilters={setInitialFilters}
              savedAdvanceSearchConfig={savedAdvanceSearchConfig}
              selectedThirdOptionDropdownValue={
                selectedThirdOptionDropdownValue
              }
              setSelectedThirdOptionDropdownValue={
                setSelectedThirdOptionDropdownValue
              }
              {...args}
            />
          )}
        </div>
      </div>
    );
  }
);
