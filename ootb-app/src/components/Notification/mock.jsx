import { useState } from "react";
import { FiltersStrip } from "../FiltersStrip";
import { Input } from "../Input";
import {Search} from "@mui/icons-material";
import { Button } from "../Button";
const MockNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Notification
        anchor="right"
        badgesList={[
          {
            id: 1,
            lists: [
              {
                handleClick: () => {},
                id: 1,
                label: 'New',
                numberOfTypes: 4
              },
              {
                handleClick: () => {},
                id: 2,
                label: 'Pending',
                numberOfTypes: 4
              },
              {
                handleClick: () => {},
                id: 3,
                label: 'Completed'
              },
              {
                handleClick: () => {},
                id: 4,
                label: 'Bookmarked'
              },
              {
                handleClick: () => {},
                id: 5,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 6,
                label: 'Archived1'
              },
              {
                handleClick: () => {},
                id: 7,
                label: 'Archived2'
              },
              {
                handleClick: () => {},
                id: 8,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 9,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 10,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 11,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 12,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 13,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 14,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 15,
                label: 'Archived'
              },
              {
                handleClick: () => {},
                id: 16,
                label: 'Archived'
              },
            ],
            value: 'task-list'
          },
          {
            id: 2,
            lists: [
              {
                id: 1,
                label: 'Recent',
                numberOfTypes: 4,
                onClick: () => {}
              },
              {
                id: 2,
                label: 'Old',
                numberOfTypes: 4,
                onClick: () => {}
              },
              {
                id: 3,
                label: 'Archive',
                onClick: () => {}
              },
              {
                id: 4,
                label: 'All',
                onClick: () => {}
              }
            ],
            value: 'info-list'
          }
        ]}
        handleClose={setIsOpen}
        handleMarkReadAll={() => {}}
        handleMoveAllPending={() => {}}
        handleNotificationDeleteAll={() => {}}
        handleSelectAll={() => {}}
        notificationPanels={[
          {
            handleSettingClick: () => {},
            id: 1,
            notificationList: [
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMarkCompleted: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 1,
                label: 'Report 1 is ready to download Report 1 is ready to download',
                read: false,
                selected: true,
                status: 'success',
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMarkCompleted: () => {},
                handleSelectChange: () => {},
                id: 2,
                label: 'Report 2 is ready to download',
                read: true,
                selected: false,
                status: 'fail',
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMarkCompleted: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 3,
                label: 'Report 3 is ready to download',
                read: false,
                selected: false,
                status: 'pending',
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 4,
                label: 'Report 4 is ready to download',
                read: false,
                selected: false,
                status: 'pending',
                time: 1740566209148
              }
            ],
            value: 'task-list'
          },
          {
            handleSettingClick: () => {},
            id: 2,
            notificationList: [
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMarkCompleted: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 1,
                label: 'Report 1 is ready to download',
                selected: true,
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkCompleted: () => {},
                handleSelectChange: () => {},
                id: 2,
                label: 'Report 2 is ready to download',
                selected: false,
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMarkCompleted: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 3,
                label: 'Report 3 is ready to download',
                selected: false,
                time: 1740566209148
              },
              {
                date: new Date('2025-02-26T10:36:49.148Z'),
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                handleBookMark: () => {},
                handleDeleteNotification: () => {},
                handleDownloadNotification: () => {},
                handleMarkAsRead: () => {},
                handleMoveToPending: () => {},
                handleSelectChange: () => {},
                id: 4,
                label: 'Report 4 is ready to download',
                selected: false,
                time: 1740566209148
              }
            ],
            value: 'info-list'
          }
        ]}
        notificationTabs={[
          {
            label: 'Task List',
            value: 'task-list'
          },
          {
            label: 'Info',
            value: 'info-list'
          }
        ]}
        isOpen={isOpen}
        onPrimaryButtonClick={() => {}}
        onSecondaryButtonClick={() => {}}
        onSettingButtonClick={() => {}}
        primaryButtonLabel="Save"
        secondaryButtonLabel="Clear all"
        setIsOpen={setIsOpen}
        setNotificationPanels={() => {}}
        title="Notification"
        moveToPendingDropdownOptions={[
          { label: "Pending1", value: "pending1" },
          { label: "Pending2", value: "pending2" },
          { label: "Pending3", value: "pending3" },
          { label: "Pending4", value: "pending4" },
        ]}
      />
      <FiltersStrip
        filterButtonClick={() => {}}
        filterButtonLabel="All Filters"
        filterTags={[
          {
            handleViewAll: () => {},
            id: 1,
            label: 'TimeLine',
            required: true,
            values: [
              {
                id: 1,
                label: 'LW'
              },
              {
                id: 1,
                label: 'Department 2'
              },
              {
                id: 1,
                label: 'Department 3'
              },
              {
                id: 1,
                label: 'Department 4'
              },
              {
                id: 1,
                label: 'Department 5'
              },
              {
                id: 1,
                label: 'Department 6'
              },
              {
                id: 1,
                label: 'Department 7'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 2,
            label: 'Compared to',
            required: true,
            values: [
              {
                id: 1,
                label: 'Plan'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 3,
            label: 'Channel',
            required: false,
            values: [
              {
                id: 1,
                label: 'E-comm'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 4,
            label: 'Department',
            required: false,
            values: [
              {
                id: 1,
                label: 'Department 1'
              },
              {
                id: 1,
                label: 'Department 2'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 5,
            label: 'Division',
            required: false,
            values: [
              {
                id: 1,
                label: 'Division 1'
              },
              {
                id: 1,
                label: 'Division 2'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 6,
            label: 'Department',
            required: false,
            values: [
              {
                id: 1,
                label: 'Department 1'
              },
              {
                id: 1,
                label: 'Department 2'
              }
            ]
          },
          {
            handleViewAll: () => {},
            id: 7,
            label: 'Division',
            required: false,
            values: [
              {
                id: 1,
                label: 'Division 1'
              },
              {
                id: 1,
                label: 'Division 2'
              }
            ]
          }
        ]}
        handleApplyFilter={() => {}}
        handleCancelFilter={() => {}}
        recentFilters={[
          {
            filterSet: [
              {
                id: 1,
                label: 'Filter label_01'
              },
              {
                id: 2,
                label: 'Filter label_02'
              },
              {
                id: 3,
                label: 'Filter label_03'
              }
            ],
            handleRecentFilter: () => {},
            id: 1
          },
          {
            filterSet: [
              {
                id: 1,
                label: 'Filter label_01'
              },
              {
                id: 2,
                label: 'Filter label_02'
              },
              {
                id: 3,
                label: 'Filter label_03'
              }
            ],
            handleRecentFilter: () => {},
            id: 2
          }
        ]}
        savedFilterLists={[
          {
            id: 1,
            label: 'Saved Filter_01',
            value: 'filter_01'
          },
          {
            id: 2,
            label: 'Saved Filter_02',
            value: 'filter_02'
          },
          {
            id: 3,
            label: 'Saved Filter_03',
            value: 'filter_03'
          },
          {
            id: 4,
            label: 'Saved Filter_04',
            value: 'filter_04'
          },
          {
            id: 5,
            label: 'Saved Filter_05',
            value: 'filter_05'
          },
          {
            id: 6,
            label: 'Saved Filter_06',
            value: 'filter_06'
          },
          {
            id: 7,
            label: 'Saved Filter_07',
            value: 'filter_07'
          },
          {
            id: 8,
            label: 'Saved Filter_08',
            value: 'filter_08'
          }
        ]}
        savedFiltersBadge={[
          {
            handleClick: () => {},
            id: 1,
            label: 'All'
          },
          {
            handleClick: () => {},
            id: 2,
            label: 'Global'
          },
          {
            handleClick: () => {},
            id: 1,
            label: 'Personal'
          }
        ]}
      />
      <Input
        label="Input"
        type="number"
        placeholder="Enter a number"
        value="1"
        leftIcon={<Search />}
        rightIcon={<Search />}
      />
      <Button onClick={setIsOpen}>
        Open Notification
      </Button>
    </div>
  )
}

export default MockNotification;