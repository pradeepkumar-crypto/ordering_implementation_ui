import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Slider as SliderWrapper } from "../components/Slider";

export default {
  title: "Components/Slider",
  component: SliderWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "The Slider component lets users show and hide sections of related content on a page.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    header: {
      description:
        "Heading of the Slider. Note:- If not passed will not display.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    headerOrientation: {
      description: "Set the orientation of the Slider label.",
      options: ["top", "left"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "top" },
        type: { summary: "string" },
      },
    },
    disabled: {
      description: "If true, disabled the Slider.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    label: {
      description: "Subheading of the Slider.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    value: {
      description:
        "The value of the Slider. pass array of number if you want ranged variant",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: "Array<number> | number" },
      },
    },
    onChange: {
      description:
        "Callback function that is fired when the Slider's value changed.",
      table: {
        defaultValue: { summary: "(event) => {}" },
        type: { summary: "function" },
      },
    },
    min: {
      description:
        "The minimum allowed value of the Slider. Should not be equal to max.",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: "number" },
      },
    },
    max: {
      description:
        "The maximum allowed value of the Slider. Should not be equal to min.",
      table: {
        defaultValue: { summary: 100 },
        type: { summary: "number" },
      },
    },
    required: {
      description: "If true, Add Required 'asterik' indicator to the label",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    variant: {
      description:
        "By default, it is default and for ranged slider pass the variant to ranged",
      options: ["default", "ranged"],
      control: {
        type: "radio",
      },
    },
    inputPosition: {
      description: "Set the position of the input.",
      options: ["inline", "bottom"],
      control: { defaultValue: "inline", type: "radio" },
    },
  },
  args: {
    onChange: fn(),
  },
};

const Slider = (args) => {
  const [value, setValue] = useState(args.value);
  const handleChange = (e, key) => {
    const val = e.target.value;
    setValue([...val]);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <SliderWrapper {...args} value={value} onChange={handleChange} />
    </div>
  );
};

export const Default = (args) => <Slider {...args} />;

Default.args = {
  header: "Header",
  label: "Some label",
  value: 0,
  min: 0,
  max: 100,
  required: false,
  disabled: false,
  headerOrientation: "top",
  inputPosition: "inline",
};

export const Ranged = (args) => <Slider {...args} />;

Ranged.args = {
  header: "Header",
  label: "Some label",
  value: [20, 30],
  min: 0,
  max: 100,
  required: false,
  disabled: false,
  headerOrientation: "top",
  variant: "ranged",
  inputPosition: "inline",
};
