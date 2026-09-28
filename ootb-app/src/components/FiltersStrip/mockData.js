export const filterTags = [
  {
    id: 1,
    label: "TimeLine",
    required: true,
    handleViewAll: (tag) => console.log("Selected Tag:", tag),
    values: [
      {
        id: 1,
        label: "LW",
        //onClick
      },
      {
        id: 1,
        label: "Department 2",
      },
      {
        id: 1,
        label: "Department 3",
      },
      {
        id: 1,
        label: "Department 4",
      },
      {
        id: 1,
        label: "Department 5",
      },
      {
        id: 1,
        label: "Department 6",
      },
      {
        id: 1,
        label: "Department 7",
      },
    ],
  },
  {
    id: 2,
    label: "Compared to",
    required: true,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "Plan",
      },
    ],
  },
  {
    id: 3,
    label: "Channel",
    required: false,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "E-comm",
      },
    ],
  },
  {
    id: 4,
    label: "Department",
    required: false,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "Department 1",
      },
      {
        id: 1,
        label: "Department 2",
      },
    ],
  },
  {
    id: 5,
    label: "Division",
    required: false,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "Division 1",
      },
      {
        id: 1,
        label: "Division 2",
      },
    ],
  },
  {
    id: 6,
    label: "Department",
    required: false,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "Department 1",
      },
      {
        id: 1,
        label: "Department 2",
      },
    ],
  },
  {
    id: 7,
    label: "Division",
    required: false,
    handleViewAll: () => {},
    values: [
      {
        id: 1,
        label: "Division 1",
      },
      {
        id: 1,
        label: "Division 2",
      },
    ],
  },
];

export const recentFilters = [
  {
    id: 1,
    handleRecentFilter: (filter) => console.log("Recent filter set:", filter),
    filterSet: [
      {
        id: 1,
        label: "Filter label_01",
      },
      {
        id: 2,
        label: "Filter label_02",
      },
      {
        id: 3,
        label: "Filter label_03",
      },
    ],
  },
  {
    id: 2,
    handleRecentFilter: (filter) => console.log("Recent filter set:", filter),
    filterSet: [
      {
        id: 1,
        label: "Filter label_01",
      },
      {
        id: 2,
        label: "Filter label_02",
      },
      {
        id: 3,
        label: "Filter label_03",
      },
    ],
  },
];

export const savedFiltersBadge = [
  {
    id: 1,
    label: "All",
    handleClick: () => {},
  },
  {
    id: 2,
    label: "Global",
    handleClick: () => {},
  },
  {
    id: 1,
    label: "Personal",
    handleClick: () => {},
  },
];

export const savedFilterLists = [
  {
    id: 1,
    label: "Saved Filter_01",
    value: "filter_01",
  },
  {
    id: 2,
    label: "Saved Filter_02",
    value: "filter_02",
  },
  {
    id: 3,
    label: "Saved Filter_03",
    value: "filter_03",
  },
  {
    id: 4,
    label: "Saved Filter_04",
    value: "filter_04",
  },
  {
    id: 5,
    label: "Saved Filter_05",
    value: "filter_05",
  },
  {
    id: 6,
    label: "Saved Filter_06",
    value: "filter_06",
  },
  {
    id: 7,
    label: "Saved Filter_07",
    value: "filter_07",
  },
  {
    id: 8,
    label: "Saved Filter_08",
    value: "filter_08",
  },
];
