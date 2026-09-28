import React, { useState } from "react";
import { fn } from "@storybook/test";
import { DateRangePicker as DateRangePickerWrapper } from "../components/DateRangePicker";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/DateRangePicker",
  component: DateRangePickerWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A date range picker is a UI component that allows users to select a range of dates, typically through a calendar interface. This feature is commonly used in scenarios such as booking accommodations, planning events, setting date filters, or scheduling tasks over a period. <br/><br/> <span style='font-weight:600;'>Note:</span> You need to import <code>react-dates/initialize</code>to set up class names on our components. This import should go at the top of your application as you won't be able to import any <code>react-dates</code> components without it. <br/> <br/> <code>import 'react-dates/initialize';</code> <br/><br/>",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Content of the DatePicker",
    },
    displayFormat: {
      description: "Input valid date format",
      table: {
        defaultValue: { summary: "DD-MM-YYYY" },
        type: { summary: "string" },
      },
    },
    isRequired: {
      description: "If true, Add Required 'asterik' indicator to the label",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    labelOrientation: {
      description: "Set the orientation of the Datepicker label.",
      options: ["top", "left"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "top" },
        type: { summary: "string" },
      },
    },
    isDisabled: {
      description: "If true, disabled the datepicker.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isError: {
      description: "If true, flags dateRangePicker is error.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    showWeekNumbers: {
      description: "If true, show week number of that year.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    suppressClickOnWeekNumber: {
      description:
        "If true, prevents clicking on week numbers in the calendar.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    showRangeSelector: {
      description:
        "If true, shows a range selector in left panel of a DateRangePicker",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    withPortal: {
      description:
        "If true, display input dropdown outside the current React tree hierarchy. Note:- Use this props when rendering datepicker in ag-grid.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    portalContainer: {
      description:
        "Pass the container in which you want to display input dropdown when suing Portal.",
      table: {
        defaultValue: { summary: "document.body" },
        type: { summary: "DOM element" },
      },
    },
    fullWidth: {
      description:
        "If true, make width 100%, and takes width of the container.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    startDate: {
      description: "You can pass starting date wrap around moment object.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "null or moment type" },
      },
    },
    endDate: {
      description: "You can pass starting date wrap around moment object.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "null or moment type" },
      },
    },
    startDateInputProps: {
      description:
        "Pass props like placeholder, name etc. for the date range picker start date input",
    },
    endDateInputProps: {
      description:
        "Pass props like placeholder, name etc. for the date range picker end date input",
    },
    setStartDate: {
      description: "function to set the start date",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    setEndDate: {
      description: "function to set the end date",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onPrimaryButtonClick: {
      description:
        "Pass function to handle onClick when user clicks Apply button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description:
        "Pass function to handle onClick when user clicks Cancel button. If not passed, does not display Cancel Button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onResetClick: {
      description:
        "Pass function to handle onClick when user clicks Reset button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleDatesChange: {
      description: "Pass function to handle dates change event.",
      table: {
        defaultValue: { summary: "(startDate, endDate) => {}" },
        type: { summary: "function" },
      },
    },
    // handleFocusChange: {
    //   description: "Pass function to handle dates focus change event.",
    //   table: {
    //     defaultValue: {
    //       summary:
    //         "(focusedInput, setFocusedInput, startDateInputRef, endDateInputRef) => {}",
    //     },
    //     type: { summary: "function" },
    //   },
    // },
    onStartDateFocus: {
      description: "Pass function to handle dates start focus change event.",
      table: {
        defaultValue: {
          summary: "(setFocusedInput) => {}",
        },
        type: { summary: "function" },
      },
    },
    onEndDateFocus: {
      description: "Pass function to handle dates end focus change event.",
      table: {
        defaultValue: {
          summary: "(setFocusedInput) => {}",
        },
        type: { summary: "function" },
      },
    },
    customWeekNumberData: {
      description: "You can pass your own custom week year data",
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array" },
      },
    },
    showMonthYearSelect: {
      description: "If true, show select dropdown for month and year.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isAgGridCellRenderer: {
      description:
        "If true, display date range picker in ag-grid cell renderer.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    readOnly: {
      description: "If true, make date range picker read only.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      control: { type: "boolean" },
    },
    customYears: {
      description: `You can pass your own custom year array when <code>showMonthYearSelect</code> is true. In format,
      <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: label of the year [string]</li>
            <li><strong>value</strong>: unique value of the year [string]</li>
          </ul>
        </code>`,
      table: {
        defaultValue: {
          summary: `[{
    label: "2019",
    value: "2019",
  },
  {
    label: "2020",
    value: "2020",
  },
  {
    label: "2021",
    value: "2021",
  },
  {
    label: "2022",
    value: "2022",
  },
  {
    label: "2023",
    value: "2023",
  },
  {
    label: "2024",
    value: "2024",
  },
  {
    label: "2025",
    value: "2025",
  },
  {
    label: "2026",
    value: "2026",
  },
  {
    label: "2027",
    value: "2027",
  },
  {
    label: "2028",
    value: "2028",
  },
  {
    label: "2029",
    value: "2029",
  },]`,
        },
        type: { summary: "Array Object" },
      },
    },
  },
  args: {
    setStartDate: fn(),
    setEndDate: fn(),
    onResetClick: fn(),
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    handleDatesChange: fn(),
    // handleFocusChange: fn(),
    onStartDateFocus: fn(),
    onEndDateFocus: fn(),
  },
};

const DateRangePicker = (args) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isOutsideRange = (day) => {
    // Disable dates before today
    const today = new Date();
    return day < today;
  };

  return (
    <DateRangePickerWrapper
      {...args}
      label="Date Range Selector"
      numberOfMonths={2}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isOutsideRange={isOutsideRange}
      handleDatesChange={(startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }}
      startDateInputProps={{ label: "StartDate", name: "startDate" }}
      endDateInputProps={{ label: "EndDate", name: "endDate" }}
    />
  );
};

export const Default = (args) => <DateRangePicker {...args} />;

Default.args = {
  label: "Date Range Selector",
  isRequired: false,
  labelOrientation: "top",
  displayFormat: "DD-MM-YYYY",
  startDate: new Date(),
  startDateInputProps: { label: "StartDate", name: "startDate" },
  endDate: new Date(),
  endDateInputProps: { label: "EndDate", name: "endDate" },
  isDisabled: false,
  isError: false,
  showMonthYearSelect: false,
  showRangeSelector: false,
  showWeekNumbers: false,
  withPortal: false,
  fullWidth: false,
  portalContainer: document.body,
};
