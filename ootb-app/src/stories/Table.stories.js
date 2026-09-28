import React from "react";
import { Table } from "../components/Table";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { DateRangePicker } from "../components/DateRangePicker";
import { Badge } from "../components/Badge";
import { useState } from "react";
import { fn } from "@storybook/test";
import {
  carsData,
  olympicData,
  masterData,
} from "../components/Table/mockData";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    // layout: "centered",
    docs: {
      description: {
        component: `All the props that you can pass to AG-Grid can be passed to Table component. <strong style="font-weight:bold;">Note:</strong> This Table is based on V32 and still in testing phase.`,
      },
    },
  },
  argTypes: {
    tableHeader: {
      description: "Title of the Table.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    cardContainer: {
      description: "If true, display Table component in the card UI.",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    rowData: {
      description: "Array object holding different rows data of the Table.",
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array Object" },
      },
    },
    columnDefs: {
      description: `Array object holding different columns header data of the Table. 
        <code>
          <ul class="storybook-order-list">
            <li><strong>field</strong>: field of the column [string]</li>
            <li><strong>isSearchable?</strong>: If true, display search <br/>icon on the Column Header. [boolean]</li>
          </ul>
        </code>`,
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array Object" },
      },
    },
    rowHeight: {
      description: "You can choose different height of the Row of the Table.",
      control: { type: "radio" },
      options: ["compact", "comfort", "default"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    topLeftOptions: {
      description:
        "React Children you want to render along with header at the Top Left Table Header Section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    topRightOptions: {
      description:
        "React Children you want to render at the Top Right Table Header Section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    bottomLeftOptions: {
      description:
        "React Children you want to render at the Bottom Left Table Header Section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    bottomRightOptions: {
      description:
        "React Children you want to render at the Bottom Right Table Header Section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    onNumberFormatChange: {
      description:
        "You can handle the event when number format changes in Table Setting Section.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "Function" },
      },
    },
    onColumnSearchClick: {
      description:
        "You can handle the search event when user click on the search icon in the Table Header.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "Function" },
      },
    },
    hideRowHeightOptionMenu: {
      description: "If true, disabled the rowHeight option menu.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    showDownloadButton: {
      description: "If true, render the download button.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    onDownloadButtonClick: {
      description: "You can handle the event when download button is click",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "Function" },
      },
    },
    nestedTable: {
      description:
        "If true, render the component which is passed in the nestedTableComponent props within the same card-container",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    nestedTableComponent: {
      description:
        "React Children you want to render within the same card-container",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    closeButton: {
      description: "If true, render the close button",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
      control: { type: "boolean" },
    },
    handleCloseButtonClick: {
      description: "You can handle the event when close button is click",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "Function" },
      },
    },
    applySort: {
      description: "If true, enabled the sorting on column header click",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    gridId: {
      description:
        "Unique identifier for the grid. It is mandatory to pass this prop when there are multiple grids on the same screen.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
      control: { type: "text" },
    },
    additionalButton: {
      description:
        "Additional button to be rendered in the table more content section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    showContentualFilter: {
      description: "If true, render the contentual filter.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    showContentualFilterBadge: {
      description:
        "If true, render the contentual filter badge when selected filters are present.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    contentualFilterProps: {
      description:
        "Props for the contentual filter component i.e same as filters strip props if using default component.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "Object" },
      },
    },
    contentualFilterComponent: {
      description: "Custom Component to be rendered in the contentual filter.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    showFilterStrip: {
      description: "If true, shows the filter strip below the table header",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    filterStripProps: {
      description: "Props to be passed to the FilterStrip component",
      table: {
        type: { summary: "object" },
      },
    },
    onContextualFilterClick: {
      description: "Function to handle the contextual filter click event",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    contextualFilterLabel: {
      description: "Label for the contextual filter button",
      table: {
        type: { summary: "string" },
      },
    },
    contextualFilterIcon: {
      description: "Icon to be displayed in the contextual filter button",
      table: {
        type: { summary: "node" },
      },
    },
    hidePaginationPageSizeSelector: {
      description: "If true, disabled the pagination page size selector.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
      control: { type: "boolean" },
      options: [true, false],
    },
    onTableActionsTabClick: {
      description:
        "Callback function that is called when the table actions tab is clicked in the table settings panel.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    customGetMainMenuItems: {
      description: `Custom function to override the default column menu items. This function receives the column parameters and should return an array of menu items.
      <br/>
      <br/>
      Example:
      <br/>
      <code>
      const customGetMainMenuItems = (params) => {
        const { column } = params;
        return [
          {
            name: "Custom Menu Item",
            action: () => {
              console.log("Custom action for column:", column.colId);
            }
          }
        ];
      };
      </code>`,
      control: { type: "function" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "(params: { column: Column }) => Array<MenuItem>" },
      },
    },
    onAdvanceSearchClick: {
      description:
        "Callback function that is called when the advance search button is clicked in the table header.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    customHeaderIcons: {
      description: `Array of custom icons to be displayed in the table header. Each icon should be a React element.
      <br/>
      <br/>
      Example:
      <br/>
      <code>
      const customHeaderIcons = [
        {
          icon: <SearchIcon />,
          onClick: () => console.log("Search clicked"),
          tooltip: "Search"
        }
      ];
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "[]" },
        type: {
          summary:
            "Array<{ icon: ReactNode, onClick: () => void, tooltip?: string }>",
        },
      },
    },
    handleInlineSearch: {
      description:
        "Callback function that is called when inline search is performed in the table.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "(searchText: string) => void" },
      },
    },
    tableActions: {
      description: `Custom actions to be displayed in the table settings panel. This can be any valid React element or component.
      <br/>
      <br/>
      Example:
      <br/>
      <code>
      <Button
        iconPlacement="left"
        onClick={() => {}}
        size="large"
        variant="primary"
      >
        Table Actions
      </Button>
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
    },
    hideTableFormat: {
      description:
        "If true, hide the table format section in the table settings panel.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    hideTableActions: {
      description:
        "If true, hide the table actions section in the table settings panel.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    handleClearSearchInline: {
      description:
        "Callback function that is called when the clear search button is clicked in the inline search input.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    handleCloseInputField: {
      description:
        "Callback function that is called when the input field is closed in the table settings panel.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "() => void" },
      },
    },
    aboveTableComponent: {
      description: "React Children to be rendered above the table.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
    },
    explicitlyCloseTableSetting: {
      description: "If true, explicitly close the table settings panel.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    hideTableSetting: {
      description: "If true, hide the table settings panel.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    onNumberFormatChange: fn(),
    onContextualFilterClick: fn(),
  },
};

const contentualFilterProps = {
  filterButtonClick: () => {},
  filterButtonLabel: "Select Filters",
  filterDropDownLabel: "Applied Filters: ",
  filterTags: [
    {
      handleViewAll: () => {},
      id: 1,
      label: "TimeLine",
      required: true,
      values: [
        {
          id: 1,
          label: "LW",
        },
        {
          id: 1,
          label: "Department 2",
        },
        {
          id: 1,
          label: "Department 3",
        },
        {
          id: 1,
          label: "Department 4",
        },
        {
          id: 1,
          label: "Department 5",
        },
        {
          id: 1,
          label: "Department 6",
        },
        {
          id: 1,
          label: "Department 7",
        },
      ],
    },
    {
      handleViewAll: () => {},
      id: 2,
      label: "Compared to",
      required: true,
      values: [
        {
          id: 1,
          label: "Plan",
        },
      ],
    },
  ],
  handleApplyFilter: () => {},
  handleCancelFilter: () => {},
  recentFilters: [
    {
      filterSet: [
        {
          id: 1,
          label: "Filter label_01",
        },
        {
          id: 2,
          label: "Filter label_02",
        },
        {
          id: 3,
          label: "Filter label_03",
        },
      ],
      handleRecentFilter: () => {},
      id: 1,
    },
    {
      filterSet: [
        {
          id: 1,
          label: "Filter label_01",
        },
        {
          id: 2,
          label: "Filter label_02",
        },
        {
          id: 3,
          label: "Filter label_03",
        },
      ],
      handleRecentFilter: () => {},
      id: 2,
    },
  ],
  savedFilterLists: [
    {
      id: 1,
      label: "Saved Filter_01",
      value: "filter_01",
    },
    {
      id: 2,
      label: "Saved Filter_02",
      value: "filter_02",
    },
    {
      id: 3,
      label: "Saved Filter_03",
      value: "filter_03",
    },
    {
      id: 4,
      label: "Saved Filter_04",
      value: "filter_04",
    },
    {
      id: 5,
      label: "Saved Filter_05",
      value: "filter_05",
    },
    {
      id: 6,
      label: "Saved Filter_06",
      value: "filter_06",
    },
    {
      id: 7,
      label: "Saved Filter_07",
      value: "filter_07",
    },
    {
      id: 8,
      label: "Saved Filter_08",
      value: "filter_08",
    },
  ],
  savedFiltersBadge: [
    {
      handleClick: () => {},
      id: 1,
      label: "All",
    },
    {
      handleClick: () => {},
      id: 2,
      label: "Global",
    },
    {
      handleClick: () => {},
      id: 1,
      label: "Personal",
    },
  ],
  selectedFilter: "Not selected",
  setSelectedFilter: () => {},
};

const TableComponent = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  const [rowData, setRowData] = useState(args.rowData);

  return (
    <Table
      {...args}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      rowData={rowData}
      setRowData={setRowData}
    />
  );
};

export const Default = (args) => <TableComponent {...args} />;

Default.args = {
  tableHeader: "Table",
  cardContainer: true,
  rowData: carsData,
  columnDefs: [
    {
      advanceSearchEnabled: true,
      field: "make",
      filter: "agTextColumnFilter",
      isSearchable: true,
      thirdOptionAsDropdown: true,
      toShowDuplicateColumnInAdvanceSearch: true,
      thirdOptionDropdownOptions: [
        { label: "Tesla", value: "tesla" },
        { label: "Ford", value: "ford" },
        { label: "Toyota", value: "toyota" },
        { label: "Honda", value: "honda" },
        { label: "Hyundai", value: "hyundai" },
        { label: "Kia", value: "kia" },
        { label: "Volkswagen", value: "volkswagen" },
        { label: "Mercedes-Benz", value: "mercedes-benz" },
        { label: "BMW", value: "bmw" },
        { label: "Audi", value: "audi" },
        { label: "Volvo", value: "volvo" },
        { label: "Jeep", value: "jeep" },
        { label: "Land Rover", value: "land-rover" },
        { label: "Lexus", value: "lexus" },
        { label: "Mazda", value: "mazda" },
        { label: "Nissan", value: "nissan" },
        { label: "Peugeot", value: "peugeot" },
        { label: "Renault", value: "renault" },
        { label: "Skoda", value: "skoda" },
        { label: "Suzuki", value: "suzuki" },
        { label: "Toyota", value: "toyota" },
        { label: "Volkswagen", value: "volkswagen" },
        { label: "Volvo", value: "volvo" },
      ],
    },
    {
      field: "model",
      filter: "agTextColumnFilter",
      advanceSearchEnabled: true,
      isSearchable: true,
      toShowDuplicateColumnInAdvanceSearch: true,
    },
    { field: "electric" },
    { field: "electric1" },
    { field: "electric2" },
  ],
  rowHeight: "default",
  showFilterStrip: false,
  contextualFilterLabel: "Filter",
  filterStripProps: {
    filters: [],
    onApplyFilter: () => console.log("Filter applied"),
    onCancelFilter: () => console.log("Filter cancelled"),
  },
  tableHeader: "Default Table",
  hideRowHeightOptionMenu: false,
  topRightOptions: (
    <>
      <Button label="Button">Top Right</Button>
      <Select placeholder="Select Options" />
      <Button label="Button">Top Right</Button>
      <Button label="Button">Top Right</Button>
    </>
  ),
  additionalButtons: (
    <>
      <Button label="Button">Top Right</Button>
      <Button label="Button">Top Right</Button>
    </>
  ),
  topLeftOptions: (
    <>
      <Button label="Button">Top Left</Button>
    </>
  ),
  bottomLeftOptions: (
    <>
      <Button label="Button">Bottom Left Side</Button>
    </>
  ),
  bottomCenterOptions: (
    <>
      <Button label="Button">Bottom Right Side</Button>
    </>
  ),
  showContentualFilter: true,
  showContentualFilterBadge: false,
  onContentualFilterClick: () => {},
  contentualFilterProps: contentualFilterProps,
};

export const WithSearch = (args) => <TableComponent {...args} />;

WithSearch.args = {
  ...Default.args,
};

export const WithCustomRenderers = (args) => <TableComponent {...args} />;

WithCustomRenderers.args = {
  ...Default.args,
  // Add custom renderers here
};

export const Frozen = {
  args: {
    rowData: carsData,
    columnDefs: [
      { field: "make" },
      { field: "model" },
      { field: "price", pinned: "left" },
      { field: "electric" },
      { field: "electric0" },
      { field: "electric1" },
      { field: "electric2", pinned: "right" },
      { field: "electric3" },
      { field: "electric4" },
      { field: "electric5" },
    ],
    tableHeader: "Frozen Columns (Left & Right)",
  },
};

export const RowSelect = {
  args: {
    rowData: carsData,
    columnDefs: [
      {
        field: "",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        suppressMenu: true,
        filter: false,
        sortable: false,
        pinned: "left",
      },
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
      { field: "electric0" },
      { field: "electric1" },
      { field: "electric2" },
      { field: "electric3" },
      { field: "electric4" },
      { field: "electric5" },
    ],
    tableHeader: "Selectable Rows",
  },
};

export const RowGroup = {
  args: {
    rowData: olympicData,
    columnDefs: [
      { field: "athlete" },
      { field: "age" },
      { field: "country", rowGroup: true },
      { field: "year", rowGroup: true },
      {
        field: "date",
      },
      {
        field: "sport",
      },
      {
        field: "gold",
      },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ],
    tableHeader: "Grouped Rows",
  },
};

const InputRenderer = (params) => {
  const [value, setValue] = useState(params.value);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      leftIcon={!isDisabled ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
      iconClickOnDisabled={isDisabled}
      isDisabled={isDisabled}
      leftIconClick={() => setIsDisabled(!isDisabled)}
    />
  );
};

const DateRenderer = (params) => {
  return <DateRangePicker value={params.value} withPortal />;
};

const BadgeRenderer = (params) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {params.value}
      <Badge label={params.value} />
    </div>
  );
};
const SelectRenderer = (params) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([
    { label: "0", value: "0" },
  ]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <Select
      placeholder={"Multi Select"}
      initialOptions={[
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      currentOptions={currentOptions}
      setCurrentOptions={setCurrentOptions}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      isSelectAll={isSelectAll}
      setIsSelectAll={setIsSelectAll}
      withPortal
      isAgGridCellRenderer
      column={params.column}
    />
  );
};
export const CellRenderer = {
  args: {
    rowData: olympicData,
    columnDefs: [
      { field: "athlete", minWidth: 200, pinned: "left" },
      { field: "age", pinned: "left" },
      { field: "country", minWidth: 200 },
      { field: "year" },
      {
        field: "date",
        cellRenderer: SelectRenderer,
        cellClass: ["cell-renderer"],
        // minWidth: 250,
        resizable: true,
      },
      {
        field: "sport",
        minWidth: 250,
      },
      {
        field: "gold",
        cellRenderer: BadgeRenderer,
        cellClass: ["cell-renderer"],
      },
      {
        field: "silver",
        cellRenderer: DateRenderer,
        cellClass: ["cell-renderer"],
        minWidth: 254,
      },
      { field: "bronze" },
      {
        field: "total",
        pinned: "right",
        cellRenderer: InputRenderer,
        cellClass: "cell-renderer",
        type: "number",
      },
    ],
    tableHeader: "Table with Cell Renderer",
  },
};

export const Master = {
  args: {
    rowData: masterData,
    columnDefs: [
      { field: "name", cellRenderer: "agGroupCellRenderer" },
      { field: "account" },
      { field: "calls" },
      { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
    ],
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "number", minWidth: 150 },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode", minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    },
    masterDetail: true,
    tableHeader: "Master Details Table",
  },
};

export const Aggregation = {
  args: {
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
    ],
    columnDefs: [
      { field: "make", flex: 1, aggFunc: () => "Grand Total" },
      { field: "model", flex: 1 },
      { field: "price", type: "number", aggFunc: "sum" },
    ],
    groupIncludeTotalFooter: true,
    tableHeader: "Aggregation",
  },
};

export const Paginated = {
  args: {
    rowData: olympicData,
    columnDefs: [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      {
        field: "date",
      },
      {
        field: "sport",
      },
      {
        field: "gold",
      },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ],
    pagination: true,
    defaultPageSize: 5,
    tableHeader: "Paginated Table",
  },
};

export const ColumnGroup = {
  args: {
    rowData: carsData,
    columnDefs: [
      {
        headerName: "Some grand header",
        field: "Some grand header",
        children: [
          {
            headerName: "Some header",
            field: "Some header",
            children: [
              { field: "make", columnGroupShow: "open" },
              { field: "model", columnGroupShow: "open" },
              { field: "price" },
            ],
          },
          { field: "electric", headerClass: "span-2" },
        ],
      },
      { field: "year", headerClass: "span-3" },
    ],
    tableHeader: "Column Group Table",
  },
  parameters: {
    docs: {
      description: {
        story: `In order to make a header span multiple header rows, you need to pass headerClass to the columnDef<br>
        'span-2' will span 2 rows, 'span-3' will span 3 rows and so on<br>
        Check the code for more details`,
      },
    },
  },
};

export const EditableColumn = {
  args: {
    rowData: carsData,
    columnDefs: [
      { field: "make" },
      { field: "model" },
      { field: "price", editable: true },
      { field: "electric" },
      { field: "year" },
    ],
    tableHeader: "Column Group Table",
  },
};

export const HeaderComponent = {
  args: {
    rowData: carsData,
    columnDefs: [
      { field: "make" },
      { field: "model" },
      {
        field: "price",
        headerComponent: (props) => <>Price</>,
      },
      { field: "electric" },
      { field: "year" },
    ],
    tableHeader: "Column Group Table",
  },
};

const createDummyJsonDataSource = (props) => {
  const { endpoint = "products" } = props;

  return {
    getRows: async (params) => {
      const { startRow, endRow, sortModel, filterModel } = params.request;

      // Calculate pagination
      const limit = endRow - startRow;
      const skip = startRow;

      // Build URL with parameters
      let url = `https://dummyjson.com/${endpoint}?limit=${limit}&skip=${skip}`;

      // Add sorting if present
      if (sortModel && sortModel.length > 0) {
        const sort = sortModel[0];
        // Note: DummyJSON doesn't support sorting, but this shows how it would be implemented
        url += `&sort=${sort.colId}&order=${sort.sort}`;
      }

      // Add filtering if present
      if (filterModel) {
        Object.entries(filterModel).forEach(([field, filter]) => {
          if (filter.filter) {
            // Note: DummyJSON supports search but not per-field filtering
            url += `&q=${filter.filter}`;
          }
        });
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        params.success({
          rowData: data.products,
          rowCount: data.total,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        params.fail();
      }
    },
  };
};

export const ServerSide = {
  args: {
    rowModelType: "serverSide",
    columnDefs: [
      {
        field: "id",
        headerName: "ID",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "title",
        headerName: "Title",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "description",
        headerName: "Description",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "price",
        headerName: "Price",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "discountPercentage",
        headerName: "Discount %",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "rating",
        headerName: "Rating",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "stock",
        headerName: "Stock",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "brand",
        headerName: "Brand",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
      },
      {
        field: "category",
        headerName: "Category",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    cacheBlockSize: 10,
    onGridReady: (params) => {
      const dataSource = createDummyJsonDataSource({
        endpoint: "products",
      });
      params.api.setGridOption("serverSideDatasource", dataSource);
    },
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      sortable: true,
      filter: "agTextColumnFilter",
      cellClass: "cell-renderer",
      isSearchable: true,
    },
    tableHeader: "Server-side Paginated Products Table",
  },
};

const nestedTableComponent = (
  <Table
    columnDefs={[
      {
        field: "make",
      },
      {
        field: "model",
      },
      {
        field: "price",
        pinned: "left",
      },
      {
        field: "electric",
      },
      {
        field: "electric0",
      },
      {
        field: "electric1",
      },
      {
        field: "electric2",
        pinned: "right",
      },
      {
        field: "electric3",
      },
      {
        field: "electric4",
      },
      {
        field: "electric5",
      },
    ]}
    onNumberFormatChange={() => {}}
    rowData={[
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Tesla",
        model: "Model Y",
        price: 64950,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Ford",
        model: "F-Series",
        price: 33850,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "maruti",
        model: "dhoni",
        price: 29600,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Toyota",
        model: "dhoni",
        price: 29600,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Toyota",
        model: "dhoni",
        price: 29600,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Toyota",
        model: "Corolla",
        price: 29600,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Toyota",
        model: "Corolla",
        price: 29600,
      },
      {
        electric: true,
        electric0: true,
        electric1: "kunal",
        electric2: "Patel",
        electric3: "Bangalore",
        electric4: "Karnataka",
        electric5: "India",
        make: "Toyota",
        model: "Corolla",
        price: 29600,
      },
    ]}
    tableHeader="Frozen Columns (Left & Right)"
    closeButton={true}
  />
);

export const nestedTable = {
  args: {
    rowData: carsData,
    columnDefs: [
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
      { field: "year" },
      { field: "make" },
    ],
    nestedTable: true,
    nestedTableComponent: nestedTableComponent,
    tableHeader: "Nested Table",
  },
};
