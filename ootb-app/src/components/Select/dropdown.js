import React, { useState, useLayoutEffect } from "react";
import Portal from "../Portal";

export default function Dropdown({
  children,
  dropDownPortalClassName,
  isOpen,
  target,
  onClose,
  disabled,
  containerRef,
  withPortal,
  portalContainer,
  dropdownButtonRef,
}) {
  // const x = containerRef.current?.getBoundingClientRect().x;
  // const y = containerRef.current?.getBoundingClientRect().y;
  // const offsetHeight = containerRef.current?.offsetHeight;

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  const updatePosition = () => {
    if (containerRef.current) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const {
        x,
        y,
        height: offsetHeight,
        width: offsetWidth,
      } = containerRef.current.getBoundingClientRect();

      setPosition({
        x: x + scrollX,
        y: y + scrollY,
        offsetHeight,
        offsetWidth,
      });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [containerRef.current, isOpen]);

  return (
    <div className="ia-select-container-v3">
      {target}
      {!disabled && isOpen ? (
        <>
          {withPortal ? (
            <Portal container={portalContainer}>
              <div
                className={`ia-select-container-v3-styled-menu ${dropDownPortalClassName}`}
                style={{
                  top: position.y + position.offsetHeight - 4,
                  left: position.x,
                  width: dropdownButtonRef.current?.offsetWidth || 0 + "px",
                  minWidth: dropdownButtonRef.current?.offsetWidth || 0 + "px",
                }}
              >
                {children}
              </div>
              <div
                className="ia-select-container-v3-blanket"
                onClick={onClose}
              />
            </Portal>
          ) : (
            <>
              <div
                className="ia-select-container-v3-styled-menu"
                style={{
                  width: dropdownButtonRef.current?.offsetWidth || 0 + "px",
                  minWidth: dropdownButtonRef.current?.offsetWidth || 0 + "px",
                }}
              >
                {children}
              </div>
              <div
                className="ia-select-container-v3-blanket"
                onClick={onClose}
              />
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
