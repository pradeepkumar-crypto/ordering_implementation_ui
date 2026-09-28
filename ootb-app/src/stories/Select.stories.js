import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Select as SelectWrapper } from "../components/Select";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default {
  title: "Components/Select",
  component: SelectWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown renders a list of actions or selectable options, lets user select from list of options",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "If true, open Select components, dropdown displays.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    label: {
      description: "Heading/Label of the Select",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    labelOrientation: {
      description: "Set the orientation of the Select label.",
      options: ["top", "left"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "top" },
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
    placeholder: {
      description: "Placeholder value of the Select",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    isMulti: {
      description:
        "If true, let you select multiple option. Note:- When you are using isMulti, also send, isSelectAll & setIsSelectAll props.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isDisabled: {
      description: "If true, disabled the Select.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isLoading: {
      description:
        "If true, show loading... option, you can use this props when you are fetching option from API.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isWithIcon: {
      description: "If true, shows Icon in Select",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    icon: {
      description: "You can pass your Icon through this props",
    },
    isWithSearch: {
      description: "If true, shows search bar in Select dropdown.",
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
    isWithSelectAll: {
      description:
        "If true, selects all the options from the select dropdown options by default. Note:- Please send isSelectAll true, to default check Select All checkbox.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isWithSelectedOptionTags: {
      description:
        "If true, shows selected options as tags down below select components.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isClearable: {
      description:
        "If true, provides button, on clicking on it you can clear all the selected options.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isSelectAll: {
      description:
        "It is boolean option, helps you toggle between selectAll or De-selectAll, when isWithSelectAll props is passed.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    toggleSelectAll: {
      description: "If true, display Select All/Deselect All checkbox.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isCloseWhenClickOutside: {
      description:
        "If true, closes select dropdown when user click outside the Select Container",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    setIsSelectAll: {
      description: "function to handle isSelectAll boolean change.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    initialOptions: {
      description: `It is array object which contains label and value of the Select.
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Route [string]</li>
            <li><strong>value</strong>: Unique value of the  Route [string]</li>
            <li><strong>options</strong>: Array of options for option groups [array]</li>
            <li><strong>isGroup</strong>: Boolean to indicate if this is an option group [boolean]</li>
          </ul>
        </code>`,
      control: {
        type: "Array object", // Control type (text, boolean, select, etc.)
      },
    },
    currentOptions: {
      description: `Array object containing options. Note:- Don't send currentOptions props to intialOptions, maintain two different state. 
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Route [string]</li>
            <li><strong>value</strong>: Unique value of the  Route [string]</li>
            <li><strong>options</strong>: Array of options for option groups [array]</li>
            <li><strong>isGroup</strong>: Boolean to indicate if this is an option group [boolean]</li>
          </ul>
        </code>`,
      control: {
        type: "Array object", // Control type (text, boolean, select, etc.)
      },
    },
    setIsOpen: {
      description: "function to maintain select component dropdown display.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    setCurrentOptions: {
      description:
        "function to maintain current options.Note:- This is manadotry.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    selectedOptions: {
      description: `Array object containing selected options. 
      <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Route [string]</li>
            <li><strong>value</strong>: Unique value of the  Route [string]</li>
          </ul>
        </code>`,
      table: {
        defaultValue: { summary: "[] | null" },
        type: { summary: "Array object | Object" },
      },
    },
    setSelectedOptions: {
      description: "function to maintain selected options.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleChange: {
      description:
        "You can pass your function to handle onchange in select, this function called when option is clicked. It receives selectedOptions as parameters.",
      table: {
        defaultValue: { summary: "(opt) => {}" },
        type: { summary: "function" },
      },
    },
    onSearch: {
      description:
        "You can pass your function to handle when user search type something in search input box.",
      table: {
        defaultValue: { summary: "(event) => {}" },
        type: { summary: "function" },
      },
    },
    onDropdownOpen: {
      description:
        "You can pass your function to handle when drop-down appears in select, event for dropdown open.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onDropdownClose: {
      description:
        "You can pass your function to handle when drop-down dis-appears in select, event for dropdown close.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    customBadgeLabel: {
      description: "Custom label to display in the badge for grouped options",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    customBadgeColor: {
      description: "Color of the badge for grouped options",
      table: {
        defaultValue: { summary: "success" },
        type: { summary: "string" },
      },
    },
    onSelectAll: {
      description:
        "You can pass your function to handle when select all options event is called.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onClearAll: {
      description:
        "You can pass your function to handle when clear all event is called.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onMenuScrollToBottom: {
      description:
        "You can pass your function to handle when you scroll to the bottom of the menu.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
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
    dropDownPortalClassName: {
      description:
        "Lets you add your own className to the Select Dropdown container, when withPortal is true.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    portalContainer: {
      description:
        "Pass the container in which you want to display input dropdown when suing Portal.",
      table: {
        defaultValue: { summary: "document.body" },
        type: { summary: "React Component" },
      },
    },
    searchPlaceholder: {
      description: "Placeholder value of the Search",
      control: {
        type: "text",
      },
      table: {
        defaultValue: { summary: "Search here..." },
        type: { summary: "string" },
      },
    },
    width: {
      description: "Width of the Select",
      table: {
        defaultValue: { summary: "auto" },
        type: { summary: "string" },
      },
    },
    minWidth: {
      description: "Min Width of the Select",
      table: {
        defaultValue: { summary: "240px" },
        type: { summary: "string" },
      },
    },
    selectId: {
      description: "Unique ID for the Select",
      table: {
        defaultValue: { summary: "undefined" },
        type: { summary: "string" },
      },
    },
  },
  args: {
    setIsOpen: fn(),
    setSelectedOptions: fn(),
    handleChange: fn(),
    onMenuScrollToBottom: fn(),
    onDropdownClose: fn(),
    onDropdownOpen: fn(),
    setCurrentOptions: fn(),
    setIsSelectAll: fn(),
    onSelectAll: fn(),
    onClearAll: fn(),
    onSearch: fn(),
  },
};

const Select = (args) => {
  const [open, setOpen] = useState(args.isOpen);
  const [currentOptions, setCurrentOptions] = useState(args.currentOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(args.isSelectAll);
  return (
    <SelectWrapper
      {...args}
      isOpen={open}
      setIsOpen={setOpen}
      isMulti={args.isMulti}
      isWithSearch={args.isWithSearch}
      isClearable
      placeholder="select.."
      initialOptions={args.initialOptions}
      currentOptions={currentOptions}
      setCurrentOptions={setCurrentOptions}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      isSelectAll={isSelectAll}
      setIsSelectAll={setIsSelectAll}
    />
  );
};

export const Default = (args) => <Select {...args} />;
export const Multi = (args) => <Select {...args} />;
export const WithSearch = (args) => <Select {...args} />;
export const WithOptionGroups = (args) => <Select {...args} />;
export const WithOptionGroupsMulti = (args) => <Select {...args} />;
export const WithSubmenu = (args) => <Select {...args} />;
export const WithSubmenuMulti = (args) => <Select {...args} />;
Default.args = {
  isOpen: false,
  label: "label",
  name: "name",
  placeholder: "select..",
  labelOrientation: "top",
  isRequired: true,
  isMulti: false,
  isDisabled: false,
  isLoading: false,
  isWithIcon: false,
  isError: false,
  icon: <StarBorderIcon />,
  withPortal: false,
  isWithSearch: false,
  isWithSelectAll: false,
  isWithSelectedOptionTags: false,
  isClearable: false,
  isSelectAll: false,
  isCloseWhenClickOutside: true,
  initialOptions: [
    { value: "opt1", label: "Option 1", isDisabled: true },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6lllllllllllll" },
  ],
  currentOptions: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6" },
  ],
  selectedOptions: [{ value: "opt1", label: "Option 1" }],
};

Multi.args = {
  isOpen: false,
  label: "label",
  isRequired: false,
  placeholder: "select..",
  isMulti: true,
  isLoading: false,
  toggleSelectAll: true,
  isSelectAll: true,
  setIsSelectAll: () => {},
  initialOptions: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6" },
  ],
  currentOptions: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6" },
  ],
  selectedOptions: [{ value: "opt1", label: "Option 1" }],
};

WithSearch.args = {
  isOpen: false,
  label: "label",
  isRequired: false,
  placeholder: "select..",
  isMulti: true,
  isWithSearch: true,
  isLoading: false,
  initialOptions: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6" },
  ],
  currentOptions: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
    { value: "opt4", label: "Option 4" },
    { value: "opt5", label: "Option 5" },
    { value: "opt6", label: "Option 6" },
  ],
  selectedOptions: [{ value: "opt1", label: "Option 1" }],
};

WithOptionGroups.args = {
  isOpen: false,
  label: "Option Groups",
  isRequired: false,
  placeholder: "Select an option...",
  isWithSearch: true,
  isLoading: false,
  toggleSelectAll: true,
  isGrouped: true,
  initialOptions: [
    {
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      label: "Vegetables",
      options: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
        { value: "spinach", label: "Spinach" },
      ],
    },
    {
      label: "Dairy",
      options: [
        { value: "milk", label: "Milk" },
        { value: "cheese", label: "Cheese" },
        { value: "yogurt", label: "Yogurt" },
      ],
    },
  ],

  currentOptions: [
    {
      label: "Fruits",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      label: "Vegetables",
      options: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
        { value: "spinach", label: "Spinach" },
      ],
    },
    {
      label: "Dairy",
      options: [
        { value: "milk", label: "Milk" },
        { value: "cheese", label: "Cheese" },
        { value: "yogurt", label: "Yogurt" },
      ],
    },
  ],
  selectedOptions: [],
  customBadgeLabel: "Custom Label",
  customBadgeColor: "primary",
};

WithOptionGroupsMulti.args = {
  ...WithOptionGroups.args,
  isMulti: true,
};

WithSubmenu.args = {
  isOpen: false,
  label: "Select with Submenu",
  isRequired: true,
  placeholder: "Select an option...",
  isMulti: true,
  isWithSearch: true,
  isClearable: true,
  // isWithIcon: true,
  // icon: <StarBorderIcon />,
  toggleSelectAll: true,
  isSelectAll: false,
  isWithSelectedOptionTags: true,
  isLoading: false,
  initialOptions: [
    {
      value: "opt1",
      label: "Single Select 1",
      children: [
        { value: "sub1", label: "Sub Option 1" },
        {
          value: "sub2",
          label: "Sub Option 2",
          children: [
            { value: "subsub1", label: "Sub Sub Option 1" },
            { value: "subsub2", label: "Sub Sub Option 2" },
          ],
        },
      ],
    },
    {
      value: "opt2",
      label: "Single Select 2",
      children: [
        { value: "sub3", label: "Sub Option 3" },
        { value: "sub4", label: "Sub Option 4" },
      ],
    },
    { value: "opt3", label: "Option 3" },
    {
      value: "opt4",
      label: "Single Select 4-check",
      children: [
        { value: "sub5", label: "Sub Option 5" },
        {
          value: "sub6",
          label: "Sub Option 6",
        },
      ],
    },
    { value: "opt5", label: "Option 5" },
    {
      value: "opt6",
      label: "Single Select 7",
      children: [
        { value: "sub7", label: "Sub Option 7" },
        { value: "sub8", label: "Sub Option 8" },
      ],
    },
  ],
  currentOptions: [
    {
      value: "opt1",
      label: "Single Select 1",
      children: [
        { value: "sub1", label: "Sub Option 1" },
        {
          value: "sub2",
          label: "Sub Option 2",
        },
      ],
    },
    {
      value: "opt2",
      label: "Single Select 2",
      children: [
        { value: "sub3", label: "Sub Option 3" },
        { value: "sub4", label: "Sub Option 4" },
      ],
    },
    { value: "opt3", label: "Option 3" },
    {
      value: "opt4",
      label: "Single Select 4-check",
      children: [
        { value: "sub5", label: "Sub Option 5" },
        {
          value: "sub6",
          label: "Sub Option 6",
        },
      ],
    },
    { value: "opt5", label: "Option 5" },
    {
      value: "opt6",
      label: "Single Select 7",
      children: [
        { value: "sub7", label: "Sub Option 7" },
        { value: "sub8", label: "Sub Option 8" },
      ],
    },
  ],
  selectedOptions: [],
};

WithSubmenuMulti.args = {
  ...WithSubmenu.args,
  isMulti: false,
  isMultiInSubmenu: true,
};
