import React, { useEffect, useState } from "react";
import { fn } from "@storybook/test";
import { Checkbox as CheckboxWrapper } from "../components/Checkbox";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Checkbox",
  component: CheckboxWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A Checkbox is a UI component that allows users to select one or more options from a set of choices. The component is built on top of Material-UI's Checkbox and includes custom styling and functionality.\n\n" +
          "Key features:\n" +
          "- Multiple variants (default and dashed)\n" +
          "- Support for labels and required fields\n" +
          "- Disabled state\n" +
          "- Controlled and uncontrolled modes\n" +
          "- Optional dropdown integration\n" +
          "- Custom styling for checked and unchecked states\n\n" +
          "The Checkbox is commonly used for:\n" +
          "- Form inputs\n" +
          "- Settings toggles\n" +
          "- Multi-select options\n" +
          "- Terms and conditions acceptance\n" +
          "- Filter options",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "The text label to display next to the checkbox.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    variant: {
      description:
        "The visual style of the checkbox. 'default' shows a checkmark when selected, while 'dashed' shows a dash.",
      options: ["default", "dashed"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    disabled: {
      description:
        "If true, the checkbox will be disabled and cannot be interacted with.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    required: {
      description:
        "If true, the checkbox will be marked as required with an asterisk.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    defaultChecked: {
      description:
        "The default checked state of the checkbox (uncontrolled mode).",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    checked: {
      description: "The checked state of the checkbox (controlled mode).",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description:
        "Callback function fired when the checkbox state changes. Receives the event object.",
      control: { type: "function" },
      table: {
        type: {
          summary: "(event: React.ChangeEvent<HTMLInputElement>) => void",
        },
      },
    },
    withoutFormLabel: {
      description:
        "If true, renders the checkbox without the Material-UI FormControlLabel wrapper.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    withDropDown: {
      description: "If true, enables dropdown functionality for the checkbox.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    dropDownData: {
      description: `Array of options for the dropdown menu. Each option can have:
        <br/>
        <br/>
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Text to display in the dropdown [string]</li>
            <li><strong>value</strong>: Unique identifier for the option [string]</li>
            <li><strong>onClick</strong>: Callback function when option is selected [function]</li>
            <li><strong>disabled</strong>: If true, disables the option [boolean]</li>
          </ul>
        </code>`,
      control: { type: "array" },
      table: {
        type: {
          summary:
            "Array<{label: string, value: string, onClick?: function, disabled?: boolean}>",
        },
      },
    },
  },
};

const Checkbox = (args) => {
  const [isChecked, setIsChecked] = useState(args.checked);
  return (
    <CheckboxWrapper
      {...args}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

const WithDropDownCheckbox = (args) => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setChecked(Boolean(selected));
  }, [selected]);

  const modifiedDropDownData = args.dropDownData?.map((item) => ({
    ...item,
    onClick: () => {
      setSelected((prev) => (prev === item.value ? null : item.value));
      item.onClick && item.onClick();
    },
  }));

  return (
    <CheckboxWrapper
      {...args}
      checked={checked}
      dropDownData={modifiedDropDownData}
    />
  );
};
export const Default = (args) => <Checkbox {...args} />;
export const withDropDown = (args) => <WithDropDownCheckbox {...args} />;

Default.args = {
  label: "checked",
  variant: "default",
  disabled: false,
  required: true,
  defaultChecked: true,
  checked: true,
  onChange: fn(),
  withoutFormLabel: false,
};

withDropDown.args = {
  variant: "default",
  disabled: false,
  checked: false,
  withoutFormLabel: false,
  withDropDown: true,
  dropDownData: [
    {
      label: "Select current page records",
      value: "Select current page records",
      onClick: () => {},
    },
    { label: "test1", value: "test1" },
  ],
};
