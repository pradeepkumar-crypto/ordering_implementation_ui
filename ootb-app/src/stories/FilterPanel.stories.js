import React, { useState } from "react";
import { FilterPanel as FilterPanelWrapper } from "../components/FilterPanel";
import { fn } from "@storybook/test";
import { Button } from "../components/Button";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

export default {
  title: "Components/FilterPanel",
  component: FilterPanelWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Filter Panel is a standard way to prompt user to click on it, in form or button or URL. Label displayed on CTA must be a single word and preferably a verb. The label must be able to communicate to the users he actions they are going to take and what effect it will have on the content being viewed.",
      },
    },
  },
  argTypes: {
    className: {
      description:
        "ClassName props to over-ride filter panel width or styling.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    title: {
      description: "Title/Heading of the Filter Panel",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    anchor: {
      description: "Direction by which Panel will open",
      options: ["left", "right"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "right" },
        type: { summary: "string" },
      },
    },
    size: {
      description:
        "Different panel, width size, Note:- You can use classname props to add your own class and customize width",
      options: ["large", "medium"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "large" },
        type: { summary: "string" },
      },
    },
    isOpen: {
      description: "State to open or close filter panel",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    // setIsOpen: {
    //   description:
    //     "Function handle change in state of isOpen, `setIsOpen(!isOpen)`",
    //   table: {
    //     defaultValue: { summary: "() => {}" },
    //     type: { summary: "function" },
    //   },
    // },
    active: {
      description: "Holds current active tab's value",
    },
    setActive: {
      description: "Function to handle tab's change value.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    filters: {
      description: `Array Object of different Tabs.
      <br/>
      <br/>
      <code>
      <ul class="storybook-order-list">
        <li><strong>type?</strong>: To display <code>separator</code>, add type:"separator" [string]</li>
        <li><strong>value</strong>: Unique value of the tab [string]</li>
        <li><strong>title</strong>: Title of the tab [string]</li>
        <li><strong>icon</strong>: Icon user want to display for tab [object]</li>
        <li><strong>numberOfFilter?</strong>: Number of children inside tab already selected [number]</li>
        <li><strong>required?</strong>: Flag to state Tab is required or not [bool]</li>
        <li><strong>children</strong>: React children you want to render for that tab [React children]</li>
        </ul>
        </code>`,
      table: {
        type: { summary: "object[]" },
        defaultValue: { summary: "[]" },
      },
      control: {
        type: "object",
      },
    },
    primaryButtonLabel: {
      description:
        "Label of primary button, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonProps: {
      description: "You can pass Primary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label of secondary button, If not passed does not display secondary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonProps: {
      description: "You can pass Secondary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    tertiaryButtonLabel: {
      description:
        "Label of tertiary button, If not passed does not display tertiary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    tertiaryButtonProps: {
      description: "You can pass Secondary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    quaternaryButtonLabel: {
      description:
        "Label of fourth button, If not passed does not display fourth button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    quaternaryButtonProps: {
      description: "You can pass Secondary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    handleClose: {
      description: "Function to handle the event when filter panel closes.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onPrimaryButtonClick: {
      description: "Function to handle when user clicks on primary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description: "Function to handle when user clicks on secondary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onTertiaryButtonClick: {
      description: "Function to handle when user clicks on third button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onQuaternaryButtonClick: {
      description: "Function to handle when user clicks on fourth button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    alwaysRender: {
      description:
        "If true, all tabs that load in lazyLoading format will also render inside dom.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    onTertiaryButtonClick: fn(),
    onQuaternaryButtonClick: fn(),
    handleClose: fn(),
    setActive: fn(),
    //setIsOpen: fn(),
  },
};

let options = [
  {
    id: 1,
    value: "merch-divison",
    title: "Merch Divison",
    required: false,
    numberOfFilter: 0,
    icon: <SaveAsIcon />,
    children: <React.Fragment>Merch Divison's Component</React.Fragment>,
  },
  {
    id: 2,
    value: "attributes",
    title: "Attributes",
    required: true,
    numberOfFilter: 3,
    icon: <HomeIcon />,
    children: <React.Fragment>Attributes's Component</React.Fragment>,
  },
  {
    id: 3,
    value: "product-hierarchy",
    title: "Product Hierarchy",
    required: true,
    numberOfFilter: 3,
    icon: <AppsIcon />,
    children: <React.Fragment>Product Hierarchy's Component</React.Fragment>,
  },
  {
    id: 4,
    value: "store-group",
    title: "Store Group",
    required: false,
    numberOfFilter: 3,
    icon: <AssessmentOutlinedIcon />,
    children: <React.Fragment>Product Hierarchy's Component</React.Fragment>,
  },
  {
    type: "separator",
  },
  {
    id: 3,
    value: "price-zone",
    title: "Price Zone",
    required: true,
    icon: <ScheduleOutlinedIcon />,
    children: <React.Fragment>Product Hierarchy's Component</React.Fragment>,
  },
];

const FilterPanel = (args) => {
  const [isOpenLeft, setIsOpenLeft] = useState(args.isOpen);
  const [active, setActive] = useState(args.active);

  return (
    <>
      <Button onClick={() => setIsOpenLeft(!isOpenLeft)}>{args.anchor}</Button>
      <FilterPanelWrapper
        {...args}
        filters={options}
        isOpen={isOpenLeft}
        setIsOpen={setIsOpenLeft}
        active={active}
        setActive={setActive}
        handleClose={() => setIsOpenLeft(!isOpenLeft)}
      />
    </>
  );
};

export const Default = (args) => <FilterPanel {...args} />;

Default.args = {
  className: "",
  anchor: "right",
  isOpen: false,
  active: "merch-divison",
  filters: options,
  size: "large",
  title: "Filter panel",
  primaryButtonLabel: "Submit",
  secondaryButtonLabel: "Cancel",
  tertiaryButtonLabel: "Save Filter",
  quaternaryButtonLabel: "Apply as",
};
