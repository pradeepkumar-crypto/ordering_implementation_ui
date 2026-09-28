import Menu from "@mui/material/Menu";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { IconMenuItem } from "./IconMenuItem";
import "./Menu.styles.scss";

const NestedMenuItem = forwardRef(function NestedMenuItem(props, ref) {
  const {
    parentMenuOpen,
    label,
    renderLabel,
    icon,
    children,
    className,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    MenuProps,
    delay = 0,
    item,
    ...MenuItemProps
  } = props;

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = useRef(null);
  useImperativeHandle(ref, () => menuItemRef.current || null);

  const containerRef = useRef(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = useRef(null);

  const timeoutRef = useRef(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = (e) => {
    timeoutRef.current = setTimeout(() => {
      if (!props.disabled) {
        setIsSubMenuOpen(true);
      }

      if (ContainerProps.onMouseEnter) {
        ContainerProps.onMouseEnter(e);
      }
    }, delay);
  };

  const handleMouseLeave = (e) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);

    setIsSubMenuOpen(false);

    if (ContainerProps.onMouseLeave) {
      ContainerProps.onMouseLeave(e);
    }
  };

  // Check if any immediate children are active
  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument.activeElement ?? null;
    if (menuContainerRef.current == null) {
      return false;
    }
    for (const child of menuContainerRef.current.children) {
      if (child === active) {
        return true;
      }
    }

    return false;
  };

  const handleFocus = (e) => {
    if (e.target === containerRef.current && !props.disabled) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps.onFocus) {
      ContainerProps.onFocus(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      return;
    }

    if (isSubmenuFocused()) {
      e.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument.activeElement;

    if (e.key === "ArrowLeft" && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      e.target === containerRef.current &&
      e.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0];
      if (firstChild instanceof HTMLDivElement) {
        firstChild.focus();
      }
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  // Root element must have a `tabIndex` attribute for keyboard navigation
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <IconMenuItem
        MenuItemProps={MenuItemProps}
        className={className}
        ref={menuItemRef}
        icon={item?.icon}
        label={item?.label}
        item={item}
        renderLabel={renderLabel}
        children={children}
        childOpen={open}
      />

      <Menu
        // Set pointer events to 'none' to prevent the invisible Popover div
        // from capturing events for clicks and hovers
        {...props}
        style={{ pointerEvents: "none", marginLeft: "12px" }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        open={open}
        autoFocus={false}
        disableAutoFocus
        disableEnforceFocus
        onClose={() => {
          setIsSubMenuOpen(false);
        }}
        id="basic-menu"
        className="ia-styles ia-menu"
        {...MenuProps}
      >
        <div
          ref={menuContainerRef}
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {children}
        </div>
      </Menu>
    </div>
  );
});

NestedMenuItem.displayName = "NestedMenuItem";
export { NestedMenuItem };
