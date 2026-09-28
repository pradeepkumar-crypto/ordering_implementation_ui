
import { Input } from "../Input";
import { Tooltip } from "../Tooltip";
import { DateRangePicker } from "../DateRangePicker";
import { Table } from "./index";
import { Button } from "../Button";
import { Menu } from "../Menu";
// import { NestedMenu } from "../SubMenu";
import { AccordionModern } from "../AccordionModern";
import { Badge } from "../Badge";
import { Select } from "../Select";
import { useState } from "react";
import { FiltersStrip } from "../FiltersStrip";
import moment from "moment";

export default function TableMock() {
  const [openTable, setOpenTable] = useState(false);
  const [rowData, setRowData] = useState([
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA ",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-01",
      // scenario_1: "Scenario 1",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USAqwerftgyhjfgasdfghjsdfghjk,ldfghnjk",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-02",
      // scenario_1: "Scenario 2", 
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-03",
      // scenario_1: "Scenario 3",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-04",
      // scenario_1: "Scenario 4",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-05",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-06",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-07",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-08",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-09",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-10",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-11",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-12",
    },
    {
      make: "Tesla",
      make1: "USA",
      make2: "Electric",
      make3: "Tesla",
      make4: "USA",
      model: "Model Y",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-13",
    },
    {
      make: "Ford",
      make1: "USA",
      make2: "Gasoline",
      make3: "Ford",
      make4: "USA",
      model: "F-Series",
      price: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-14",
    },
    {
      make: "Toyota",
      make1: "Japan",
      make2: "Hybrid",
      make3: "Toyota",
      make4: "Japan",
      model: "Corolla",
      price: [{label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}, {label: "4", value: 4}, {label: "5", value: 5}, {label: "6", value: 6}, {label: "7", value: 7}, {label: "8", value: 8}, {label: "9", value: 9}, {label: "10", value: 10}],
      electric: true,
      electric0: true,
      electric1: "kunal",
      electric2: "Patel",
      electric3: "Bangalore",
      electric4: "Karnataka",
      electric5: "India",
      date: "2021-01-15",
    },
  ]);
  const InputRenderer = (params) => {
    const [value, setValue] = useState(params.value);
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  };
  const DateRenderer = (params) => {
    return <DateRangePicker value={params.value} withPortal />;
  };
  const TooltipRenderer = (params) => {
    console.log(params.value.length);
    return params.value.length > 20 ? (
      <Tooltip title={params.value} variant="primary" orientation="right">
        {" "}
        {params.value}{" "}
      </Tooltip>
    ) : (
      params.value
    );
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
    const [currentOptions, setCurrentOptions] = useState(params.value);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    return (
        <Select
          placeholder={"sdfasdfasdfadsfadfasdfdsafdsfasdfasdfsdsfsdadd"}
          // isMulti
          // isWithSearch
          initialOptions={params.value}
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

  let i = 0;
  const CustomCellRenderer = (params) => {
    return <div>{i++} Custom Cell Renderer</div>;
  };
  const nestedTableComponent = (
    <Table
      columnDefs={[
        {
          field: "make",
          isSearchable: true,
        },
        {
          field: "model",
          cellRenderer: (params) => {
            return (
              <Button
                label="Button"
                variant="url"
                onClick={() => setOpenTable(!openTable)}
              >
                {params.value}
              </Button>
            );
          },
        },
        {
          field: "price",
          type: "number",
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
      closeButton={true}
      handleCloseButtonClick={() => {
        setOpenTable(false);
      }}
      showDownloadButton
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
          total: "total",
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
    />
  );

  const headerComponent = () => {
    return (<>Hiss</>)
  }

  const customHeaderComponent = () => {
    return (<>Custom Header</>)
  }
  const contentualFilterProps = {
    filterButtonClick: () => {},
    filterButtonLabel: "All Filters",
    filterDropDownLabel: "Applied Filters: ",
    filterTags:[
      {
        handleViewAll: () => {},
        id: 1,
        label: 'TimeLine',
        required: true,
        values: [
          {
            id: 1,
            label: 'LW'
          },
          {
            id: 1,
            label: 'Department 2'
          },
          {
            id: 1,
            label: 'Department 3'
          },
          {
            id: 1,
            label: 'Department 4'
          },
          {
            id: 1,
            label: 'Department 5'
          },
          {
            id: 1,
            label: 'Department 6'
          },
          {
            id: 1,
            label: 'Department 7'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 2,
        label: 'Compared to',
        required: true,
        values: [
          {
            id: 1,
            label: 'Plan'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 3,
        label: 'Channel',
        required: false,
        values: [
          {
            id: 1,
            label: 'E-comm'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 4,
        label: 'Department',
        required: false,
        values: [
          {
            id: 1,
            label: 'Department 1'
          },
          {
            id: 1,
            label: 'Department 2'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 5,
        label: 'Division',
        required: false,
        values: [
          {
            id: 1,
            label: 'Division 1'
          },
          {
            id: 1,
            label: 'Division 2'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 6,
        label: 'Department',
        required: false,
        values: [
          {
            id: 1,
            label: 'Department 1'
          },
          {
            id: 1,
            label: 'Department 2'
          }
        ]
      },
      {
        handleViewAll: () => {},
        id: 7,
        label: 'Division',
        required: false,
        values: [
          {
            id: 1,
            label: 'Division 1'
          },
          {
            id: 1,
            label: 'Division 2'
          }
        ]
      }
    ],
    handleApplyFilter:() => {},
    handleCancelFilter:() => {},
    recentFilters:[
      {
        filterSet: [
          {
            id: 1,
            label: 'Filter label_01'
          },
          {
            id: 2,
            label: 'Filter label_02'
          },
          {
            id: 3,
            label: 'Filter label_03'
          }
        ],
        handleRecentFilter: () => {},
        id: 1
      },
      {
        filterSet: [
          {
            id: 1,
            label: 'Filter label_01'
          },
          {
            id: 2,
            label: 'Filter label_02'
          },
          {
            id: 3,
            label: 'Filter label_03'
          }
        ],
        handleRecentFilter: () => {},
        id: 2
      }
    ],
    savedFilterLists:[
      {
        id: 1,
        label: 'Saved Filter_01',
        value: 'filter_01'
      },
      {
        id: 2,
        label: 'Saved Filter_02',
        value: 'filter_02'
      },
      {
        id: 3,
        label: 'Saved Filter_03',
        value: 'filter_03'
      },
      {
        id: 4,
        label: 'Saved Filter_04',
        value: 'filter_04'
      },
      {
        id: 5,
        label: 'Saved Filter_05',
        value: 'filter_05'
      },
      {
        id: 6,
        label: 'Saved Filter_06',
        value: 'filter_06'
      },
      {
        id: 7,
        label: 'Saved Filter_07',
        value: 'filter_07'
      },
      {
        id: 8,
        label: 'Saved Filter_08',
        value: 'filter_08'
      }
    ],
    savedFiltersBadge:[
      {
        handleClick: () => {},
        id: 1,
        label: 'All'
      },
      {
        handleClick: () => {},
        id: 2,
        label: 'Global'
      },
      {
        handleClick: () => {},
        id: 1,
        label: 'Personal'
      }
    ],
    selectedFilter:"Not selected",
    setSelectedFilter:() => {},
  }

  return (
    // <Table
    //     // cardContainer={false}
    //     // bottomLeftOptions={<><Button label="Button">Bottom Left Side</Button></>}
    //     // bottomRightOptions={<><Button label="Button">Bottom Right Side</Button></>}
    //     rowSelection="multiple"
    //     additionalButtons={
    //       <>
    //         <Button label="Button">Bottom Right Side</Button>
    //       </>
    //     }
        // columnDefs={[
        //   {
        //     colId: "checkbox",
        //     field: "",
        //     checkboxSelection: true,
        //     headerCheckboxSelection: true,
        //     suppressMenu: true,
        //     filter: false,
        //     sortable: false,
        //     pinned: "left",
        //     order: 1,
        //   },
        //   {
        //     field: "scenario_1",
        //     colId: "scenario_1",
        //     headerName: "Scenario 1",
        //     cellRenderer: CustomCellRenderer,
        //     // cellRendererParams: {
        //     //   onUpdate: handleSimulationTableUpdate
        //     // },
        //     // valueGetter: (params) => {
        //     //   // Return the actual data value for sorting
        //     //   return params.data[params.column.colId];
        //     // },
        //     // comparator: (valueA, valueB, nodeA, nodeB) => {
        //     //   console.log("Comparator called!", { valueA, valueB, nodeA, nodeB });
              
        //     //   // Access the full row data
        //     //   const dataA = nodeA.data;
        //     //   const dataB = nodeB.data;
              
        //     //   // Sort based on whatever field you have available
        //     //   // For example, if you have an ID or some other field to sort by:
        //     //   return dataA.id - dataB.id;
              
        //     //   // Or if you have a display field:
        //     //   // return (dataA.displayField || "").localeCompare(dataB.displayField || "");
        //     // }
        //     hide: false,
        //     advanceSearchEnabled: true,
        //     filter: 'agTextColumnFilter',
        //     isSearchable: true,
        //     sortable: true,
        //     thirdOptionAsDropdown: true,
        //     // toShowDuplicateColumnInAdvanceSearch: true,
        //     columnFieldsInAdvanceSearch: ["Scenario 1 offer type", "Scenario 1 offer value"],
        //     thirdOptionDropdownOptions1: [{label: "Tesla", value: "tesla"}, {label: "Ford", value: "ford"}, {label: "Toyota", value: "toyota"}, {label: "Honda", value: "honda"},{label: "Hyundai", value: "hyundai"},{label: "Kia", value: "kia"},{label: "Volkswagen", value: "volkswagen"},{label: "Mercedes-Benz", value: "mercedes-benz"},{label: "BMW", value: "bmw"},{label: "Audi", value: "audi"},{label: "Volvo", value: "volvo"},{label: "Jeep", value: "jeep"},{label: "Land Rover", value: "land-rover"},{label: "Lexus", value: "lexus"},{label: "Mazda", value: "mazda"},{label: "Nissan", value: "nissan"},{label: "Peugeot", value: "peugeot"},{label: "Renault", value: "renault"},{label: "Skoda", value: "skoda"},{label: "Suzuki", value: "suzuki"},{label: "Toyota", value: "toyota"},{label: "Volkswagen", value: "volkswagen"},{label: "Volvo", value: "volvo"}],
        //     // thirdOptionDropdownOptions2: [{label: "Model Y", value: "modelY"}, {label: "Model 3", value: "model3"}, {label: "Model X", value: "modelX"}]
        //     // width: 350,
        //     minWidth: 311,
        //   },
        //   {
        //     headerName: "Make Details",
        //     children: [
        //       {
        //         colId: "make",
        //         field: "make",
        //         headerName: "Make",
        //         isSearchable: true,
        //         sortable: true,
        //         filter: "agTextColumnFilter",
        //         advanceSearchEnabled: true,
        //         isFilterApplied: false,
        //         // thirdOptionAsDropdown: true,
        //         // toShowDuplicateColumnInAdvanceSearch: true,
        //         // thirdOptionDropdownOptions: [
        //         //   { label: "Tesla", value: "tesla" },
        //         //   { label: "Ford", value: "ford" },
        //         //   { label: "Toyota", value: "toyota" },
        //         //   { label: "Honda", value: "honda" },
        //         //   { label: "Hyundai", value: "hyundai" },
        //         //   { label: "Kia", value: "kia" },
        //         //   { label: "Volkswagen", value: "volkswagen" },
        //         //   { label: "Mercedes-Benz", value: "mercedes-benz" },
        //         //   { label: "BMW", value: "bmw" },
        //         //   { label: "Audi", value: "audi" },
        //         //   { label: "Volvo", value: "volvo" },
        //         //   { label: "Jeep", value: "jeep" },
        //         //   { label: "Land Rover", value: "land-rover" },
        //         //   { label: "Lexus", value: "lexus" },
        //         //   { label: "Mazda", value: "mazda" },
        //         //   { label: "Nissan", value: "nissan" },
        //         //   { label: "Peugeot", value: "peugeot" },
        //         //   { label: "Renault", value: "renault" },
        //         //   { label: "Skoda", value: "skoda" },
        //         //   { label: "Suzuki", value: "suzuki" },
        //         //   { label: "Toyota", value: "toyota" },
        //         //   { label: "Volkswagen", value: "volkswagen" },
        //         //   { label: "Volvo", value: "volvo" },
        //         // ],
        //       },
        //       {
        //         field: "scenario",
        //         colId: "scenario",
        //         headerName: "Scenario 1",
        //         // cellRenderer: EditDiscount,
        //         // cellRendererParams: {
        //         //   onUpdate: handleSimulationTableUpdate
        //         // },
        //         hide: false,
        //         advanceSearchEnabled: true,
        //         filter: 'agTextColumnFilter',
        //         isSearchable: true,
        //         thirdOptionAsDropdown: true,
        //         toShowDuplicateColumnInAdvanceSearch: true,
        //         columnFieldsInAdvanceSearch: ["Makeqwe", "Makewejh"],
        //         thirdOptionDropdownOptions1: [{label: "Tesla", value: "tesla"}, {label: "Ford", value: "ford"}, {label: "Toyota", value: "toyota"}, {label: "Honda", value: "honda"},{label: "Hyundai", value: "hyundai"},{label: "Kia", value: "kia"},{label: "Volkswagen", value: "volkswagen"},{label: "Mercedes-Benz", value: "mercedes-benz"},{label: "BMW", value: "bmw"},{label: "Audi", value: "audi"},{label: "Volvo", value: "volvo"},{label: "Jeep", value: "jeep"},{label: "Land Rover", value: "land-rover"},{label: "Lexus", value: "lexus"},{label: "Mazda", value: "mazda"},{label: "Nissan", value: "nissan"},{label: "Peugeot", value: "peugeot"},{label: "Renault", value: "renault"},{label: "Skoda", value: "skoda"},{label: "Suzuki", value: "suzuki"},{label: "Toyota", value: "toyota"},{label: "Volkswagen", value: "volkswagen"},{label: "Volvo", value: "volvo"}],
        //         // thirdOptionDropdownOptions2: [{label: "Model Y", value: "modelY"}, {label: "Model 3", value: "model3"}, {label: "Model X", value: "modelX"}]
        //       },
        //       {
        //         colId: "date",
        //         field: "date",
        //         headerName: "Date",
        //         isSearchable: true,
        //         // filter: "agTextColumnFilter",
        //         // filterType: "date",
        //         filter: "agDateColumnFilter",
        //         filterParams: {
        //           comparator: (filterLocalDateAtMidnight, cellValue) => {
        //             // function as a validator for the date range
        //             const dateAsString = moment(cellValue).format("DD/MM/YYYY");
        //             if (dateAsString == null) return -1;
        //             // Simple string comparison for debugging
        //             if (cellValue === "2021-01-01") {
        //               console.log("Found match!");
        //               return 0;
        //             }
        //             const dateParts = dateAsString.split("/");
        //             const cellDate = new Date(
        //               Number(dateParts[2]),
        //               Number(dateParts[1]) - 1,
        //               Number(dateParts[0])
        //             );
        //             if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        //               return 0;
        //             }
        //             if (cellDate < filterLocalDateAtMidnight) {
        //               return -1;
        //             }
        //             if (cellDate > filterLocalDateAtMidnight) {
        //               return 1;
        //             }
        //             return 0;
        //           }
        //         },
        //         // cellRenderer: InputRenderer,
        //         // cellClass: ["cell-renderer"],
        //         resizable: true,
        //         minWidth: 50,
        //       },
        //       {
        //         colId: "make1",
        //         field: "make1",
        //         headerName: "Make 1",
        //         cellRenderer: InputRenderer,
        //         cellClass: ["cell-renderer"],
        //         resizable: true,
        //         minWidth: 50,
        //       },
        //       {
        //         colId: "make2",
        //         field: "make2",
        //         headerName: "Make 2",
        //         cellRenderer: BadgeRenderer,
        //         cellClass: ["cell-renderer"],
        //     advanceSearchEnabled: true
        //   },
        //     ],
        //   },
        //   {
        //     headerName: "Make Details1",
        //     children: [
        //       { colId: "make3", field: "make3", headerName: "Make 3" },
        //       {
        //         colId: "make4",
        //         field: "make4",
        //         headerName: "Make 4",
        //         cellRenderer: TooltipRenderer,
        //         cellClass: ["cell-renderer"],
        //       },
        //     ],
        //   },
        //   {
        //     headerName: "Make Details1",
        //     children: [
        //       {
        //         colId: "make32",
        //         field: "make3",
        //         headerName: "Make 3",
        //         cellRenderer: DateRenderer,
        //         cellClass: ["cell-renderer"],
        //         type: "dateRangePicker",
        //         minWidth: 254,
        //         resizable: false,
        //       },
        //       { colId: "make4", field: "make4", headerName: "Make 4" },
        //     ],
        //   },
        //   {
        //     colId: "model",
        //     field: "model",
        //     cellRenderer: (params) => {
        //       return (
        //         <Button
        //           label="Button"
        //           variant="url"
        //           onClick={() => setOpenTable(!openTable)}
        //         >
        //           {params.value}
        //         </Button>
        //       );
        //     },
        //     cellClass: ["cell-renderer"],
        //   },
        //   {
        //     colId: "price",
        //     field: "price",
        //     type: "number",
        //     cellRenderer: SelectRenderer,
        //     cellClass: ["cell-renderer"],
        //     resizable: true,
        //   },
        //   { colId: "electric", field: "electric" },
        //   { colId: "electric0", field: "electric0" },
        //   { colId: "electric1", field: "electric1" },
        //   { colId: "electric2", field: "electric2" },
        //   { colId: "electric3", field: "electric3" },
        //   { colId: "electric4", field: "electric4" },
        //   { colId: "electric5", field: "electric5" },
        // ]}
    //     applySort={() => {
    //       console.log("applySort");
    //     }}
    //     // handleInlineSearch={(params ) => {
    //     //   console.log("handleInlineSearch", params);
    //     // }}
    //     onNumberFormatChange={() => {}}
    //     gridOptions={{
    //       suppressRowClickSelection: true,
    //     }}
    //     rowData={rowData}
    //     // showDownloadButton={true}
    //     rowHeight="default"
    //     nestedTable={openTable}
    //     handleCloseButtonClick={() => {
    //       console.log("clicked");
    //       setOpenTable(false);
    //     }}
    //     suppressCellFocus={true}
    //     nestedTableComponent={nestedTableComponent}
    //     // tableHeader="Default Table"
    //     // topLeftOptions={
    //     //   <>
    //     //     <Button label="Button">Top Left</Button>
    //     //   </>
    //     // }
    //     // topRightOptions={
    //     //   <>
    //     //     <Button label="Button">Top Right</Button>
    //     //     <Button label="Button">Top Right</Button>
    //     //     <Button label="Button">Top Right</Button>
    //     //     <Button label="Button">Top Right</Button>
    //     //     <Button label="Button">Top Right</Button>
    //     //     <Button label="Button">Top Right</Button>
    //     //     {/* <Button label="Button">Top Right</Button>
    //     //     <Button label="Button" onClick={() => console.log("clicked")}>
    //     //       Top Right
    //     //     </Button> */}
    //     //   </>
    //     // }
    //     // sortModel={sortModel}
    //     // onFilterChanged={(params) => { 
    //     //   console.log("rest", params);
    //     //   // setRowData(
    //     //   //   [
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA ",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USAqwerftgyhjfgasdfghjsdfghjk,ldfghnjk",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Tesla",
    //     //   //       make1: "USA",
    //     //   //       make2: "Electric",
    //     //   //       make3: "Tesla",
    //     //   //       make4: "USA",
    //     //   //       model: "Model Y",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     {
    //     //   //       make: "Ford",
    //     //   //       make1: "USA",
    //     //   //       make2: "Gasoline",
    //     //   //       make3: "Ford",
    //     //   //       make4: "USA",
    //     //   //       model: "F-Series",
    //     //   //       price: [
    //     //   //         { label: "1", value: 1 },
    //     //   //         { label: "2", value: 2 },
    //     //   //         { label: "3", value: 3 },
    //     //   //         { label: "4", value: 4 },
    //     //   //         { label: "5", value: 5 },
    //     //   //         { label: "6", value: 6 },
    //     //   //         { label: "7", value: 7 },
    //     //   //         { label: "8", value: 8 },
    //     //   //         { label: "9", value: 9 },
    //     //   //         { label: "10", value: 10 },
    //     //   //       ],
    //     //   //       electric: true,
    //     //   //       electric0: true,
    //     //   //       electric1: "kunal",
    //     //   //       electric2: "Patel",
    //     //   //       electric3: "Bangalore",
    //     //   //       electric4: "Karnataka",
    //     //   //       electric5: "India",
    //     //   //     },
    //     //   //     // {
    //     //   //     //   make: "Toyota",
    //     //   //     //   make1: "Japan",
    //     //   //     //   make2: "Hybrid",
    //     //   //     //   make3: "Toyota",
    //     //   //     //   make4: "Japan",
    //     //   //     //   model: "Corolla",
    //     //   //     //   price: [{label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}, {label: "4", value: 4}, {label: "5", value: 5}, {label: "6", value: 6}, {label: "7", value: 7}, {label: "8", value: 8}, {label: "9", value: 9}, {label: "10", value: 10}],
    //     //   //     //   electric: true,
    //     //   //     //   electric0: true,
    //     //   //     //   electric1: "kunal",
    //     //   //     //   electric2: "Patel",
    //     //   //     //   electric3: "Bangalore",
    //     //   //     //   electric4: "Karnataka",
    //     //   //     //   electric5: "India",
    //     //   //     // },
    //     //   //   ]
    //     //   // )
    //     // }}
    //     // showContentualFilter={true}
    //     // showContentualFilterBadge={true}
    //     // onContentualFilterClick={() => {}}
    //     // contentualFilterProps={contentualFilterProps}
    //     // contentualFilterComponent={<FiltersStrip {...contentualFilterProps} />}
    //     cardContainer={false}
    //     hideTableSetting = {true}
    //     hideMarginBottom = {true}
    //   />
      // <Table
      //     tableHeader={`scenario simulator`}
      //     // ref={simulationTableRef}
      //     // onGridReady={onGridReady}
      //     suppressMenuHide
      //     rowModelType="serverSide"
      //     serverSideStoreType="partial"
      //     cacheBlockSize={100}
      //     // customHeaderComponent={customHeaderComponent}
      //     columnDefs={[
      //       {
      //         colId: "checkbox",
      //         field: "",
      //         checkboxSelection: true,
      //         headerCheckboxSelection: true,
      //         suppressMenu: true,
      //         filter: false,
      //         sortable: false,
      //         pinned: "left",
      //         order: 1,
      //       },
      //       {
      //         field: "scenario_1",
      //         colId: "scenario_1",
      //         headerName: "Scenario 1",
      //         cellRenderer: CustomCellRenderer,
      //         headerComponent: headerComponent,
      //         // cellRendererParams: {
      //         //   onUpdate: handleSimulationTableUpdate
      //         // },
      //         // valueGetter: (params) => {
      //         //   // Return the actual data value for sorting
      //         //   return params.data[params.column.colId];
      //         // },
      //         // comparator: (valueA, valueB, nodeA, nodeB) => {
      //         //   console.log("Comparator called!", { valueA, valueB, nodeA, nodeB });
                
      //         //   // Access the full row data
      //         //   const dataA = nodeA.data;
      //         //   const dataB = nodeB.data;
                
      //         //   // Sort based on whatever field you have available
      //         //   // For example, if you have an ID or some other field to sort by:
      //         //   return dataA.id - dataB.id;
                
      //         //   // Or if you have a display field:
      //         //   // return (dataA.displayField || "").localeCompare(dataB.displayField || "");
      //         // }
      //         hide: false,
      //         advanceSearchEnabled: true,
      //         filter: 'agTextColumnFilter',
      //         isSearchable: true,
      //         sortable: true,
      //         thirdOptionAsDropdown: true,
      //         // toShowDuplicateColumnInAdvanceSearch: true,
      //         columnFieldsInAdvanceSearch: ["Scenario 1 offer type", "Scenario 1 offer value"],
      //         thirdOptionDropdownOptions1: [{label: "Tesla", value: "tesla"}, {label: "Ford", value: "ford"}, {label: "Toyota", value: "toyota"}, {label: "Honda", value: "honda"},{label: "Hyundai", value: "hyundai"},{label: "Kia", value: "kia"},{label: "Volkswagen", value: "volkswagen"},{label: "Mercedes-Benz", value: "mercedes-benz"},{label: "BMW", value: "bmw"},{label: "Audi", value: "audi"},{label: "Volvo", value: "volvo"},{label: "Jeep", value: "jeep"},{label: "Land Rover", value: "land-rover"},{label: "Lexus", value: "lexus"},{label: "Mazda", value: "mazda"},{label: "Nissan", value: "nissan"},{label: "Peugeot", value: "peugeot"},{label: "Renault", value: "renault"},{label: "Skoda", value: "skoda"},{label: "Suzuki", value: "suzuki"},{label: "Toyota", value: "toyota"},{label: "Volkswagen", value: "volkswagen"},{label: "Volvo", value: "volvo"}],
      //         // thirdOptionDropdownOptions2: [{label: "Model Y", value: "modelY"}, {label: "Model 3", value: "model3"}, {label: "Model X", value: "modelX"}]
      //         // width: 350,
      //         minWidth: 311,
      //       },
      //       {
      //         headerName: "Make Details",
      //         children: [
      //           {
      //             colId: "make",
      //             field: "make",
      //             headerName: "Make",
      //             isSearchable: true,
      //             sortable: true,
      //             filter: "agTextColumnFilter",
      //             advanceSearchEnabled: true,
      //             isFilterApplied: false,
      //             // thirdOptionAsDropdown: true,
      //             // toShowDuplicateColumnInAdvanceSearch: true,
      //             // thirdOptionDropdownOptions: [
      //             //   { label: "Tesla", value: "tesla" },
      //             //   { label: "Ford", value: "ford" },
      //             //   { label: "Toyota", value: "toyota" },
      //             //   { label: "Honda", value: "honda" },
      //             //   { label: "Hyundai", value: "hyundai" },
      //             //   { label: "Kia", value: "kia" },
      //             //   { label: "Volkswagen", value: "volkswagen" },
      //             //   { label: "Mercedes-Benz", value: "mercedes-benz" },
      //             //   { label: "BMW", value: "bmw" },
      //             //   { label: "Audi", value: "audi" },
      //             //   { label: "Volvo", value: "volvo" },
      //             //   { label: "Jeep", value: "jeep" },
      //             //   { label: "Land Rover", value: "land-rover" },
      //             //   { label: "Lexus", value: "lexus" },
      //             //   { label: "Mazda", value: "mazda" },
      //             //   { label: "Nissan", value: "nissan" },
      //             //   { label: "Peugeot", value: "peugeot" },
      //             //   { label: "Renault", value: "renault" },
      //             //   { label: "Skoda", value: "skoda" },
      //             //   { label: "Suzuki", value: "suzuki" },
      //             //   { label: "Toyota", value: "toyota" },
      //             //   { label: "Volkswagen", value: "volkswagen" },
      //             //   { label: "Volvo", value: "volvo" },
      //             // ],
      //           },
      //           {
      //             field: "scenario",
      //             colId: "scenario",
      //             headerName: "Scenario 1",
      //             // cellRenderer: EditDiscount,
      //             // cellRendererParams: {
      //             //   onUpdate: handleSimulationTableUpdate
      //             // },
      //             hide: false,
      //             advanceSearchEnabled: true,
      //             filter: 'agTextColumnFilter',
      //             isSearchable: true,
      //             thirdOptionAsDropdown: true,
      //             toShowDuplicateColumnInAdvanceSearch: true,
      //             columnFieldsInAdvanceSearch: ["Makeqwe", "Makewejh"],
      //             thirdOptionDropdownOptions1: [{label: "Tesla", value: "tesla"}, {label: "Ford", value: "ford"}, {label: "Toyota", value: "toyota"}, {label: "Honda", value: "honda"},{label: "Hyundai", value: "hyundai"},{label: "Kia", value: "kia"},{label: "Volkswagen", value: "volkswagen"},{label: "Mercedes-Benz", value: "mercedes-benz"},{label: "BMW", value: "bmw"},{label: "Audi", value: "audi"},{label: "Volvo", value: "volvo"},{label: "Jeep", value: "jeep"},{label: "Land Rover", value: "land-rover"},{label: "Lexus", value: "lexus"},{label: "Mazda", value: "mazda"},{label: "Nissan", value: "nissan"},{label: "Peugeot", value: "peugeot"},{label: "Renault", value: "renault"},{label: "Skoda", value: "skoda"},{label: "Suzuki", value: "suzuki"},{label: "Toyota", value: "toyota"},{label: "Volkswagen", value: "volkswagen"},{label: "Volvo", value: "volvo"}],
      //             // thirdOptionDropdownOptions2: [{label: "Model Y", value: "modelY"}, {label: "Model 3", value: "model3"}, {label: "Model X", value: "modelX"}]
      //           },
      //           {
      //             colId: "date",
      //             field: "date",
      //             headerName: "Date",
      //             isSearchable: true,
      //             // filter: "agTextColumnFilter",
      //             // filterType: "date",
      //             filter: "agDateColumnFilter",
      //             filterParams: {
      //               comparator: (filterLocalDateAtMidnight, cellValue) => {
      //                 // function as a validator for the date range
      //                 const dateAsString = moment(cellValue).format("DD/MM/YYYY");
      //                 if (dateAsString == null) return -1;
      //                 // Simple string comparison for debugging
      //                 if (cellValue === "2021-01-01") {
      //                   console.log("Found match!");
      //                   return 0;
      //                 }
      //                 const dateParts = dateAsString.split("/");
      //                 const cellDate = new Date(
      //                   Number(dateParts[2]),
      //                   Number(dateParts[1]) - 1,
      //                   Number(dateParts[0])
      //                 );
      //                 if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      //                   return 0;
      //                 }
      //                 if (cellDate < filterLocalDateAtMidnight) {
      //                   return -1;
      //                 }
      //                 if (cellDate > filterLocalDateAtMidnight) {
      //                   return 1;
      //                 }
      //                 return 0;
      //               }
      //             },
      //             // cellRenderer: InputRenderer,
      //             // cellClass: ["cell-renderer"],
      //             resizable: true,
      //             minWidth: 50,
      //           },
      //           {
      //             colId: "make1",
      //             field: "make1",
      //             headerName: "Make 1",
      //             cellRenderer: InputRenderer,
      //             cellClass: ["cell-renderer"],
      //             resizable: true,
      //             minWidth: 50,
      //           },
      //           {
      //             colId: "make2",
      //             field: "make2",
      //             headerName: "Make 2",
      //             cellRenderer: BadgeRenderer,
      //             cellClass: ["cell-renderer"],
      //         advanceSearchEnabled: true
      //       },
      //         ],
      //       },
      //       {
      //         headerName: "Make Details1",
      //         children: [
      //           { colId: "make3", field: "make3", headerName: "Make 3" },
      //           {
      //             colId: "make4",
      //             field: "make4",
      //             headerName: "Make 4",
      //             cellRenderer: TooltipRenderer,
      //             cellClass: ["cell-renderer"],
      //           },
      //         ],
      //       },
      //       {
      //         headerName: "Make Details1",
      //         children: [
      //           {
      //             colId: "make32",
      //             field: "make3",
      //             headerName: "Make 3",
      //             cellRenderer: DateRenderer,
      //             cellClass: ["cell-renderer"],
      //             type: "dateRangePicker",
      //             minWidth: 254,
      //             resizable: false,
      //           },
      //           { colId: "make4", field: "make4", headerName: "Make 4" },
      //         ],
      //       },
      //       {
      //         colId: "model",
      //         field: "model",
      //         cellRenderer: (params) => {
      //           return (
      //             <Button
      //               label="Button"
      //               variant="url"
      //               onClick={() => setOpenTable(!openTable)}
      //             >
      //               {params.value}
      //             </Button>
      //           );
      //         },
      //         cellClass: ["cell-renderer"],
      //       },
      //       {
      //         colId: "price",
      //         field: "price",
      //         type: "number",
      //         cellRenderer: SelectRenderer,
      //         cellClass: ["cell-renderer"],
      //         resizable: true,
      //       },
      //       { colId: "electric", field: "electric" },
      //       { colId: "electric0", field: "electric0" },
      //       { colId: "electric1", field: "electric1" },
      //       { colId: "electric2", field: "electric2" },
      //       { colId: "electric3", field: "electric3" },
      //       { colId: "electric4", field: "electric4" },
      //       { colId: "electric5", field: "electric5" },
      //     ]}
      //     // onCellValueChanged={updateSimulationData}
      //     // onSelectionChanged={onRowSelection}
      //     rowSelection="multiple"
      //     getRowId={(params) => {
      //         return params.data?.row_id;
      //     }}
      //     applySort={(...params) => {
      //         console.log("applySort", params);
      //     }}
      //     onSearchApplyClick={(params) => {
      //         handleAdvanceSearch(params);
      //     }}
          
      //     />
    // <Table
    //     columnDefs={[
    //       {
    //         field: "athlete",
    //       },
    //       {
    //         field: "age",
    //       },
    //       {
    //         field: "country",
    //       },
    //       {
    //         field: "year",
    //       },
    //       {
    //         field: "date",
    //       },
    //       {
    //         field: "sport",
    //       },
    //       {
    //         field: "gold",
    //       },
    //       {
    //         field: "silver",
    //       },
    //       {
    //         field: "bronze",
    //       },
    //       {
    //         field: "total",
    //       },
    //     ]}
    //     // defaultPageSize={5}
    //     // onNumberFormatChange={() => {}}
    //     pagination={true}
    //     bottomLeftOptions={
    //       <>
    //         <Button label="Button">Bottom Left Side</Button>
    //       </>
    //     }
    //     rowData={[
    //       {
    //         age: 23,
    //         athlete: "Michael Phelps",
    //         bronze: 0,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 8,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 8,
    //         year: 2008,
    //       },
    //       {
    //         age: 19,
    //         athlete: "Michael Phelps",
    //         bronze: 2,
    //         country: "United States",
    //         date: "29/08/2004",
    //         gold: 6,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 8,
    //         year: 2004,
    //       },
    //       {
    //         age: 27,
    //         athlete: "Michael Phelps",
    //         bronze: 0,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 4,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 6,
    //         year: 2012,
    //       },
    //       {
    //         age: 25,
    //         athlete: "Natalie Coughlin",
    //         bronze: 3,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 6,
    //         year: 2008,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Aleksey Nemov",
    //         bronze: 3,
    //         country: "Russia",
    //         date: "01/10/2000",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Gymnastics",
    //         total: 6,
    //         year: 2000,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Alicia Coutts",
    //         bronze: 1,
    //         country: "Australia",
    //         date: "12/08/2012",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 17,
    //         athlete: "Missy Franklin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 4,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 27,
    //         athlete: "Ryan Lochte",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 2,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 22,
    //         athlete: "Allison Schmitt",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 3,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 21,
    //         athlete: "Natalie Coughlin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "29/08/2004",
    //         gold: 2,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2004,
    //       },
    //       {
    //         age: 17,
    //         athlete: "Ian Thorpe",
    //         bronze: 0,
    //         country: "Australia",
    //         date: "01/10/2000",
    //         gold: 3,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2000,
    //       },
    //       {
    //         age: 33,
    //         athlete: "Dara Torres",
    //         bronze: 3,
    //         country: "United States",
    //         date: "01/10/2000",
    //         gold: 2,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2000,
    //       },
    //       {
    //         age: 26,
    //         athlete: "Cindy Klassen",
    //         bronze: 2,
    //         country: "Canada",
    //         date: "26/02/2006",
    //         gold: 1,
    //         silver: 2,
    //         sport: "Speed Skating",
    //         total: 5,
    //         year: 2006,
    //       },
    //       {
    //         age: 18,
    //         athlete: "Nastia Liukin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Gymnastics",
    //         total: 5,
    //         year: 2008,
    //       },
    //       {
    //         age: 29,
    //         athlete: "Marit Bjørgen",
    //         bronze: 1,
    //         country: "Norway",
    //         date: "28/02/2010",
    //         gold: 3,
    //         silver: 1,
    //         sport: "Cross Country Skiing",
    //         total: 5,
    //         year: 2010,
    //       },
    //       {
    //         age: 20,
    //         athlete: "Sun Yang",
    //         bronze: 1,
    //         country: "China",
    //         date: "12/08/2012",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2012,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Kirsty Coventry",
    //         bronze: 0,
    //         country: "Zimbabwe",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 23,
    //         athlete: "Libby Lenton-Trickett",
    //         bronze: 1,
    //         country: "Australia",
    //         date: "24/08/2008",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Ryan Lochte",
    //         bronze: 2,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 2,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 30,
    //         athlete: "Inge de Bruijn",
    //         bronze: 2,
    //         country: "Netherlands",
    //         date: "29/08/2004",
    //         gold: 1,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2004,
    //       },
    //     ]}
    //     tableHeader="Paginated Table"
    //   />
    // <>
      <Table
        columnDefs={[
          {
            field: "athlete",
            cellRenderer: SelectRenderer,
            cellClass: ["cell-renderer"],
            minWidth: 250,
          },
          {
            field: "age",
          },
          {
            field: "country",
            rowGroup: true,
          },
          {
            field: "year",
            rowGroup: true,
          },
          {
            field: "date",
          },
          {
            field: "sport",
          },
          {
            field: "gold",
          },
          {
            field: "silver",
          },
          {
            field: "bronze",
          },
          {
            field: "total",
          },
        ]}
        onNumberFormatChange={() => {}}
        rowData={[
          {
            age: 23,
            athlete: "Michael Phelps",
            bronze: 0,
            country: "United States",
            date: "24/08/2008",
            gold: 8,
            silver: 0,
            sport: "Swimming",
            total: 8,
            year: 2008,
          },
          {
            age: 19,
            athlete: "Michael Phelps",
            bronze: 2,
            country: "United States",
            date: "29/08/2004",
            gold: 6,
            silver: 0,
            sport: "Swimming",
            total: 8,
            year: 2004,
          },
          {
            age: 27,
            athlete: "Michael Phelps",
            bronze: 0,
            country: "United States",
            date: "12/08/2012",
            gold: 4,
            silver: 2,
            sport: "Swimming",
            total: 6,
            year: 2012,
          },
          {
            age: 25,
            athlete: "Natalie Coughlin",
            bronze: 3,
            country: "United States",
            date: "24/08/2008",
            gold: 1,
            silver: 2,
            sport: "Swimming",
            total: 6,
            year: 2008,
          },
          {
            age: 24,
            athlete: "Aleksey Nemov",
            bronze: 3,
            country: "Russia",
            date: "01/10/2000",
            gold: 2,
            silver: 1,
            sport: "Gymnastics",
            total: 6,
            year: 2000,
          },
          {
            age: 24,
            athlete: "Alicia Coutts",
            bronze: 1,
            country: "Australia",
            date: "12/08/2012",
            gold: 1,
            silver: 3,
            sport: "Swimming",
            total: 5,
            year: 2012,
          },
          {
            age: 17,
            athlete: "Missy Franklin",
            bronze: 1,
            country: "United States",
            date: "12/08/2012",
            gold: 4,
            silver: 0,
            sport: "Swimming",
            total: 5,
            year: 2012,
          },
          {
            age: 27,
            athlete: "Ryan Lochte",
            bronze: 1,
            country: "United States",
            date: "12/08/2012",
            gold: 2,
            silver: 2,
            sport: "Swimming",
            total: 5,
            year: 2012,
          },
          {
            age: 22,
            athlete: "Allison Schmitt",
            bronze: 1,
            country: "United States",
            date: "12/08/2012",
            gold: 3,
            silver: 1,
            sport: "Swimming",
            total: 5,
            year: 2012,
          },
          {
            age: 21,
            athlete: "Natalie Coughlin",
            bronze: 1,
            country: "United States",
            date: "29/08/2004",
            gold: 2,
            silver: 2,
            sport: "Swimming",
            total: 5,
            year: 2004,
          },
          {
            age: 17,
            athlete: "Ian Thorpe",
            bronze: 0,
            country: "Australia",
            date: "01/10/2000",
            gold: 3,
            silver: 2,
            sport: "Swimming",
            total: 5,
            year: 2000,
          },
          {
            age: 33,
            athlete: "Dara Torres",
            bronze: 3,
            country: "United States",
            date: "01/10/2000",
            gold: 2,
            silver: 0,
            sport: "Swimming",
            total: 5,
            year: 2000,
          },
          {
            age: 26,
            athlete: "Cindy Klassen",
            bronze: 2,
            country: "Canada",
            date: "26/02/2006",
            gold: 1,
            silver: 2,
            sport: "Speed Skating",
            total: 5,
            year: 2006,
          },
          {
            age: 18,
            athlete: "Nastia Liukin",
            bronze: 1,
            country: "United States",
            date: "24/08/2008",
            gold: 1,
            silver: 3,
            sport: "Gymnastics",
            total: 5,
            year: 2008,
          },
          {
            age: 29,
            athlete: "Marit Bjørgen",
            bronze: 1,
            country: "Norway",
            date: "28/02/2010",
            gold: 3,
            silver: 1,
            sport: "Cross Country Skiing",
            total: 5,
            year: 2010,
          },
          {
            age: 20,
            athlete: "Sun Yang",
            bronze: 1,
            country: "China",
            date: "12/08/2012",
            gold: 2,
            silver: 1,
            sport: "Swimming",
            total: 4,
            year: 2012,
          },
          {
            age: 24,
            athlete: "Kirsty Coventry",
            bronze: 0,
            country: "Zimbabwe",
            date: "24/08/2008",
            gold: 1,
            silver: 3,
            sport: "Swimming",
            total: 4,
            year: 2008,
          },
          {
            age: 23,
            athlete: "Libby Lenton-Trickett",
            bronze: 1,
            country: "Australia",
            date: "24/08/2008",
            gold: 2,
            silver: 1,
            sport: "Swimming",
            total: 4,
            year: 2008,
          },
          {
            age: 24,
            athlete: "Ryan Lochte",
            bronze: 2,
            country: "United States",
            date: "24/08/2008",
            gold: 2,
            silver: 0,
            sport: "Swimming",
            total: 4,
            year: 2008,
          },
          {
            age: 30,
            athlete: "Inge de Bruijn",
            bronze: 2,
            country: "Netherlands",
            date: "29/08/2004",
            gold: 1,
            silver: 1,
            sport: "Swimming",
            total: 4,
            year: 2004,
          },
        ]}
        tableHeader="Grouped Rows"
      
      />
    //   <Table
    //     columnDefs={[
    //       {
    //         field: "athlete",
    //       },
    //       {
    //         field: "age",
    //       },
    //       {
    //         field: "country",
    //       },
    //       {
    //         field: "year",
    //       },
    //       {
    //         field: "date",
    //       },
    //       {
    //         field: "sport",
    //       },
    //       {
    //         field: "gold",
    //       },
    //       {
    //         field: "silver",
    //       },
    //       {
    //         field: "bronze",
    //       },
    //       {
    //         field: "total",
    //       },
    //     ]}
    //     defaultPageSize={5}
    //     onNumberFormatChange={() => {}}
    //     pagination
    //     rowData={[
    //       {
    //         age: 23,
    //         athlete: "Michael Phelps",
    //         bronze: 0,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 8,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 8,
    //         year: 2008,
    //       },
    //       {
    //         age: 19,
    //         athlete: "Michael Phelps",
    //         bronze: 2,
    //         country: "United States",
    //         date: "29/08/2004",
    //         gold: 6,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 8,
    //         year: 2004,
    //       },
    //       {
    //         age: 27,
    //         athlete: "Michael Phelps",
    //         bronze: 0,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 4,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 6,
    //         year: 2012,
    //       },
    //       {
    //         age: 25,
    //         athlete: "Natalie Coughlin",
    //         bronze: 3,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 6,
    //         year: 2008,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Aleksey Nemov",
    //         bronze: 3,
    //         country: "Russia",
    //         date: "01/10/2000",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Gymnastics",
    //         total: 6,
    //         year: 2000,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Alicia Coutts",
    //         bronze: 1,
    //         country: "Australia",
    //         date: "12/08/2012",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 17,
    //         athlete: "Missy Franklin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 4,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 27,
    //         athlete: "Ryan Lochte",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 2,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 22,
    //         athlete: "Allison Schmitt",
    //         bronze: 1,
    //         country: "United States",
    //         date: "12/08/2012",
    //         gold: 3,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2012,
    //       },
    //       {
    //         age: 21,
    //         athlete: "Natalie Coughlin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "29/08/2004",
    //         gold: 2,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2004,
    //       },
    //       {
    //         age: 17,
    //         athlete: "Ian Thorpe",
    //         bronze: 0,
    //         country: "Australia",
    //         date: "01/10/2000",
    //         gold: 3,
    //         silver: 2,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2000,
    //       },
    //       {
    //         age: 33,
    //         athlete: "Dara Torres",
    //         bronze: 3,
    //         country: "United States",
    //         date: "01/10/2000",
    //         gold: 2,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 5,
    //         year: 2000,
    //       },
    //       {
    //         age: 26,
    //         athlete: "Cindy Klassen",
    //         bronze: 2,
    //         country: "Canada",
    //         date: "26/02/2006",
    //         gold: 1,
    //         silver: 2,
    //         sport: "Speed Skating",
    //         total: 5,
    //         year: 2006,
    //       },
    //       {
    //         age: 18,
    //         athlete: "Nastia Liukin",
    //         bronze: 1,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Gymnastics",
    //         total: 5,
    //         year: 2008,
    //       },
    //       {
    //         age: 29,
    //         athlete: "Marit Bjørgen",
    //         bronze: 1,
    //         country: "Norway",
    //         date: "28/02/2010",
    //         gold: 3,
    //         silver: 1,
    //         sport: "Cross Country Skiing",
    //         total: 5,
    //         year: 2010,
    //       },
    //       {
    //         age: 20,
    //         athlete: "Sun Yang",
    //         bronze: 1,
    //         country: "China",
    //         date: "12/08/2012",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2012,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Kirsty Coventry",
    //         bronze: 0,
    //         country: "Zimbabwe",
    //         date: "24/08/2008",
    //         gold: 1,
    //         silver: 3,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 23,
    //         athlete: "Libby Lenton-Trickett",
    //         bronze: 1,
    //         country: "Australia",
    //         date: "24/08/2008",
    //         gold: 2,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 24,
    //         athlete: "Ryan Lochte",
    //         bronze: 2,
    //         country: "United States",
    //         date: "24/08/2008",
    //         gold: 2,
    //         silver: 0,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2008,
    //       },
    //       {
    //         age: 30,
    //         athlete: "Inge de Bruijn",
    //         bronze: 2,
    //         country: "Netherlands",
    //         date: "29/08/2004",
    //         gold: 1,
    //         silver: 1,
    //         sport: "Swimming",
    //         total: 4,
    //         year: 2004,
    //       },
    //     ]}
    //     tableHeader="Paginated Table"
    //   />
    //   <Table
    //     className="master_table_expandable"
    //     columnDefs={[
    //       {
    //         cellRenderer: "agGroupCellRenderer",
    //         field: "name",
    //       },
    //       {
    //         field: "account",
    //         type: "number",
    //       },
    //       {
    //         field: "calls",
    //       },
    //       {
    //         field: "minutes",
    //         valueFormatter: "x.toLocaleString() + 'm'",
    //       },
    //     ]}
    //     detailCellRendererParams={{
    //       detailGridOptions: {
    //         columnDefs: [
    //           {
    //             field: "callId",
    //           },
    //           {
    //             field: "direction",
    //           },
    //           {
    //             field: "number",
    //             minWidth: 150,
    //           },
    //           {
    //             field: "duration",
    //             valueFormatter: "x.toLocaleString() + 's'",
    //           },
    //           {
    //             field: "switchCode",
    //             minWidth: 150,
    //           },
    //         ],
    //         defaultColDef: {
    //           flex: 1,
    //         },
    //       },
    //       getDetailRowData: (params) => {
    //         params.successCallback(params.data.callRecords);
    //       },
    //     }}
    //     masterDetail
    //     onNumberFormatChange={() => {}}
    //     rowData={[
    //       {
    //         account: 177000,
    //         callRecords: [
    //           {
    //             callId: 555,
    //             direction: "Out",
    //             duration: 72,
    //             name: "susan",
    //             number: "(00) 88542069",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 556,
    //             direction: "In",
    //             duration: 61,
    //             name: "susan",
    //             number: "(01) 7432576",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 557,
    //             direction: "In",
    //             duration: 90,
    //             name: "susan",
    //             number: "(09) 76105491",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 558,
    //             direction: "In",
    //             duration: 83,
    //             name: "susan",
    //             number: "(03) 72020613",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 559,
    //             direction: "In",
    //             duration: 94,
    //             name: "susan",
    //             number: "(04) 98295709",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 560,
    //             direction: "Out",
    //             duration: 102,
    //             name: "susan",
    //             number: "(07) 96771309",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 561,
    //             direction: "Out",
    //             duration: 22,
    //             name: "susan",
    //             number: "(08) 38428058",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 562,
    //             direction: "Out",
    //             duration: 88,
    //             name: "susan",
    //             number: "(02) 70137438",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 563,
    //             direction: "In",
    //             duration: 77,
    //             name: "susan",
    //             number: "(06) 48756154",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 564,
    //             direction: "Out",
    //             duration: 85,
    //             name: "susan",
    //             number: "(00) 11319412",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 565,
    //             direction: "In",
    //             duration: 82,
    //             name: "susan",
    //             number: "(02) 37557264",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 566,
    //             direction: "In",
    //             duration: 75,
    //             name: "susan",
    //             number: "(00) 94729563",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 567,
    //             direction: "In",
    //             duration: 46,
    //             name: "susan",
    //             number: "(09) 20489000",
    //             switchCode: "SW0",
    //           },
    //           {
    //             callId: 568,
    //             direction: "In",
    //             duration: 90,
    //             name: "susan",
    //             number: "(04) 90652096",
    //             switchCode: "SW0",
    //           },
    //           {
    //             callId: 569,
    //             direction: "In",
    //             duration: 49,
    //             name: "susan",
    //             number: "(00) 73342113",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 570,
    //             direction: "Out",
    //             duration: 40,
    //             name: "susan",
    //             number: "(01) 79831695",
    //             switchCode: "SW0",
    //           },
    //           {
    //             callId: 571,
    //             direction: "In",
    //             duration: 105,
    //             name: "susan",
    //             number: "(03) 28694433",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 572,
    //             direction: "In",
    //             duration: 64,
    //             name: "susan",
    //             number: "(03) 8705515",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 573,
    //             direction: "In",
    //             duration: 44,
    //             name: "susan",
    //             number: "(01) 180304",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 574,
    //             direction: "In",
    //             duration: 24,
    //             name: "susan",
    //             number: "(05) 33983060",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 575,
    //             direction: "In",
    //             duration: 40,
    //             name: "susan",
    //             number: "(02) 4129807",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 576,
    //             direction: "Out",
    //             duration: 24,
    //             name: "susan",
    //             number: "(01) 89806499",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 577,
    //             direction: "In",
    //             duration: 36,
    //             name: "susan",
    //             number: "(09) 13139104",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 578,
    //             direction: "In",
    //             duration: 46,
    //             name: "susan",
    //             number: "(06) 8486087",
    //             switchCode: "SW6",
    //           },
    //         ],
    //         calls: 24,
    //         minutes: 25.65,
    //         name: "Nora Thomas",
    //       },
    //       {
    //         account: 177001,
    //         callRecords: [
    //           {
    //             callId: 579,
    //             direction: "Out",
    //             duration: 23,
    //             name: "susan",
    //             number: "(02) 47485405",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 580,
    //             direction: "In",
    //             duration: 52,
    //             name: "susan",
    //             number: "(02) 32367069",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 581,
    //             direction: "Out",
    //             duration: 39,
    //             name: "susan",
    //             number: "(07) 13532649",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 582,
    //             direction: "Out",
    //             duration: 51,
    //             name: "susan",
    //             number: "(08) 45645627",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 583,
    //             direction: "In",
    //             duration: 33,
    //             name: "susan",
    //             number: "(07) 40017516",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 584,
    //             direction: "In",
    //             duration: 22,
    //             name: "susan",
    //             number: "(01) 92370908",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 585,
    //             direction: "In",
    //             duration: 68,
    //             name: "susan",
    //             number: "(05) 30156166",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 586,
    //             direction: "In",
    //             duration: 119,
    //             name: "susan",
    //             number: "(01) 52582587",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 587,
    //             direction: "In",
    //             duration: 21,
    //             name: "susan",
    //             number: "(05) 10830657",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 588,
    //             direction: "In",
    //             duration: 109,
    //             name: "susan",
    //             number: "(05) 10815312",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 589,
    //             direction: "Out",
    //             duration: 39,
    //             name: "susan",
    //             number: "(05) 89618828",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 590,
    //             direction: "Out",
    //             duration: 108,
    //             name: "susan",
    //             number: "(09) 15893215",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 591,
    //             direction: "Out",
    //             duration: 33,
    //             name: "susan",
    //             number: "(03) 24536100",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 592,
    //             direction: "Out",
    //             duration: 93,
    //             name: "susan",
    //             number: "(02) 80845157",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 593,
    //             direction: "In",
    //             duration: 114,
    //             name: "susan",
    //             number: "(03) 3221324",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 594,
    //             direction: "Out",
    //             duration: 26,
    //             name: "susan",
    //             number: "(03) 15136907",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 595,
    //             direction: "In",
    //             duration: 109,
    //             name: "susan",
    //             number: "(08) 36133013",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 596,
    //             direction: "In",
    //             duration: 82,
    //             name: "susan",
    //             number: "(09) 25025760",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 597,
    //             direction: "Out",
    //             duration: 100,
    //             name: "susan",
    //             number: "(02) 2011270",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 598,
    //             direction: "Out",
    //             duration: 49,
    //             name: "susan",
    //             number: "(09) 37470979",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 599,
    //             direction: "In",
    //             duration: 43,
    //             name: "susan",
    //             number: "(01) 56297516",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 600,
    //             direction: "In",
    //             duration: 99,
    //             name: "susan",
    //             number: "(00) 30313801",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 601,
    //             direction: "In",
    //             duration: 95,
    //             name: "susan",
    //             number: "(01) 75205393",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 602,
    //             direction: "In",
    //             duration: 46,
    //             name: "susan",
    //             number: "(09) 48865412",
    //             switchCode: "SW0",
    //           },
    //         ],
    //         calls: 24,
    //         minutes: 26.216666666666665,
    //         name: "Mila Smith",
    //       },
    //       {
    //         account: 177002,
    //         callRecords: [
    //           {
    //             callId: 603,
    //             direction: "Out",
    //             duration: 80,
    //             name: "susan",
    //             number: "(05) 35713044",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 604,
    //             direction: "Out",
    //             duration: 33,
    //             name: "susan",
    //             number: "(01) 66861341",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 605,
    //             direction: "Out",
    //             duration: 118,
    //             name: "susan",
    //             number: "(03) 97264924",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 606,
    //             direction: "In",
    //             duration: 48,
    //             name: "susan",
    //             number: "(06) 737384",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 607,
    //             direction: "Out",
    //             duration: 58,
    //             name: "susan",
    //             number: "(03) 64513785",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 608,
    //             direction: "In",
    //             duration: 100,
    //             name: "susan",
    //             number: "(04) 83820843",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 609,
    //             direction: "In",
    //             duration: 32,
    //             name: "susan",
    //             number: "(00) 98227161",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 610,
    //             direction: "Out",
    //             duration: 47,
    //             name: "susan",
    //             number: "(05) 79915723",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 611,
    //             direction: "Out",
    //             duration: 108,
    //             name: "susan",
    //             number: "(03) 21154598",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 612,
    //             direction: "Out",
    //             duration: 116,
    //             name: "susan",
    //             number: "(01) 59298612",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 613,
    //             direction: "Out",
    //             duration: 36,
    //             name: "susan",
    //             number: "(07) 20546944",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 614,
    //             direction: "Out",
    //             duration: 94,
    //             name: "susan",
    //             number: "(08) 86946147",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 615,
    //             direction: "In",
    //             duration: 38,
    //             name: "susan",
    //             number: "(09) 44359896",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 616,
    //             direction: "In",
    //             duration: 63,
    //             name: "susan",
    //             number: "(08) 53677055",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 617,
    //             direction: "Out",
    //             duration: 85,
    //             name: "susan",
    //             number: "(03) 93644296",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 618,
    //             direction: "In",
    //             duration: 53,
    //             name: "susan",
    //             number: "(07) 62469867",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 619,
    //             direction: "In",
    //             duration: 55,
    //             name: "susan",
    //             number: "(09) 34894361",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 620,
    //             direction: "Out",
    //             duration: 80,
    //             name: "susan",
    //             number: "(04) 73077815",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 621,
    //             direction: "In",
    //             duration: 75,
    //             name: "susan",
    //             number: "(05) 9811378",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 622,
    //             direction: "Out",
    //             duration: 100,
    //             name: "susan",
    //             number: "(09) 15120539",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 623,
    //             direction: "In",
    //             duration: 114,
    //             name: "susan",
    //             number: "(00) 95177099",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 624,
    //             direction: "In",
    //             duration: 78,
    //             name: "susan",
    //             number: "(08) 69263227",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 625,
    //             direction: "In",
    //             duration: 71,
    //             name: "susan",
    //             number: "(04) 65395799",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 626,
    //             direction: "In",
    //             duration: 117,
    //             name: "susan",
    //             number: "(02) 7721832",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 627,
    //             direction: "In",
    //             duration: 39,
    //             name: "susan",
    //             number: "(04) 83980663",
    //             switchCode: "SW8",
    //           },
    //         ],
    //         calls: 25,
    //         minutes: 30.633333333333333,
    //         name: "Evelyn Taylor",
    //       },
    //       {
    //         account: 177003,
    //         callRecords: [
    //           {
    //             callId: 628,
    //             direction: "In",
    //             duration: 43,
    //             name: "susan",
    //             number: "(03) 99309192",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 629,
    //             direction: "Out",
    //             duration: 117,
    //             name: "susan",
    //             number: "(08) 59342105",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 630,
    //             direction: "Out",
    //             duration: 31,
    //             name: "susan",
    //             number: "(08) 12325526",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 631,
    //             direction: "Out",
    //             duration: 47,
    //             name: "susan",
    //             number: "(05) 95756786",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 632,
    //             direction: "Out",
    //             duration: 88,
    //             name: "susan",
    //             number: "(08) 57663903",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 633,
    //             direction: "In",
    //             duration: 48,
    //             name: "susan",
    //             number: "(05) 2223124",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 634,
    //             direction: "In",
    //             duration: 87,
    //             name: "susan",
    //             number: "(03) 91770582",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 635,
    //             direction: "Out",
    //             duration: 33,
    //             name: "susan",
    //             number: "(05) 18642775",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 636,
    //             direction: "Out",
    //             duration: 29,
    //             name: "susan",
    //             number: "(02) 8142481",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 637,
    //             direction: "In",
    //             duration: 98,
    //             name: "susan",
    //             number: "(02) 60222030",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 638,
    //             direction: "Out",
    //             duration: 31,
    //             name: "susan",
    //             number: "(05) 61042088",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 639,
    //             direction: "In",
    //             duration: 54,
    //             name: "susan",
    //             number: "(02) 81673712",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 640,
    //             direction: "In",
    //             duration: 57,
    //             name: "susan",
    //             number: "(05) 53777339",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 641,
    //             direction: "In",
    //             duration: 38,
    //             name: "susan",
    //             number: "(02) 19669515",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 642,
    //             direction: "Out",
    //             duration: 108,
    //             name: "susan",
    //             number: "(08) 94952980",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 643,
    //             direction: "Out",
    //             duration: 84,
    //             name: "susan",
    //             number: "(07) 27865463",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 644,
    //             direction: "In",
    //             duration: 85,
    //             name: "susan",
    //             number: "(04) 4150028",
    //             switchCode: "SW7",
    //           },
    //           {
    //             callId: 645,
    //             direction: "Out",
    //             duration: 41,
    //             name: "susan",
    //             number: "(00) 34497134",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 646,
    //             direction: "In",
    //             duration: 56,
    //             name: "susan",
    //             number: "(02) 14349051",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 647,
    //             direction: "In",
    //             duration: 101,
    //             name: "susan",
    //             number: "(09) 72617109",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 648,
    //             direction: "Out",
    //             duration: 90,
    //             name: "susan",
    //             number: "(04) 34028257",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 649,
    //             direction: "In",
    //             duration: 47,
    //             name: "susan",
    //             number: "(00) 585245",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 650,
    //             direction: "Out",
    //             duration: 117,
    //             name: "susan",
    //             number: "(08) 70074008",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 651,
    //             direction: "In",
    //             duration: 59,
    //             name: "susan",
    //             number: "(06) 32750750",
    //             switchCode: "SW0",
    //           },
    //         ],
    //         calls: 24,
    //         minutes: 26.483333333333334,
    //         name: "Harper Johnson",
    //       },
    //       {
    //         account: 177004,
    //         callRecords: [
    //           {
    //             callId: 652,
    //             direction: "Out",
    //             duration: 32,
    //             name: "susan",
    //             number: "(04) 77524120",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 653,
    //             direction: "Out",
    //             duration: 44,
    //             name: "susan",
    //             number: "(06) 477252",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 654,
    //             direction: "In",
    //             duration: 86,
    //             name: "susan",
    //             number: "(01) 15955397",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 655,
    //             direction: "Out",
    //             duration: 85,
    //             name: "susan",
    //             number: "(07) 25298377",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 656,
    //             direction: "In",
    //             duration: 71,
    //             name: "susan",
    //             number: "(07) 63477321",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 657,
    //             direction: "Out",
    //             duration: 72,
    //             name: "susan",
    //             number: "(03) 22235015",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 658,
    //             direction: "Out",
    //             duration: 109,
    //             name: "susan",
    //             number: "(09) 82619737",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 659,
    //             direction: "Out",
    //             duration: 100,
    //             name: "susan",
    //             number: "(09) 8153754",
    //             switchCode: "SW1",
    //           },
    //           {
    //             callId: 660,
    //             direction: "Out",
    //             duration: 28,
    //             name: "susan",
    //             number: "(04) 25341354",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 661,
    //             direction: "Out",
    //             duration: 50,
    //             name: "susan",
    //             number: "(01) 76439655",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 662,
    //             direction: "In",
    //             duration: 62,
    //             name: "susan",
    //             number: "(09) 66176396",
    //             switchCode: "SW3",
    //           },
    //           {
    //             callId: 663,
    //             direction: "In",
    //             duration: 65,
    //             name: "susan",
    //             number: "(04) 90800721",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 664,
    //             direction: "In",
    //             duration: 66,
    //             name: "susan",
    //             number: "(04) 91569849",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 665,
    //             direction: "Out",
    //             duration: 63,
    //             name: "susan",
    //             number: "(07) 33873629",
    //             switchCode: "SW5",
    //           },
    //           {
    //             callId: 666,
    //             direction: "In",
    //             duration: 62,
    //             name: "susan",
    //             number: "(06) 66194544",
    //             switchCode: "SW9",
    //           },
    //           {
    //             callId: 667,
    //             direction: "In",
    //             duration: 34,
    //             name: "susan",
    //             number: "(03) 32839115",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 668,
    //             direction: "Out",
    //             duration: 106,
    //             name: "susan",
    //             number: "(01) 91033174",
    //             switchCode: "SW8",
    //           },
    //           {
    //             callId: 669,
    //             direction: "Out",
    //             duration: 76,
    //             name: "susan",
    //             number: "(06) 57975290",
    //             switchCode: "SW6",
    //           },
    //           {
    //             callId: 670,
    //             direction: "In",
    //             duration: 44,
    //             name: "susan",
    //             number: "(01) 59390834",
    //             switchCode: "SW0",
    //           },
    //           {
    //             callId: 671,
    //             direction: "In",
    //             duration: 96,
    //             name: "susan",
    //             number: "(07) 44947033",
    //             switchCode: "SW2",
    //           },
    //           {
    //             callId: 672,
    //             direction: "In",
    //             duration: 57,
    //             name: "susan",
    //             number: "(00) 71164015",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 673,
    //             direction: "In",
    //             duration: 21,
    //             name: "susan",
    //             number: "(01) 35648857",
    //             switchCode: "SW4",
    //           },
    //           {
    //             callId: 674,
    //             direction: "Out",
    //             duration: 35,
    //             name: "susan",
    //             number: "(06) 44609564",
    //             switchCode: "SW4",
    //           },
    //         ],
    //         calls: 23,
    //         minutes: 24.4,
    //         name: "Addison Wilson",
    //       },
    //     ]}
    //     tableHeader="Master Details Tables"
    //   />
    //   <Table
    //     columnDefs={[
    //       {
    //         aggFunc: () => "Grand Total",
    //         field: "make",
    //         flex: 1,
    //       },
    //       {
    //         field: "model",
    //         flex: 1,
    //       },
    //       {
    //         aggFunc: "sum",
    //         field: "price",
    //         type: "number",
    //       },
    //     ]}
    //     groupIncludeTotalFooter
    //     onNumberFormatChange={() => {}}
    //     rowData={[
    //       {
    //         make: "Toyota",
    //         model: "Celica",
    //         price: 35000,
    //       },
    //       {
    //         make: "Ford",
    //         model: "Mondeo",
    //         price: 32000,
    //       },
    //       {
    //         make: "Porsche",
    //         model: "Boxster",
    //         price: 72000,
    //       },
    //     ]}
    //     tableHeader="Aggregation"
    //   />
    //   <Table
    //     columnDefs={[
    //       {
    //         children: [
    //           {
    //             children: [
    //               {
    //                 columnGroupShow: "open",
    //                 field: "make",
    //               },
    //               {
    //                 columnGroupShow: "open",
    //                 field: "model",
    //               },
    //               {
    //                 field: "price",
    //               },
    //             ],
    //             headerName: "Some header",
    //           },
    //           {
    //             field: "electric",
    //             headerClass: "span-2",
    //           },
    //         ],
    //         headerName: "Some grand header",
    //       },
    //       {
    //         field: "year",
    //         headerClass: "span-3",
    //       },
    //     ]}
    //     onNumberFormatChange={() => {}}
    //     rowData={[
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Tesla",
    //         model: "Model Y",
    //         price: 64950,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Ford",
    //         model: "F-Series",
    //         price: 33850,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //       {
    //         electric: true,
    //         electric0: true,
    //         electric1: "kunal",
    //         electric2: "Patel",
    //         electric3: "Bangalore",
    //         electric4: "Karnataka",
    //         electric5: "India",
    //         make: "Toyota",
    //         model: "Corolla",
    //         price: 29600,
    //       },
    //     ]}
    //     tableHeader="Column Group Table"
    //   />
    // </>
  )
}