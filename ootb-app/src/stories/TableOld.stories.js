import React from "react";
import { OldTable } from "../components/TableOld";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";
import {
  carsData,
  olympicData,
  masterData,
} from "../components/TableOld/mockData";

export default {
  title: "Components/Old Table (WIP)",
  component: OldTable,
  tags: ["autodocs"],
  parameters: {
    // layout: "centered",
    docs: {
      description: {
        component: `All the props that you can pass to AG-Grid can be passed to Table component. <strong style="font-weight:bold;">Note:</strong> This Table is based on V27 and still in testing phase.`,
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
    // tableActionOptions: {
    //   description:
    //     "React Children you want to render at the Top Right Table Header Section.",
    //   table: {
    //     defaultValue: { summary: "" },
    //     type: { summary: "React Children" },
    //   },
    // },
    bottomLeftOptions: {
      description:
        "React Children you want to render at the Bottom Left Table Header Section.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "React Children" },
      },
    },
    bottomCenterOptions: {
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
    customHeaderComponent: {
      description: "React Children to be rendered in the table header.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
    },
  },
  args: { onNumberFormatChange: fn() },
};

export const Default = {
  args: {
    rowHeight: "default",
    cardContainer: false,
    rowData: carsData,
    pagination: true,
    columnDefs: [
      { field: "make", isSearchable: true, filter: "agTextColumnFilter" },
      { field: "model" },
      { field: "price", type: "number" },
      { field: "electric" },
      { field: "electric0" },
      { field: "electric1" },
      { field: "electric2" },
      { field: "electric3" },
      { field: "electric4" },
      { field: "electric5" },
    ],
    tableHeader: "Default Table",
    hideRowHeightOptionMenu: false,
    topRightOptions: (
      <>
        <Button label="Button">Top Right</Button>
        <Select placeholder="Select Options" />
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
  },
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
  return <Input type="text" value={params.value} />;
  //   return <input type="text" value={params.value} />;
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
        minWidth: 180,
      },
      {
        field: "sport",
        minWidth: 250,
      },
      {
        field: "gold",
      },
      { field: "silver" },
      { field: "bronze" },
      {
        field: "total",
        pinned: "right",
        minHeight: 40,
        cellRenderer: InputRenderer,
        cellClass: "cell-renderer",
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
        children: [
          {
            headerName: "Some header",
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
        // isSearchable: true
      },
      {
        field: "title",
        headerName: "Title",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "description",
        headerName: "Description",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "price",
        headerName: "Price",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "discountPercentage",
        headerName: "Discount %",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "rating",
        headerName: "Rating",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "stock",
        headerName: "Stock",
        filter: "agNumberColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "brand",
        headerName: "Brand",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
      },
      {
        field: "category",
        headerName: "Category",
        filter: "agTextColumnFilter",
        cellClass: "cell-renderer",
        // isSearchable: true
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
      // floatingFilter: true,
      cellClass: "cell-renderer",
      isSearchable: true,
    },
    tableHeader: "Server-side Paginated Products Table",
  },
};

const nestedTableComponent = (
  <OldTable
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
