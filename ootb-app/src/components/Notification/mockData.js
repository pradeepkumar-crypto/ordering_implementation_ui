export const mockBadgeLists = [
  {
    id: 1,
    value: "task-list",
    lists: [
      {
        id: 1,
        label: "New",
        numberOfTypes: 4,
        handleClick: () => {},
      },
      {
        id: 2,
        label: "Pending",
        numberOfTypes: 4,
        handleClick: () => {},
      },
      {
        id: 3,
        label: "Completed",
        handleClick: () => {},
      },
      {
        id: 4,
        label: "Bookmarked",
        handleClick: () => {},
      },
      {
        id: 5,
        label: "Archived",
        handleClick: () => {},
      },
    ],
  },
  {
    id: 2,
    value: "info-list",
    lists: [
      {
        id: 1,
        label: "Recent",
        numberOfTypes: 4,
        onClick: () => {},
      },
      {
        id: 2,
        label: "Old",
        numberOfTypes: 4,
        onClick: () => {},
      },
      {
        id: 3,
        label: "Archive",
        onClick: () => {},
      },
      {
        id: 4,
        label: "All",
        onClick: () => {},
      },
    ],
  },
];

export const mockNotificationTabs = [
  {
    label: "Task List",
    value: "task-list",
  },
  {
    label: "Info",
    value: "info-list",
  },
];

export const mockNotificationPanels = [
  {
    id: 1,
    value: "task-list",
    handleSettingClick: () => {
      console.log("handleSelect click!");
    },
    notificationList: [
      {
        id: 1,
        selected: true,
        status: "success",
        read: false,
        handleSelectChange: (
          type,
          notificationPanels,
          setNotificationPanels,
          list
        ) => {
          let obj = notificationPanels.map((types) => {
            if (types.value === type) {
              return {
                ...types,
                notificationList: types.notificationList.map((item) => {
                  if (item.id === list.id) {
                    return {
                      ...item,
                      selected: !item.selected,
                    };
                  } else {
                    return item;
                  }
                }),
              };
            }
            return types;
          });

          setNotificationPanels(obj);
        },
        label: "Report 1 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 2,
        selected: false,
        status: "fail",
        read: true,
        handleSelectChange: (
          type,
          notificationPanels,
          setNotificationPanels,
          list
        ) => {
          const obj = notificationPanels.map((types) => {
            if (types.value === type) {
              return {
                ...types,
                notificationList: types.notificationList.map((item) => {
                  if (item.id === list.id) {
                    return {
                      ...item,
                      selected: !item.selected,
                    };
                  } else {
                    return item;
                  }
                }),
              };
            }
            return types;
          });

          setNotificationPanels(obj);
        },
        label: "Report 2 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        // handleMoveToPending: (item) => {
        //   console.log("handleMoveToPending clicked", item);
        // },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 3,
        selected: false,
        status: "pending",
        read: false,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 3 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 4,
        selected: false,
        status: "pending",
        read: false,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 4 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        // handleMarkCompleted: (item) => {
        //   console.log("handleMarkCompleted clicked", item);
        // },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
    ],
  },
  {
    id: 2,
    value: "info-list",
    handleSettingClick: () => {
      console.log("handleSelect click!");
    },
    notificationList: [
      {
        id: 1,
        selected: true,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 1 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 2,
        selected: false,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 2 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        // handleMoveToPending: (item) => {
        //   console.log("handleMoveToPending clicked", item);
        // },
        // handleMarkAsRead: (item) => {
        //   console.log("handleMarkAsRead clicked", item);
        // },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 3,
        selected: false,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 3 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        handleMarkCompleted: (item) => {
          console.log("handleMarkCompleted clicked", item);
        },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
      {
        id: 4,
        selected: false,
        handleSelectChange: (event) => {
          console.log("handleSelectChange clicked", event);
        },
        label: "Report 4 is ready to download",
        date: new Date(),
        time: new Date().getTime(),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        // handleMarkCompleted: (item) => {
        //   console.log("handleMarkCompleted clicked", item);
        // },
        handleMoveToPending: (item) => {
          console.log("handleMoveToPending clicked", item);
        },
        handleMarkAsRead: (item) => {
          console.log("handleMarkAsRead clicked", item);
        },
        handleBookMark: (item) => {
          console.log("handleBookMark clicked", item);
        },
        handleDeleteNotification: (item) => {
          console.log("handleDeleteNotification clicked", item);
        },
        handleDownloadNotification: (item) => {
          console.log("handleDownloadNotification clicked", item);
        },
      },
    ],
  },
];
