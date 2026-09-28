import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import moment from "moment";
import DateRangePickerInput from "./dateRangePickerInput";
import DateRangePickerDropdown from "./dateRangePickerDropdown";
import "./DateRangePicker.styles.scss";
import {
  rangeSelectorTypes,
  setEndDateOffset,
  setStartDateOffset,
} from "./utils";

export const DateRangePicker = forwardRef(
  (
    {
      label,
      isRequired,
      labelOrientation,
      fullWidth,
      startDate,
      setStartDate,
      startDateInputProps,
      endDate,
      setEndDate,
      endDateInputProps,
      isDisabled,
      isError,
      withPortal,
      handleDatesChange,
      handleFocusChange,
      portalContainer = document.body,
      showWeekNumbers,
      tertiaryButtonProps,
      primaryButtonProps,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      onResetClick,
      showRangeSelector,
      showMonthYearSelect,
      customYears,
      handleStartDateFocus,
      handleEndDateFocus,
      displayFormat = "DD-MM-YYYY",
      customWeekNumberData,
      suppressClickOnWeekNumber = false,
      isAgGridCellRenderer = false,
      minDate,
      maxDate,
      readOnly = false,
      ...args
    },
    ref
  ) => {
    const dateRangePickerMainContainerRef = useRef(null);
    const inputContainerRef = useRef(null);
    const dropDownContainerRef = useRef(null);
    const startDateInputRef = useRef();
    const endDateInputRef = useRef();
    const startDateString = startDate && startDate.format(displayFormat);
    const endDateString = endDate && endDate.format(displayFormat);
    const selectedDaysNumber =
      endDate && startDate ? endDate.diff(startDate, "days") + 1 : 0;
    const [isOpen, setIsOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState("startDate");
    const [selectedRange, setSelectedRange] = useState(
      rangeSelectorTypes[0].id
    );
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const resetClicked = useRef(false);

    const onStartDateFocus = () => {
      if (handleStartDateFocus) {
        handleStartDateFocus(setFocusedInput);
      }
      setFocusedInput("startDate");
      setIsOpen(true);
    };

    const onEndDateFocus = () => {
      if (handleEndDateFocus) {
        handleEndDateFocus(setFocusedInput);
      }
      setFocusedInput("endDate");
      setIsOpen(true);
    };

    const onDatesChange = ({ startDate, endDate }) => {
      if (handleDatesChange) {
        handleDatesChange(startDate, endDate);
      } else {
        setStartDate(startDate);
        setEndDate(endDate);
      }
    };

    const onFocusChange = (focusedInput) => {
      if (handleFocusChange) {
        handleFocusChange(
          focusedInput,
          setFocusedInput,
          startDateInputRef,
          endDateInputRef
        );
        return;
      }
      setFocusedInput(() =>
        focusedInput === null ? "startDate" : focusedInput
      );

      // Add a small delay to ensure the focus is set after the state update
      setTimeout(() => {
        if (focusedInput === null || focusedInput === "startDate") {
          if (startDateInputRef.current) {
            startDateInputRef.current.focus();
            // Set cursor to the first number position
            const position = 0;
            startDateInputRef.current.setSelectionRange(position, position);
          }
        }
        if (focusedInput === "endDate") {
          if (endDateInputRef.current) {
            endDateInputRef.current.focus();
            // Set cursor to the first number position
            const position = 0;
            endDateInputRef.current.setSelectionRange(position, position);
          }
        }
      }, 0);
    };

    const handleRangeSelectorChange = (event) => {
      // console.log(event.target.value);
      setStartDate(startDate);
      setEndDate(endDate);
      setSelectedRange(event.target.value);
      setFocusedInput("startDate");
    };

    const handleClickOutside = (event) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target) &&
        dropDownContainerRef.current &&
        !dropDownContainerRef.current.contains(event.target) &&
        !isAgGridCellRenderer &&
        isOpen
      ) {
        setIsOpen(false);
        // Avoid restoring dates if reset was clicked
        if (!resetClicked.current) {
          setStartDate(tempStartDate);
          setEndDate(tempEndDate);
        }
        resetClicked.current = false;
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen]);

    // button functions
    const handleResetDates = () => {
      resetClicked.current = true;
      if (onResetClick) {
        onResetClick();
      } else {
        setStartDate(null);
        setEndDate(null);
        setTempEndDate(null);
        setTempStartDate(null);
        setFocusedInput("startDate");
      }
    };

    const handleCancelDates = () => {
      if (onSecondaryButtonClick) {
        onSecondaryButtonClick();
      }
      setStartDate(tempStartDate); //initial start-date || null
      setEndDate(tempEndDate); // initial end-date || null
      setFocusedInput("startDate");
      setIsOpen(false);
    };

    const handleApplyDates = () => {
      if (onPrimaryButtonClick) {
        onPrimaryButtonClick();
      }
      setIsOpen(false);
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    };

    const handleStartDateStringChange = (value) => {
      if (value === null) {
        setStartDate(null);
        return;
      }

      if (moment.isMoment(value)) {
        // Validate against min/max dates
        if (minDate && value.isBefore(minDate, "day")) {
          return;
        }
        if (maxDate && value.isAfter(maxDate, "day")) {
          return;
        }
        // Validate against end date
        if (endDate && value.isAfter(endDate, "day")) {
          return;
        }
        setStartDate(value);
        // Update temp date for cancel functionality
        setTempStartDate(value);
      } else {
        // If it's a string, check if it's a complete date
        const parsedDate = moment(value, displayFormat, true);
        if (parsedDate.isValid()) {
          // Validate against min/max dates
          if (minDate && parsedDate.isBefore(minDate, "day")) {
            return;
          }
          if (maxDate && parsedDate.isAfter(maxDate, "day")) {
            return;
          }
          // Validate against end date
          if (endDate && parsedDate.isAfter(endDate, "day")) {
            return;
          }
          setStartDate(parsedDate);
          // Update temp date for cancel functionality
          setTempStartDate(parsedDate);
        }
      }
    };

    const handleEndDateStringChange = (value) => {
      if (value === null) {
        setEndDate(null);
        return;
      }

      if (moment.isMoment(value)) {
        // Validate against min/max dates
        if (minDate && value.isBefore(minDate, "day")) {
          return;
        }
        if (maxDate && value.isAfter(maxDate, "day")) {
          return;
        }
        // Validate against start date
        if (startDate && value.isBefore(startDate, "day")) {
          return;
        }
        setEndDate(value);
        // Update temp date for cancel functionality
        setTempEndDate(value);
      } else {
        // If it's a string, check if it's a complete date
        const parsedDate = moment(value, displayFormat, true);
        if (parsedDate.isValid()) {
          // Validate against min/max dates
          if (minDate && parsedDate.isBefore(minDate, "day")) {
            return;
          }
          if (maxDate && parsedDate.isAfter(maxDate, "day")) {
            return;
          }
          // Validate against start date
          if (startDate && parsedDate.isBefore(startDate, "day")) {
            return;
          }
          setEndDate(parsedDate);
          // Update temp date for cancel functionality
          setTempEndDate(parsedDate);
        }
      }
    };

    return (
      <div
        className={`impact-dateRangePicker-main-container ${
          labelOrientation === "left" ? "label-flex-row" : "label-flex-column"
        } ${
          fullWidth ? "impact-dateRangePicker-full-width-main-container" : ""
        }`}
      >
        {label && (
          <div className="dateRangePicker-label">
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </div>
        )}
        <div
          className="dateRangePicker-container"
          ref={dateRangePickerMainContainerRef}
        >
          <DateRangePickerInput
            inputContainerRef={inputContainerRef}
            startDateString={startDateString}
            onStartDateFocus={onStartDateFocus}
            startDateInputRef={startDateInputRef}
            startDateInputProps={startDateInputProps}
            endDateString={endDateString}
            onEndDateFocus={onEndDateFocus}
            endDateInputRef={endDateInputRef}
            endDateInputProps={endDateInputProps}
            isDisabled={isDisabled}
            isError={isError}
            displayFormat={displayFormat}
            onStartDateStringChange={handleStartDateStringChange}
            onEndDateStringChange={handleEndDateStringChange}
            minDate={minDate}
            maxDate={maxDate}
            readOnly={readOnly}
          />
          {isOpen && (
            <DateRangePickerDropdown
              {...args}
              dropDownContainerRef={dropDownContainerRef}
              withPortal={withPortal}
              portalContainer={portalContainer}
              focusedInput={focusedInput}
              containerRef={dateRangePickerMainContainerRef}
              onDatesChange={onDatesChange}
              onFocusChange={onFocusChange}
              startDate={startDate}
              endDate={endDate}
              showWeekNumbers={showWeekNumbers}
              selectedRange={selectedRange}
              setStartDateOffset={setStartDateOffset}
              setEndDateOffset={setEndDateOffset}
              selectedDaysNumber={selectedDaysNumber}
              handleResetDates={handleResetDates}
              handleCancelDates={handleCancelDates}
              onSecondaryButtonClick={onSecondaryButtonClick}
              tertiaryButtonProps={tertiaryButtonProps}
              handleApplyDates={handleApplyDates}
              primaryButtonProps={primaryButtonProps}
              showRangeSelector={showRangeSelector}
              handleRangeSelectorChange={handleRangeSelectorChange}
              showMonthYearSelect={showMonthYearSelect}
              customYears={customYears}
              customWeekNumberData={customWeekNumberData}
              suppressClickOnWeekNumber={suppressClickOnWeekNumber}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>
    );
  }
);
