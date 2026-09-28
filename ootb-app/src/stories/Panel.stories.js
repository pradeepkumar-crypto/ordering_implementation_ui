import React, { useState } from "react";
import { Panel as PanelWrapper } from "../components/Panel";
import { fn } from "@storybook/test";
import { Button } from "../components/Button";

export default {
  title: "Components/Panel",
  component: PanelWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Panel is a standard way to prompt user to click on it, in form or button or URL. Label displayed on CTA must be a single word and preferably a verb. The label must be able to communicate to the users he actions they are going to take and what effect it will have on the content being viewed.",
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
    open: {
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
    children: {
      description: "React Children, UI you want to show inside Filter Panel",
      defaultValue: { summary: "React Children" },
    },
    primaryButtonLabel: {
      description:
        "Label of primary button, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
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
    onPrimaryButtonClick: {
      description: "function to handle when user clicks on primary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description: "function to handle when user clicks on secondary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onClose: {
      description: "function to handle the event when filter panel closes",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    width: {
      description: "Custom width of the Panel",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "string" },
      },
      control: { type: "text" },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    onClose: fn(),
  },
};

const Panel = (args) => {
  const [isOpenLeft, setIsOpenLeft] = useState(args.isOpen);

  return (
    <>
      <Button onClick={() => setIsOpenLeft(!isOpenLeft)}>{args.anchor}</Button>
      <PanelWrapper {...args} open={isOpenLeft} setIsOpen={setIsOpenLeft}>
        <React.Fragment key=".0">Children</React.Fragment>
      </PanelWrapper>
    </>
  );
};

export const Default = (args) => <Panel {...args} />;

Default.args = {
  className: "",
  anchor: "left",
  open: false,
  size: "large",
  title: "title",
  children: <>Children</>,
  primaryButtonLabel: "Submit",
  secondaryButtonLabel: "Cancel",
};
