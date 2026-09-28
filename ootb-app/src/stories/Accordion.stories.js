import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Accordion as AccordionWrapper } from "../components/Accordion";

let options = [
  {
    header: "Accordion 1",
    value: "accord 1",
    disabled: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Accordion 2",
    value: "accord 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Accordion 3",
    value: "accord 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Accordion 4",
    value: "accord 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

export default {
  title: "Components/Accordion",
  component: AccordionWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "An accordion is a common UI component used to manage large amounts of content in a compact space. It allows users to expand or collapse sections to reveal or hide information.<br/><br/><u>General Guidelines for Writing Descriptions for Accordions</u><ul><li>Clarity: Be clear and concise about what content the accordion contains and what action will occur when it is expanded or collapsed.</li><li>Consistency: Maintain consistent terminology and formatting throughout the interface.</li><li>User Intent: Focus on the user's needs and the purpose of the content within the accordion.</li>",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: {
      description: `It is array object which contains headers of Accordion, value that governs if Accordion is expanded or not and content, where you can pass React elements.
      <code>
      <ul class="storybook-order-list">
        <li><strong>header</strong>: Header of the Accordion [string]</li>
        <li><strong>value</strong>: unique value of the  Accordion [string]</li>
        <li><strong>content</strong>: content of Accordion Details [React Children]</li>
        <li><strong>disabled</strong>: If true, disables this specific accordion item [boolean]</li>
        </ul>
        </code>`,
      control: {
        type: "array",
      },
    },
    expanded: {
      description:
        "Holds the value of the Accordion which you want to be expanded. If isMultiExpanded selected, send array holding number of value of the Accordion, you wants to be expanded.",
      table: {
        type: { summary: "string | string[]" },
      },
    },
    isMultiExpanded: {
      description: "If true, You can expand multiple Accordion",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    isSingleItem: {
      description: "If true, it display, single Accordion",
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    singleData: {
      description: `If you want to display single Accordion, you need to pass the Accordion data using this props, Note:- Its is used with the combination of isSingleItem prop.
        <code>
          <ul class="storybook-order-list">
            <li><strong>header</strong>: Header of the Accordion [string]</li>
            <li><strong>value</strong>: unique value of the  Accordion [string]</li>
            <li><strong>content</strong>: content of Accordion Details [React Children]</li>
          </ul>
        </code>`,
      control: {
        type: "object",
      },
    },
    setExpanded: {
      description:
        "function handles event when Accordion is expanded, It receives Accordion's value when as a parameters",
      table: {
        type: { summary: "(value: string | string[]) => void" },
      },
    },
    onChange: {
      description:
        "You can pass your function to handle the event when Accordion is expanded.",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    disabled: {
      description: "If true, all Accordion items will be disabled.",
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    setExpanded: fn(),
  },
};

const Accordion = (args) => {
  const [expanded, setExpanded] = useState(args.expanded);
  return (
    <AccordionWrapper {...args} expanded={expanded} setExpanded={setExpanded} />
  );
};

export const Default = (args) => <Accordion {...args} />;

Default.args = {
  data: options,
  expanded: "accord 1",
  isMultiExpanded: false,
  isSingleItem: false,
  singleData: {
    header: "Single Data Accordion",
    value: "Single Data Accordion",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
};
