import React, { useState } from "react";
import { fn } from "@storybook/test";
import { FiltersStrip as FiltersStripWrapper } from "../components/FiltersStrip";
import {
  filterTags,
  recentFilters,
  savedFiltersBadge,
  savedFilterLists,
} from "../components/FiltersStrip/mockData";

export default {
  title: "Patterns/Filters Strip",
  component: FiltersStripWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Filters Strip is a complex component that displays filter information and controls on the right side of various views. It provides a comprehensive interface for managing and displaying applied filters, recent filters, and saved filters.\n\n" +
          "Key features:\n" +
          "- Display of currently selected filters\n" +
          "- Recent filters management\n" +
          "- Saved filters with badges\n" +
          "- Filter tags with view all functionality\n" +
          "- Customizable filter button\n" +
          "- Responsive design with sliding navigation\n" +
          "- Dropdown menus for additional options\n\n" +
          "The component is commonly used in:\n" +
          "- Data tables\n" +
          "- Notification panels\n" +
          "- Filter panels\n" +
          "- Any view requiring complex filter management",
      },
    },
  },
  argTypes: {
    selectedFilter: {
      description:
        "The label of the currently selected filter. This is displayed in the filter strip to show which filter is active.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "Not selected" },
        type: { summary: "string" },
      },
    },
    setSelectedFilter: {
      description:
        "Callback function that is called when a filter is selected. It receives the selected filter's label as an argument.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "(filterLabel: string) => void" },
      },
    },
    filterTags: {
      description: `Array of filter tag objects that define the available filters and their values.
      <br/>
      <br/>
      <code>
      <ul class="storybook-order-list">
        <li><strong>id</strong>: Unique identifier for the filter tag [string]</li>
        <li><strong>label</strong>: Display label for the filter tag [string]</li>
        <li><strong>required</strong>: Whether the filter is required [boolean]</li>
        <li><strong>values</strong>: Array of filter values [Array<{id: string, label: string}>]</li>
        <li><strong>handleViewAll</strong>: Callback for viewing all values [function]</li>
      </ul>
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array<FilterTag>" },
      },
    },
    recentFilters: {
      description: `Array of recent filter objects that define previously used filters.
      <br/>
      <br/>
      <code>
      <ul class="storybook-order-list">
        <li><strong>id</strong>: Unique identifier for the recent filter [string]</li>
        <li><strong>handleRecentFilter</strong>: Callback for selecting a recent filter [function]</li>
        <li><strong>filterSet</strong>: Array of filter groups [Array<{id: string, label: string}>]</li>
      </ul>
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array<RecentFilter>" },
      },
    },
    savedFiltersBadge: {
      description: `Array of saved filter badge objects that define saved filter indicators.
      <br/>
      <br/>
      <code>
      <ul class="storybook-order-list">
        <li><strong>id</strong>: Unique identifier for the badge [string]</li>
        <li><strong>label</strong>: Display label for the badge [string]</li>
      </ul>
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array<SavedFilterBadge>" },
      },
    },
    savedFilterLists: {
      description: `Array of saved filter list objects that define available saved filters.
      <br/>
      <br/>
      <code>
      <ul class="storybook-order-list">
        <li><strong>id</strong>: Unique identifier for the saved filter [string]</li>
        <li><strong>label</strong>: Display label for the saved filter [string]</li>
        <li><strong>value</strong>: Value of the saved filter [string]</li>
      </ul>
      </code>`,
      control: { type: "object" },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array<SavedFilterList>" },
      },
    },
    handleApplyFilter: {
      description:
        "Callback function that is called when the 'Apply Filter' button is clicked in the filter dropdown.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    handleCancelFilter: {
      description:
        "Callback function that is called when the 'Cancel' button is clicked in the filter dropdown.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    filterButtonLabel: {
      description:
        "The label text to display on the filter button. If not provided, the filter button will not be shown.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "All Filters" },
        type: { summary: "string" },
      },
    },
    filterButtonProps: {
      description:
        "Additional props to pass to the filter button component. These can include properties like 'disabled' or other button-specific props.",
      control: { type: "object" },
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    filterButtonClick: {
      description:
        "Callback function that is called when the filter button is clicked.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    handleBadgeChange: {
      description:
        "Callback function that is called when a filter badge is clicked or changed.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "(badge) => {}" },
        type: { summary: "(badge: SavedFilterBadge) => void" },
      },
    },
    hideSelectedFilterBadge: {
      description:
        "If true, the selected filter badge and its dropdown will be hidden.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    savedFilterSelectedBadge: {
      description:
        "The label of the currently selected saved filter badge. This is used to show which saved filter is active.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "string | null" },
      },
    },
    handleSavedRecentFilterDropdown: {
      description:
        "Callback function that is called when the saved/recent filter dropdown is interacted with.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    filterDropDownLabel: {
      description:
        "Custom label for the filter dropdown. If not provided, a default label will be used.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {
    filterButtonClick: fn(),
    setSelectedFilter: fn(),
    handleApplyFilter: fn(),
    handleCancelFilter: fn(),
  },
};

const FiltersStrip = (args) => {
  const [selectedFilter, setSelectedFilter] = useState(args.selectedFilter);
  return (
    <FiltersStripWrapper
      {...args}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
    />
  );
};

export const Default = (args) => <FiltersStrip {...args} />;

Default.args = {
  filterButtonLabel: "All Filters",
  selectedFilter: "Not selected",
  filterTags,
  recentFilters,
  savedFiltersBadge,
  savedFilterLists,
  hideSelectedFilterBadge: false,
};
