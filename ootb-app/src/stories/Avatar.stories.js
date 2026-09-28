import sample_image from "../assets/avatar_sample.jpeg";
import sample_svg from "../../assets/images/avatar.svg";

import { Avatar } from "../components/Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An avatar is a UI component that typically represents a user or an entity, often in the form of a profile picture or icon. Avatars can appear with or without a background, and each presentation can serve different design and contextual purposes.<br/><br/><u>General Guidelines for Writing Descriptions for Avatars</u><ul><li>Identification: Clearly identify who or what the avatar represents.</li><li>Context: Indicate if the avatar includes any additional contextual elements like badges, status indicators, or backgrounds.</li><li>Accessibility: Ensure that the description includes alternative text (alt text) for accessibility.</li>",
      },
    },
  },
  argTypes: {
    size: {
      description: "Size of the avatar component",
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "large" },
        type: { summary: "string" },
      },
    },
    type: {
      description: "Type of avatar display",
      options: ["onlyName", "withoutPicture", "withPicture"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "withoutPicture" },
        type: { summary: "string" },
      },
    },
    label: {
      description:
        "Text to display in the avatar. For 'onlyName' type, shows first letter. For 'withoutPicture' type, shows first two letters.",
      control: { type: "string" },
      table: {
        defaultValue: { summary: "Unknown" },
        type: { summary: "string" },
      },
    },
    src: {
      description:
        "Image source URL for the avatar. Only used when type is 'withPicture'",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export const WithoutPicture = {
  args: {
    size: "large",
    type: "withoutPicture",
    label: "Jack Black",
    src: sample_image,
  },
};
export const WithPicture = {
  args: {
    size: "large",
    type: "withPicture",
    src: sample_image,
  },
};
export const OnlyName = {
  args: {
    size: "large",
    type: "onlyName",
    label: "Jack Black",
  },
};
