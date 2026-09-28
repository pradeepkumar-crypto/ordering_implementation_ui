import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { fn } from "@storybook/test";

import { Tabs as TabsWrapper } from "../components/Tabs";

export default {
  title: "Components/Tabs",
  component: TabsWrapper,
  tags: ["autodocs"],
  argTypes: {
    tabNames: {
      description: `It is array object which contains tab names of Tab component.
      <code>
      <ul class="storybook-order-list">
        <li><strong>label</strong>: label of the Tab name [string]</li>
        <li><strong>value</strong>: unique value of the  Tab name [string]</li>
        <li><strong>icon</strong>: icon of the Tab name [React Children]</li>
        <li><strong>disabled</strong>: if true, disables the Tab name [boolean]</li>
         <li><strong>children?</strong>: content of the Tab. [React Children]</li>
        </ul>
        </code>`,
      table: {
        defaultValue: { summary: [] },
        type: { summary: "Array Object" },
      },
    },
    tabPanels: {
      description: `It is React children array object which contains tab panels of Tab component. Note:- Please provide children according to its parent's index order.
      <code>
      <ul class="storybook-order-list">
         <li><strong>children?</strong>: content of the Tab. <br/>If not provided, return nulls.[React Children]</li>
        </ul>
        </code>`,
      table: {
        defaultValue: { summary: [] },
        type: { summary: "Array Object" },
      },
    },
    value: {
      description: "Holds the current active tab value",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    isDisabled: {
      description: "If true, disabled the Tab Component.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description:
        "Handles on change even when you click on other not active tabs, It can be used as `onChange={(event, val) => setActiveTab(val)}`",
      table: {
        defaultValue: { summary: "(event, val) => {}" },
        type: { summary: "function" },
      },
    },
    tabPanelStyle: {
      description: "You can pass your own style that is applied in tabPanel",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    orientation: {
      description: "Orientation of the Tab Component",
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "horizontal" },
        type: { summary: "string" },
      },
    },
    remountOnTabChange: {
      description:
        "If false, the tab panel will not be remounted when the tab is changed",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
  },
  args: { onChange: fn() },
};

const Tabs = (args) => {
  const [active, setActive] = React.useState(args.value);
  return (
    <TabsWrapper
      {...args}
      value={active}
      onChange={(event, val) => setActive(val)} //setActive(val)
    />
  );
};

const VerticalTabs = (args) => {
  const [active, setActive] = React.useState(args.value);
  return (
    <TabsWrapper
      {...args}
      value={active}
      orientation="vertical"
      onChange={(event, val) => setActive(val)} //setActive(val)
    />
  );
};

export const Default = (args) => <Tabs {...args} />;
export const Vertical = (args) => <VerticalTabs {...args} />;

Default.args = {
  tabNames: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3", disabled: true },
    {
      value: "opt4",
      label: "Option 4",
      icon: <DeleteOutlinedIcon fontSize="small" />,
    },
    { value: "opt5", label: "Option 5" },
    {
      value: "opt6",
      label: "Option 6",
      disabled: true,
      icon: <DeleteOutlinedIcon fontSize="small" />,
    },
  ],
  tabPanels: [
    <>Tab Panel 1</>,
    <>Tab Panel 2</>,
    <>Tab Panel 3</>,
    <>Tab Panel 4</>,
    <>Tab Panel 5</>,
    <>Tab Panel 6</>,
  ],
  value: "opt1",
  isDisabled: false,
  orientation: "horizontal",
};

Vertical.args = {
  tabNames: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3", disabled: true },
    {
      value: "opt4",
      label: "Option 4",
    },
    { value: "opt5", label: "Option 5" },
    {
      value: "opt6",
      label: "Option 6",
      disabled: true,
    },
  ],
  tabPanels: [
    <>Tab Panel 1</>,
    <>Tab Panel 2</>,
    <>Tab Panel 3</>,
    <>Tab Panel 4</>,
    <>Tab Panel 5</>,
    <>Tab Panel 6</>,
  ],
  value: "opt1",
  isDisabled: false,
  orientation: "vertical",
};

// export const V2 = {
//   args: {
//     tabNames: [
//       { value: "opt1", label: "Option 1" },
//       { value: "opt2", label: "Option 2" },
//       { value: "opt3", label: "Option 3", disabled: true },
//       {
//         value: "opt4",
//         label: "Option 4",
//         icon: <DeleteOutlinedIcon fontSize="small" />,
//       },
//       { value: "opt5", label: "Option 5" },
//       {
//         value: "opt6",
//         label: "Option 6",
//         disabled: true,
//         icon: <DeleteOutlinedIcon fontSize="small" />,
//       },
//     ],
//     tabList: [
//       <>Tab Panel 1</>,
//       <>Tab Panel 2</>,
//       <>Tab Panel 3</>,
//       <>Tab Panel 4</>,
//       <>Tab Panel 5</>,
//       <>Tab Panel 6</>,
//     ],
//     activeTab: "opt2",
//     disabled: false,
//     orientation: "vertical",
//     iaFallback: "v2",
//   },
// };

// export const Mui = {
//   args: {
//     tabNames: [
//       { value: "opt1", label: "Option 1" },
//       { value: "opt2", label: "Option 2" },
//       { value: "opt3", label: "Option 3", disabled: true },
//       {
//         value: "opt4",
//         label: "Option 4",
//         icon: <DeleteOutlinedIcon fontSize="small" />,
//       },
//       { value: "opt5", label: "Option 5" },
//       {
//         value: "opt6",
//         label: "Option 6",
//         disabled: true,
//         icon: <DeleteOutlinedIcon fontSize="small" />,
//         iconPosition: "start",
//       },
//     ],
//     tabList: [
//       <>Tab Panel 1</>,
//       <>Tab Panel 2</>,
//       <>Tab Panel 3</>,
//       <>Tab Panel 4</>,
//       <>Tab Panel 5</>,
//       <>Tab Panel 6</>,
//     ],
//     activeTab: "opt2",
//     disabled: false,
//     orientation: "vertical",
//     iaFallback: "mui",
//   },
// };
