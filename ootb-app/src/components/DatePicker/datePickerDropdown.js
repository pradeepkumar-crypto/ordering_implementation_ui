import React, { useState, useLayoutEffect } from "react";
import { DayPickerSingleDateController } from "react-dates";
import DatePickerFooter from "./datePickerFooter";
import ShowMonthYearSelect from "./showMonthYearSelect";
import moment from "moment";
import Portal from "../Portal";

export default function DatePickerDropdown({
  datePickerMainContainer,
  onDatesChange,
  focused,
  setFocused,
  selectedDate,
  setSelectedDate,
  showWeekNumbers,
  setIsOpen,
  withPortal,
  portalContainer,
  containerRef,
  showMonthYearSelect,
  customYears,
  tertiaryButtonProps,
  primaryButtonProps,
  onTertiaryButtonClick,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  minDate,
  maxDate,
  ...args
}) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const {
        x,
        y,
        height: offsetHeight,
        width: offsetWidth,
      } = containerRef.current.getBoundingClientRect();
      setPosition({ x, y: y + scrollY, offsetHeight, offsetWidth });
    }
  }, [containerRef.current]);

  const handleDateChange = (date) => {
    if (date) {
      const newDate = moment(date);
      onDatesChange(newDate);
    } else {
      onDatesChange(null);
    }
  };

  const renderDayContents = React.useCallback((momentInstance, modifiers) => {
    // Calculate the week number within the month
    const startOfMonth = momentInstance.clone().startOf("month");
    const weekNumber = Math.ceil(
      (momentInstance.date() - 1 + startOfMonth.day()) / 7
    );

    return (
      <>
        {/* Add week numbers, adds one button each row */}
        {showWeekNumbers && modifiers.has("first-day-of-week") && (
          <span className="CalendarDayWeekNumber">W{weekNumber + 1}</span>
        )}
        <span className="CalendarDayNumber">{momentInstance.format("D")}</span>
      </>
    );
  }, []);

  const renderCalendar = () => {
    const currentDate = selectedDate ? moment(selectedDate) : null;
    return (
      <DayPickerSingleDateController
        key={`calendar-${
          currentDate ? currentDate.format("YYYY-MM-DD") : "no-date"
        }`}
        onDateChange={handleDateChange}
        onFocusChange={() => setFocused(true)}
        focused={focused}
        date={currentDate}
        initialMonth={currentDate || moment()}
        hideKeyboardShortcutsPanel={true}
        daySize={26}
        horizontalMonthPadding={showWeekNumbers ? 24 : 12}
        renderDayContents={showWeekNumbers ? renderDayContents : undefined}
        renderMonthElement={
          showMonthYearSelect
            ? ({ month, onMonthSelect, onYearSelect }) => (
                <ShowMonthYearSelect
                  customYears={customYears}
                  month={month}
                  onMonthSelect={onMonthSelect}
                  onYearSelect={onYearSelect}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              )
            : undefined
        }
        {...args}
      />
    );
  };

  if (withPortal) {
    return (
      <Portal container={portalContainer}>
        <div
          className="impact-portal-container"
          style={{
            top: position.y,
            left: position.x,
            width: position.offsetWidth || 0 + "px",
          }}
        >
          <div
            className={`impact-date-picker-dropdown-container ${
              showWeekNumbers ? "showWeekNumbers" : ""
            }`}
          >
            {renderCalendar()}
            <DatePickerFooter
              tertiaryButtonProps={tertiaryButtonProps}
              primaryButtonProps={primaryButtonProps}
              setSelectedDate={setSelectedDate}
              setFocused={setFocused}
              onSecondaryButtonClick={onSecondaryButtonClick}
              onPrimaryButtonClick={onPrimaryButtonClick}
              onTertiaryButtonClick={onTertiaryButtonClick}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
        <div
          className="ia-select-container-v3-blanket"
          onClick={() => setIsOpen(false)}
        />
      </Portal>
    );
  }

  return (
    <div
      className={`impact-date-picker-dropdown-container ${
        showWeekNumbers ? "showWeekNumbers" : ""
      }`}
    >
      {renderCalendar()}
      <DatePickerFooter
        tertiaryButtonProps={tertiaryButtonProps}
        primaryButtonProps={primaryButtonProps}
        setSelectedDate={setSelectedDate}
        setFocused={setFocused}
        onTertiaryButtonClick={onTertiaryButtonClick}
        onSecondaryButtonClick={onSecondaryButtonClick}
        onPrimaryButtonClick={onPrimaryButtonClick}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
