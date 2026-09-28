import React, { useState } from "react";
import { fn } from "@storybook/test";
import { RadioButtonGroup as RadioButtonGroupWrapper } from "../components/RadioButtonGroup";

export default {
  title: "Components/Radio Button Group",
  component: RadioButtonGroupWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "The name used to reference the value of the control.",
    },
    orientation: {
      description: "Direction by Radio will appear",
      options: ["row", "column"],
      control: { type: "radio" },
    },
    options: {
      description: `It is array object which contains label & value of the Radios, You can also add another optional prop disabled.
      <code>
      <ul class="storybook-order-list">
        <li><strong>label</strong>: Label of the Radio [string]</li>
        <li><strong>value</strong>: Unique value of the  Radio [string]</li>
        <li><strong>disabled?</strong>: If true, disabled the Radio [boolean]</li>
        </ul>
        </code>`,
    },
    isDisabled: {
      description: "If true, disabled all the Radio.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description: `Callback fired when a radio button is selected.: onChange={(event) => {setValue(event.target.value)}}`,
    },
  },
  args: { onChange: fn() },
};

const RadioButtonGroup = (args) => {
  const [selectedOption, setSelectedOptions] = useState(args.selectedOption);
  return (
    <RadioButtonGroupWrapper
      {...args}
      options={args.options}
      selectedOption={selectedOption}
      onChange={(e) => setSelectedOptions(e.target.value)}
    />
  );
};

export const Default = (args) => <RadioButtonGroup {...args} />;

Default.args = {
  orientation: "column",
  options: [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    {
      value: "opt3",
      label: "Option 3",
    },
    { value: "opt4", label: "Option 4" },
    {
      value: "opt5",
      label: "Option 5",
      disabled: true,
    },
    { value: "opt6", label: "Option 6" },
  ],
  selectedOption: "opt2",
  isDisabled: false,
  name: "ia-test-radio-group",
};
