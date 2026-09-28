import React, { Fragment, useState } from "react";
import { BottomSheet as BottomSheetWrapper } from "../components/BottomSheet";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";

export default {
  title: "Components/BottomSheet",
  component: BottomSheetWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      description: "Additional CSS class name to apply to the bottom sheet",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    title: {
      description: "Title displayed at the top of the bottom sheet",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    open: {
      description: "Controls the visibility of the bottom sheet",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    children: {
      description: "Content to be displayed in the body of the bottom sheet",
      control: { type: "object" },
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    primaryButtonLabel: {
      description:
        "Label for the primary action button. If not provided, the button will not be displayed",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonProps: {
      description: "Additional props to pass to the primary button component",
      control: { type: "object" },
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label for the secondary action button. If not provided, the button will not be displayed",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonProps: {
      description: "Additional props to pass to the secondary button component",
      control: { type: "object" },
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    onClose: {
      description: "Callback function called when the bottom sheet is closed",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    onPrimaryButtonClick: {
      description:
        "Callback function called when the primary button is clicked",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    onSecondaryButtonClick: {
      description:
        "Callback function called when the secondary button is clicked",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    footerOptions: {
      description: "Custom React elements to be rendered in the footer section",
      control: { type: "object" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
    },
    isExpanded: {
      description: "Controls whether the bottom sheet is in expanded state",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    onExpand: {
      description:
        "Callback function called when the expand/collapse button is clicked",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    onClose: fn(),
  },
};

const BottomSheet = (args) => {
  const [open, setOpen] = useState(args.open);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open Bottom Sheet</Button>
      <BottomSheetWrapper {...args} open={open} onClose={handleClose}>
        <div>
          <h3>Content</h3>
          <p>
            This is the content of the bottom sheet. It can be scrolled when
            content exceeds the height.
          </p>
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <p key={i}>Content line {i + 1}</p>
            ))}
        </div>
      </BottomSheetWrapper>
    </>
  );
};

export const Default = (args) => <BottomSheet {...args} />;

Default.args = {
  label: "Default",
  title: "Bottom Sheet Title",
  children: <div>Content</div>,
  footerOptions: (
    <Fragment>
      <Button variant="url" onClick={() => {}}>
        Close
      </Button>
      <Button variant="secondary" onClick={() => {}}>
        Take Action 1
      </Button>
      <Button variant="primary" onClick={() => {}}>
        Take Action 2
      </Button>
    </Fragment>
  ),
};
