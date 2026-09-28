import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { fn } from "@storybook/test";
import { ButtonGroup as ButtonGroupWrapper } from "../components/ButtonGroup";

export default {
  title: "Components/Button Group",
  component: ButtonGroupWrapper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A ButtonGroup is a UI component that contains a set of related buttons, allowing users to select a single option from multiple choices. The component is built on top of Material-UI's ToggleButtonGroup and includes custom styling and functionality.\n\n" +
          "Key features:\n" +
          "- Single selection mode\n" +
          "- Support for icons in buttons\n" +
          "- Disabled state for individual buttons or the entire group\n" +
          "- Custom styling for selected and disabled states\n" +
          "- Consistent height and spacing\n" +
          "- Rounded corners for first and last buttons\n\n" +
          "The ButtonGroup is commonly used for:\n" +
          "- Formatting options (e.g., text alignment)\n" +
          "- View mode selection (e.g., list/grid view)\n" +
          "- Filter options\n" +
          "- Tab-like navigation",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: { type: "array" },
      description: `Array of button options to display in the group. Each option can have the following properties:
        <br/>
        <br/>
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Text to display on the button [string]</li>
            <li><strong>value</strong>: Unique identifier for the button [string]</li>
            <li><strong>disabled</strong>: If true, disables the button [boolean]</li>
            <li><strong>icon</strong>: React node to display as an icon [ReactNode]</li>
          </ul>
        </code>`,
      table: {
        type: {
          summary:
            "Array<{label: string, value: string, disabled?: boolean, icon?: ReactNode}>",
        },
      },
    },
    selectedOption: {
      description:
        "The value of the currently selected button. Must match one of the option values.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    isDisabled: {
      description:
        "If true, disables all buttons in the group. Individual buttons can still be disabled using the disabled property in options.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description:
        "Callback function called when a button is clicked. Receives the event and the value of the clicked button.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "(event, value) => {}" },
        type: { summary: "(event: React.MouseEvent, value: string) => void" },
      },
    },
    className: {
      description:
        "Additional CSS class name to apply to the button group container",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: { onChange: fn() },
};

const ButtonGroup = (args) => {
  const [active, setActive] = useState(args.selectedOption);
  return (
    <ButtonGroupWrapper
      {...args}
      selectedOption={active}
      onChange={(e, val) => setActive(val)}
    />
  );
};

export const Default = (args) => <ButtonGroup {...args} />;

Default.args = {
  options: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt6", label: "Option 6", disabled: true },
    {
      value: "opt3",
      label: "Option 3",
      icon: <DeleteOutlinedIcon fontSize="small" />,
    },
    { value: "opt4", label: "Option 4" },
    {
      value: "opt5",
      label: "Option 5",
      disabled: true,
      icon: <DeleteOutlinedIcon fontSize="small" />,
    },
  ],
  selectedOption: "opt2",
  isDisabled: false,
};
