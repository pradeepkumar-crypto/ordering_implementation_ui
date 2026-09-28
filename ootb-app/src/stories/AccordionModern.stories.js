import React, { useState } from "react";
import { fn } from "@storybook/test";
import { AccordionModern as AccordionWrapper } from "../components/AccordionModern";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";

let options = [
  {
    id: 1,
    header: (
      <div
        className="test-header-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="test-header-left"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <h3>Accordion 1</h3>
          <Badge
            color="info"
            label="Badge"
            onClick={() => {}}
            variant="stroke"
          />
        </div>
      </div>
    ),
    value: "accord 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    id: 2,
    header: "Accordion 2",
    value: "accord 2",
    childCount: 20,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    id: 3,
    header: (
      <div
        className="test-header-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="test-header-left"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <h3>Accordion 3</h3>
          <Badge
            color="success"
            label="Badge"
            onClick={() => {}}
            variant="stroke"
          />
        </div>
        <div
          className="test-header-right"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Button
            className=""
            icon={<StarIcon fontSize="small" />}
            iconPlacement="left"
            onClick={() => {}}
            size="small"
            variant="secondary"
          />
          <Button
            className=""
            icon={<StarIcon fontSize="small" />}
            iconPlacement="left"
            onClick={() => {}}
            size="small"
            variant="primary"
          />
        </div>
      </div>
    ),
    value: "accord 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    id: 4,
    header: (
      <div
        className="test-header-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="test-header-left">Accordion 4</div>
        <div className="test-header-right">
          <Button
            className=""
            icon={<StarIcon fontSize="small" />}
            iconPlacement="left"
            onClick={() => {}}
            size="small"
            variant="secondary"
          />
        </div>
      </div>
    ),
    value: "accord 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

export default {
  title: "Components/Accordion Modern",
  component: AccordionWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "An Modern Accordion is a common UI component used to manage large amounts of content in a compact space. It allows users to expand or collapse sections to reveal or hide information.<br/><br/><u>General Guidelines for Writing Descriptions for Accordions</u><ul><li>Clarity: Be clear and concise about what content the accordion contains and what action will occur when it is expanded or collapsed.</li><li>Consistency: Maintain consistent terminology and formatting throughout the interface.</li><li>User Intent: Focus on the user's needs and the purpose of the content within the accordion.</li>",
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
        <li><strong>id</strong>: For Drag to work, you need to pass ID [string | number]</li>  
        <li><strong>header</strong>: Header of the Accordion [React Component]</li>
        <li><strong>value</strong>: unique value of the Accordion [string]</li>
        <li><strong>content</strong>: content of Accordion Details [React Children]</li>
        <li><strong>childCount</strong>: show the child count in badge component [number]</li>
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
    draggable: {
      description: "If true, You can drag-sort Accordion items",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
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
    isSingleItem: {
      description: "If true, it displays a single Accordion",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    singleData: {
      description: `If you want to display single Accordion, you need to pass the Accordion data using this prop. Note: This is used in combination with isSingleItem prop.
        <code>
          <ul class="storybook-order-list">
            <li><strong>header</strong>: Header of the Accordion [React Component]</li>
            <li><strong>value</strong>: unique value of the Accordion [string]</li>
            <li><strong>content</strong>: content of Accordion Details [React Children]</li>
          </ul>
        </code>`,
      control: {
        type: "object",
      },
    },
  },
  args: {
    setExpanded: fn(),
    onChange: fn(),
  },
};

const ModernAccordion = (args) => {
  const [expanded, setExpanded] = useState(args.expanded);
  return (
    <AccordionWrapper {...args} expanded={expanded} setExpanded={setExpanded} />
  );
};

export const Default = (args) => <ModernAccordion {...args} />;

Default.args = {
  data: options,
  draggable: false,
  expanded: "accord 1",
  isMultiExpanded: false,
};
