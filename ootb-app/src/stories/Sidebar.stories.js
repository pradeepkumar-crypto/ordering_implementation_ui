import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Sidebar as SidebarWrapper } from "../components/Sidebar";
import { routes, actionRoutes } from "../components/Sidebar/mock";

export default {
  title: "Patterns/Sidebar",
  component: SidebarWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sidebar navigation, also known as a vertical sidebar or vertical navbar, is a vertical list of links that appears on the left or right side of a website or mobile app. It helps users navigate to different sections of a website by clicking on links or options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "If true, open Sidebar component.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    routes: {
      description: `It is array object which contains routes of the Sidebar. <br/>Children Routes will have same key as of its parent.
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Route [string]</li>
            <li><strong>tooltip</strong>: content to display in tooltip [React Node]</li>
            <li><strong>icon</strong>: Icon of the Route [React Children]</li>
            <li><strong>value</strong>: Unique value of the  Route [string]</li>
            <li><strong>link</strong>: Link of the Route [string]</li>
            <li><strong>isDisabled</strong>: If true, disable route [boolean]</li>
            <li><strong>children</strong>: Object Array contains <br/>children routes of the sidebar [array]</li>
          </ul>
        </code>`,
      control: {
        type: "array", // Control type (text, boolean, select, etc.)
      },
    },
    actionRoutes: {
      description: `It is array object which contains action routes of the Sidebar. <br/>Children Routes will have same key as of its parent.
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Route [string]</li>
            <li><strong>tooltip</strong>: content to display in tooltip [React Node]</li>
            <li><strong>icon</strong>: Icon of the Route [React Children]</li>
            <li><strong>value</strong>: Unique value of the  Route [string]</li>
            <li><strong>link</strong>: Link of the Route [string]</li>
            <li><strong>isDisabled</strong>: If true, disable route [boolean]</li>
            <li><strong>children</strong>: Object Array contains <br/>children routes of the sidebar [array]</li>
          </ul>
        </code>`,
      control: {
        type: "array", // Control type (text, boolean, select, etc.)
      },
    },
    parentActive: {
      description: "Current active value of the parent route",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    childActive: {
      description: "Current active value of the child oute",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    isCloseWhenClickOutside: {
      description:
        "If true, closes sidebar when user click outside the Sidebar Container",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    handleParentRouteChange: {
      description:
        "Function to handle event which get triggers when <br/>clicked on different parent routes. It provides <br/>object of the clicked route.",
      table: {
        defaultValue: { summary: "(parent) => {}" },
        type: { summary: "function" },
      },
    },
    handleChildRouteChange: {
      description:
        "Function to handle event which get triggers <br/>when clicked on different child routes. It provides <br/>child and parentroute object of the clicked route.",
      table: {
        defaultValue: { summary: "(parent, child) => {}" },
        type: { summary: "function" },
      },
    },
    handleLogOut: {
      description:
        "Function to handle event which get triggers when clicked on Logout button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleClose: {
      description: "Function to handle the event when Sidebar closes.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    setIsOpen: {
      description: "Function to handle the event when Sidebar open/closes.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    isMemoryRouter: {
      description: "If true, use MemoryRouter for routing",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    handleParentRouteChange: fn(),
    handleChildRouteChange: fn(),
    handleLogOut: fn(),
    handleClose: fn(),
    setIsOpen: fn(),
  },
};

const Sidebar = (args) => {
  const [open, setOpen] = useState(args.isOpen);
  const [parentActive, setParentActive] = useState(args.parentActive);
  const [childActive, setChildActive] = useState(args.childActive);

  return (
    <React.Fragment>
      {/* <Button onClick={() => setOpen(!open)}>Click to open Sidebar</Button> */}
      <SidebarWrapper
        {...args}
        isOpen={open}
        setIsOpen={setOpen}
        handleClose={() => setOpen((prevOpen) => !prevOpen)}
        parentActive={parentActive}
        childActive={childActive}
        handleParentRouteChange={(item) => {
          setParentActive(item.value);
          setChildActive(null);
        }}
        handleChildRouteChange={(parent, child) => {
          setParentActive(parent.value);
          setChildActive(child.value);
        }}
      />
    </React.Fragment>
  );
};

export const Default = (args) => <Sidebar {...args} />;

Default.args = {
  isOpen: false,
  routes: routes,
  actionRoutes: actionRoutes,
  parentActive: "des-dash",
  childActive: "",
  isCloseWhenClickOutside: true,
  isMemoryRouter: true,
};
