# Design System Rules

## Folder Access Rules
- **Read Only Folders in src:**
  - assets/
  - components/
  - stories/
  - styles/

## Layout Guidelines
1. **Content Layout**
   - Main content area should be wrapped in a container with absolute positioning
   - Standard layout properties (NEVER MODIFY THESE PROPERTIES):
     ```css
     position: absolute;
     left: '60px';    /* Sidebar width */
     right: 0;
     top: '56px';     /* Header height */
     bottom: 0;
     overflow: auto;
     padding: 16px;
     ```
   - These properties must remain unchanged as they are critical for proper layout
   - They ensure proper spacing from header and sidebar
   - Padding provides consistent spacing around content
   - Overflow ensures scrollable content when needed
   - **Important**: These properties should NEVER be modified or made conditional, even if the sidebar or header state changes

## Component Usage Guidelines
1. **Component Usage**
   - Always use basic components from the components folder instead of direct HTML components
   - Check components folder first before creating a new component

2. **Component Stories**
   - Refer to stories of a component named `x` with `x.stories.js` in stories folder
   - Use stories to get mock data with `argTypes`

3. **Application Code Location**
   - Only write to routes folder contents
   - The routes folder contains the application code

## Component-Specific Guidelines

### Header Component
- Title must be in capitalized text
- Default props:
  - showNotificationIcon: true
  - notificationIndicator: true
  - isNotificationDnd: false
- Required props:
  - title
  - userName
  - showNotificationIcon
  - notificationIndicator
  - isNotificationDnd
  - showHelpIcon
  - showMessageIcon
  - showChatBotIcon
  - isMessageIconDisabled
  - isChatBotDisabled

### Sidebar Component
- Default props:
  - isOpen: false
  - isCloseWhenClickOutside: true
  - parentActive: "des-dash"
  - childActive: ""
- Required props:
  - isOpen
  - setIsOpen
  - handleClose
  - routes
  - actionRoutes
  - parentActive
  - childActive
  - handleParentRouteChange
  - handleChildRouteChange

### Table Component
- Default props:
  - cardContainer: true
  - rowHeight: "default"
- Required props:
  - tableHeader
  - rowData
  - columnDefs
  - cardContainer
  - rowHeight
- ColumnDefs structure:
  ```javascript
  {
    field: string,
    headerName: string,
    type?: string,
    isSearchable?: boolean
  }
  ```

### FiltersStrip Component
- Default props:
  - filterButtonLabel: "All Filters"
  - selectedFilter: "Not selected"
- Required props:
  - filterButtonLabel
  - filterTags
  - recentFilters
  - savedFilterLists
  - selectedFilter
  - setSelectedFilter
  - filterButtonClick
  - handleApplyFilter
  - handleCancelFilter
  - handleBadgeChange

## Workflow
1. Before creating any new component:
   - First check if a similar component exists in the components folder
   - If a similar component exists, use it instead of creating a new one

2. When needing mock data or component examples:
   - Locate the component's story file in the stories folder
   - Review the component instantiation examples first to understand complete usage
   - Copy the exact instantiation pattern from stories, including all props and their values
   - Use the `argTypes` from the story file for mock data and prop types
   - Refer to story's component instantiation for proper event handling and state management
   - Never modify or skip any props defined in the story instantiation
   - Follow the exact prop structure and types as defined in the story

3. When writing application code:
   - Only modify files in the routes folder
   - Do not modify files in read-only folders (assets, components, stories, styles)
   - Update App.js to include new routes using React Router
   - Ensure all routes include the required Header component with proper props

4. Component Instantiation and State Management:
   - Always review component instantiation examples in story files first
   - Copy the complete instantiation pattern from stories exactly as shown
   - Use **exactly the same state values and initial values** as shown in the story's default args
   - Identify required state variables and their initial values from story examples
   - Implement proper state management using useState or other hooks
   - Follow the component's required props and their types as defined in argTypes
   - Handle component events and callbacks exactly as specified in the story's argTypes
   - Ensure all required props are provided with appropriate data types
   - Use story's instantiation as the exact reference template for implementation
   - Never omit or modify props without explicit permission from the component maintainer
   - Never change state initial values from what's defined in the story's default args

These rules ensure consistent use of the design system and maintain proper separation of concerns in the codebase.