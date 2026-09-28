import React, { useState } from "react";
import { fn } from "@storybook/test";
import { TextArea as TextAreaWrapper } from "../components/TextArea";

export default {
  title: "Components/TextArea",
  component: TextAreaWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Textareas allow users to enter information, make selections, filter content, or trigger actions. While included here as a standalone component, the most common use will be in some form of input, so some of the behavior demonstrated here is not shown in context.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description: "Label of the input element.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    placeholder: {
      description: "Placeholder text of the textarea element.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    isDisabled: {
      description: "If true, disabled textarea element.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isRequired: {
      description: "If true, Add Required 'asterik' indicator to the label.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isError: {
      description: "If true, flags textarea is error.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    width: {
      description: "You can pass your custom width to the textArea.",
      table: {
        defaultValue: { summary: "240px" },
        type: { summary: "string" },
      },
    },
    height: {
      description: "You can pass your custom height to the textArea.",
      table: {
        defaultValue: { summary: "100px" },
        type: { summary: "string" },
      },
    },
    value: {
      description: "Value of the textarea element.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    maxRows: {
      description: "Maximum number of rows to display.",
      table: {
        defaultValue: { summary: 5 },
        type: { summary: "number" },
      },
    },
    defaultValue: {
      description:
        "The default value. Use when the component is not controlled.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryLabel: {
      description:
        "Second label of the textarea element. If not passed does not display secondary label.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    characterLimit: {
      description: "Maximum number of character user can input in textarea.",
      table: {
        defaultValue: { summary: 300 },
        type: { summary: "number" },
      },
    },
    onChange: {
      description: "Function to handle textarea value change state",
      table: {
        defaultValue: { summary: "(event) => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    onChange: fn(),
  },
};

const TextArea = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <TextAreaWrapper
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = (args) => <TextArea {...args} />;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
Default.args = {
  label: "TextArea Label",
  maxRows: 5,
  characterLimit: 300,
  placeholder: "placeholder...",
  defaultValue: "",
  value: "",
  secondaryLabel: "Secondary Label",
  isDisabled: false,
  isRequired: true,
  isError: false,
  width: "240px",
  height: "100px",
};
