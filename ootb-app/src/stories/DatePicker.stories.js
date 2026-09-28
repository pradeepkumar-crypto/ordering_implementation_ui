import React, { useState } from "react";
// import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import { fn } from "@storybook/test";
import { DatePicker as DatePickerWrapper } from "../components/DatePicker";
import { FullWidth } from "ag-grid-community/dist/lib/components/framework/componentTypes";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/DatePicker",
  component: DatePickerWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker is a UI component that allows users to select a date or a range of dates from a calendar interface. Date pickers are commonly used in forms, scheduling tools, and booking systems to input date-related information.<br/><br/> <span style='font-weight:600;'>Note:</span> You need to import <code>react-dates/initialize</code>to set up class names on our components. This import should go at the top of your application as you won't be able to import any <code>react-dates</code> components without it. <br/> <br/> <code>import 'react-dates/initialize';</code> <br/><br/> <u>General Guidelines for Writing Descriptions for Datepicker</u><ul><li>Purpose: Clearly explain the function of the date picker and what it is used for (e.g., selecting a date for an appointment).</li><li>Format: Indicate the date format used (e.g., MM/DD/YYYY) and whether a single date or a date range can be selected.</li><li>Interactivity: Describe how users interact with the date picker (e.g., clicking on a calendar icon or field).</li><li>Validation: Mention any restrictions or validations, such as disabling past dates or limiting the date range.</li>",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Content of the DatePicker",
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
    placeholder: {
      description: "Input placeholder value of the DatePicker",
    },
    displayFormat: {
      description: "Input valid date format",
      table: {
        defaultValue: { summary: "DD-MM-YYYY" },
        type: { summary: "string" },
      },
    },
    selectedDate: {
      description: "You can pass date wrap around moment object.",
      control: { type: "date" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "null or moment type" },
      },
    },
    setSelectedDate: {
      description: "function to set the date",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
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
      description: "If true, flags Select is error.",
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
    showMonthYearSelect: {
      description: "If true, show select dropdown for month and year.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
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
        "Pass function to handle onClick when user clicks Cancel button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    }, // onTertiaryButtonClick,
    onTertiaryButtonClick: {
      description:
        "Pass function to handle onClick when user clicks Clear button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleDateChange: {
      description: "Pass function to handle date change event.",
      table: {
        defaultValue: { summary: "(date) => {}" },
        type: { summary: "function" },
      },
    },
    minDate: {
      description: "Minimum date that can be selected.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "null or moment type" },
      },
    },
    maxDate: {
      description: "Maximum date that can be selected.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "null or moment type" },
      },
    },
    isAgGridCellRenderer: {
      description: "If true, display datepicker in ag-grid cell renderer.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    readOnly: {
      description: "If true, make datepicker read only.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      control: { type: "boolean" },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    onTertiaryButtonClick: fn(),
    setSelectedDate: fn(),
    handleDateChange: fn(),
  },
};

const DatePicker = (args) => {
  const [selectedDateSingle, setSelectedDateSingle] = useState(args.null);
  const isOutsideRange = (day) => {
    // Disable dates before today
    const today = new Date();
    return day < today;
  };
  return (
    <DatePickerWrapper
      {...args}
      label="Date Picker"
      handleDateChange={(date) => setSelectedDateSingle(date)}
      isOutsideRange={isOutsideRange}
      selectedDate={selectedDateSingle}
      setSelectedDate={setSelectedDateSingle}
      inputProps={{ name: "date" }}
    />
  );
};

export const Default = (args) => <DatePicker {...args} />;

Default.args = {
  labelOrientation: "top",
  isRequired: false,
  label: "Date Picker with single month",
  placeholder: "Select Date",
  isError: false,
  selectedDate: new Date(),
  isDisabled: false,
  showMonthYearSelect: true,
  showWeekNumbers: true,
  withPortal: false,
  fullWidth: false,
  displayFormat: "DD-MM-YYYY",
  portalContainer: document.body,
};
