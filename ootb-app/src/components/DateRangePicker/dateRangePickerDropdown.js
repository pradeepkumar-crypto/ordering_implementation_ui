import React, { useState, useLayoutEffect } from "react";
import { DayPickerRangeController } from "react-dates";
import ShowMonthYearSelect from "./showMonthYearSelect";
import DateRangePickerFooter from "./dateRangePickerFooter";
import DateRangePickerCustom from "./dateRangePickerCustom";
import { calculatePosition, formatMomentDate } from "./utils";
import moment from "moment";
import Portal from "../Portal";

export default function DateRangePickerDropdown({
  dropDownContainerRef,
  withPortal,
  portalContainer,
  containerRef,
  onDatesChange,
  onFocusChange,
  focusedInput,
  startDate,
  endDate,
  showWeekNumbers,
  selectedRange,
  setStartDateOffset,
  setEndDateOffset,
  selectedDaysNumber,
  handleResetDates,
  handleCancelDates,
  onSecondaryButtonClick,
  tertiaryButtonProps,
  handleApplyDates,
  primaryButtonProps,
  showRangeSelector,
  handleRangeSelectorChange,
  showMonthYearSelect,
  customYears,
  customWeekNumberData,
  suppressClickOnWeekNumber,
  setIsOpen,
  ...args
}) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    offsetHeight: 0,
    offsetWidth: 0,
  });

  useLayoutEffect(() => {
    if (containerRef.current && dropDownContainerRef.current) {
      calculatePosition({
        containerRef,
        dropDownContainerRef,
        position,
        setPosition,
      });
    }
    return () => {
      calculatePosition({
        containerRef,
        dropDownContainerRef,
        position,
        setPosition,
      });
    };
  }, []); //containerRef.current, dropDownContainerRef.current

  const renderDayContents = React.useCallback((momentInstance, modifiers) => {
    let currentWeek = null;
    let currentWeekNumber = null;

    if (customWeekNumberData) {
      if (modifiers.has("first-day-of-week")) {
        currentWeek = customWeekNumberData.find((weekNumberData) => {
          return (
            weekNumberData?.calendar_week_start_date ===
            formatMomentDate(momentInstance)
          );
        });
      }
    } else {
      // Calculate the week number within the month
      const startOfMonth = momentInstance.clone().startOf("month");
      const weekNumber = Math.ceil(
        (momentInstance.date() - 1 + startOfMonth.day()) / 7
      );
      currentWeekNumber = weekNumber;
    }

    return (
      <>
        {/* Add week numbers, adds one button each row */}
        {showWeekNumbers && modifiers.has("first-day-of-week") && (
          <span
            className={`CalendarDayWeekNumber ${
              suppressClickOnWeekNumber ? "suppress-click-on-week-number" : ""
            }`}
          >
            W
            {customWeekNumberData
              ? currentWeek?.calendar_year_week
              : currentWeekNumber + 1}
          </span>
        )}
        <span className="CalendarDayNumber">{momentInstance.format("D")}</span>
      </>
    );
  }, []);

  if (withPortal) {
    return (
      <Portal container={portalContainer}>
        <div
          className="impact-portal-container"
          style={{
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            right: position.right,
            width: position.offsetWidth || 0 + "px",
          }}
        >
          <div
            className={`impact-dateRangePicker-dropdown-container ${
              showRangeSelector ? "showRangeSelector" : ""
            }`}
            ref={dropDownContainerRef}
          >
            <div
              className={`dateRangePicker-left-container ${
                showWeekNumbers ? "showWeekNumbers" : ""
              }`}
            >
              <DayPickerRangeController
                key="date-range-picker-controller"
                {...args}
                onDatesChange={(arg) => {
                  if (
                    focusedInput === "endDate" &&
                    arg.endDate &&
                    startDate &&
                    arg.endDate.isBefore(startDate)
                  ) {
                    onDatesChange({
                      startDate: arg.endDate,
                      endDate: null,
                    });
                  } else {
                    onDatesChange(arg);
                  }
                }}
                onFocusChange={onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
                hideKeyboardShortcutsPanel={true}
                daySize={26}
                horizontalMonthPadding={showWeekNumbers ? 16 : 12}
                startDateOffset={
                  selectedRange === "custom" ? undefined : setStartDateOffset
                }
                endDateOffset={
                  selectedRange === "custom" ? undefined : setEndDateOffset
                }
                renderDayContents={showWeekNumbers ? renderDayContents : null}
                renderMonthElement={
                  showMonthYearSelect
                    ? ({ month, onMonthSelect, onYearSelect }) => (
                        <ShowMonthYearSelect
                          customYears={customYears}
                          month={month}
                          onMonthSelect={onMonthSelect}
                          onYearSelect={onYearSelect}
                        />
                      )
                    : null
                }
                numberOfMonths={2}
                initialVisibleMonth={() => {
                  if (startDate) return startDate;
                  if (endDate) return endDate;
                  return moment();
                }}
                minimumNights={-1}
              />
              <DateRangePickerFooter
                selectedDaysNumber={selectedDaysNumber}
                handleResetDates={handleResetDates}
                handleCancelDates={handleCancelDates}
                onSecondaryButtonClick={onSecondaryButtonClick}
                tertiaryButtonProps={tertiaryButtonProps}
                handleApplyDates={handleApplyDates}
                primaryButtonProps={primaryButtonProps}
              />
            </div>
            <div className="dateRangePicker-right-container">
              {showRangeSelector ? (
                <DateRangePickerCustom
                  rangeSelectorTypes={rangeSelectorTypes}
                  handleRangeSelectorChange={handleRangeSelectorChange}
                  selectedRange={selectedRange}
                />
              ) : null}
            </div>
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
      className={`impact-dateRangePicker-dropdown-container ${
        showRangeSelector ? "showRangeSelector" : ""
      }`}
      ref={dropDownContainerRef}
    >
      <div
        className={`dateRangePicker-left-container ${
          showWeekNumbers ? "showWeekNumbers" : ""
        }`}
      >
        <DayPickerRangeController
          key="date-range-picker-controller"
          {...args}
          onDatesChange={(arg) => {
            if (
              focusedInput === "endDate" &&
              arg.endDate &&
              startDate &&
              arg.endDate.isBefore(startDate)
            ) {
              onDatesChange({
                startDate: arg.endDate,
                endDate: null,
              });
            } else {
              onDatesChange(arg);
            }
          }}
          onFocusChange={onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          hideKeyboardShortcutsPanel={true}
          daySize={26}
          horizontalMonthPadding={showWeekNumbers ? 16 : 12}
          startDateOffset={
            selectedRange === "custom"
              ? undefined
              : (day) => setStartDateOffset(selectedRange, day)
          }
          endDateOffset={
            selectedRange === "custom"
              ? undefined
              : (day) => setEndDateOffset(selectedRange, day)
          }
          renderDayContents={showWeekNumbers ? renderDayContents : null}
          renderMonthElement={
            showMonthYearSelect
              ? ({ month, onMonthSelect, onYearSelect }) => (
                  <ShowMonthYearSelect
                    customYears={customYears}
                    month={month}
                    onMonthSelect={onMonthSelect}
                    onYearSelect={onYearSelect}
                  />
                )
              : null
          }
          numberOfMonths={2}
          initialVisibleMonth={() => {
            if (startDate) return startDate;
            if (endDate) return endDate;
            return moment();
          }}
          minimumNights={-1}
        />
        <DateRangePickerFooter
          selectedDaysNumber={selectedDaysNumber}
          handleResetDates={handleResetDates}
          handleCancelDates={handleCancelDates}
          onSecondaryButtonClick={onSecondaryButtonClick}
          tertiaryButtonProps={tertiaryButtonProps}
          handleApplyDates={handleApplyDates}
          primaryButtonProps={primaryButtonProps}
        />
      </div>

      {showRangeSelector ? (
        <DateRangePickerCustom
          handleRangeSelectorChange={handleRangeSelectorChange}
          selectedRange={selectedRange}
        />
      ) : null}
    </div>
  );
}
