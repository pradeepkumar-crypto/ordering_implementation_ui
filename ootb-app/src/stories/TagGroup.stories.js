import React from "react";
import { TagGroup } from "../components/TagGroup";
import { Tag } from "../components/Tag";
// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/TagGroup",
  component: TagGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component: "Tag Group is a wrapper component to layout multiple tags.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      description: "You can pass Tag element as children, wrap around TagGroup",
    },
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    children: (
      <>
        <Tag label="Label 1" variant="stroke" />
        <Tag label="Label 2" />
        <Tag label="Label 3" isRemovable={true} />
        <Tag label="Label 4" />
      </>
    ),
  },
};
