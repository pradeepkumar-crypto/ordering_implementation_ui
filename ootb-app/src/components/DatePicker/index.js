import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import DatePickerInput from "./datePickerInput";
import DatePickerDropdown from "./datePickerDropdown";
import "./DatePicker.styles.scss";
import moment from "moment";

export const DatePicker = forwardRef(
  (
    {
      fullWidth,
      label,
      isRequired,
      labelOrientation,
      showRangeSelector,
      isError,
      isDisabled,
      showInputs,
      closeOnDateSelect,
      placeholder,
      initialDate,
      inputProps,
      selectedDate,
      setSelectedDate,
      handleDateChange,
      //showOnlyCalender,
      showWeekNumbers,
      primaryButtonProps,
      secondaryButtonProps,
      tertiaryButtonProps,
      onPrimaryButtonClick,
      onSecondaryButtonClick,
      onTertiaryButtonClick,
      withPortal,
      portalContainer = document.body,
      showMonthYearSelect,
      customYears,
      displayFormat = "DD-MM-YYYY",
      minDate,
      maxDate,
      onClickOutside,
      isOutsideRange,
      isAgGridCellRenderer = false,
      ...args
    },
    ref,
  ) => {
    const dateString = selectedDate && selectedDate.format(displayFormat);
    const datePickerMainContainerRef = useRef(null);
    const inputContainerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(dateString || "");
    const [cancelTrigger, setCancelTrigger] = useState(0);

    useEffect(() => {
      setInputValue(dateString || "");
    }, [dateString]);

    const handleDateStringChange = (value) => {
      if (value === null) {
        setSelectedDate(null);
        setInputValue("");
        return;
      }

      if (moment.isMoment(value)) {
        // Validate against min/max dates
        if (minDate && value.isBefore(minDate, "day")) {
          setInputValue(value.format(displayFormat));
          setSelectedDate(null);
          return;
        }
        if (maxDate && value.isAfter(maxDate, "day")) {
          setInputValue(value.format(displayFormat));
          setSelectedDate(null);
          return;
        }
        setSelectedDate(value);
        setInputValue(value.format(displayFormat));
      } else {
        // If it's a string, check if it's a complete date
        const parsedDate = moment(value, displayFormat, true);
        if (parsedDate.isValid()) {
          // Validate against min/max dates
          if (minDate && parsedDate.isBefore(minDate, "day")) {
            setInputValue(value);
            setSelectedDate(null);
            return;
          }
          if (maxDate && parsedDate.isAfter(maxDate, "day")) {
            setInputValue(value);
            setSelectedDate(null);
            return;
          }
          setSelectedDate(parsedDate);
        }
        setInputValue(value);
      }
    };

    const handleClear = () => {
      setSelectedDate(null);
      setInputValue("");
      setCancelTrigger((prev) => prev + 1);
      onTertiaryButtonClick?.();
      // Force a re-render of the calendar by updating focused state
      setFocused(false);
      setTimeout(() => setFocused(true), 0);
    };

    const handleCancel = () => {
      setSelectedDate(null);
      setInputValue("");
      setIsOpen(false);
      onSecondaryButtonClick?.();
    };

    const handleClickOutside = (event) => {
      if (
        datePickerMainContainerRef.current &&
        !datePickerMainContainerRef.current.contains(event.target) &&
        !event.target.closest(".datePicker-buttons-container") &&
        !isAgGridCellRenderer &&
        isOpen
      ) {
        onClickOutside?.();
        setIsOpen(false);
      }
    };

    useEffect(() => {
      setFocused(isOpen);
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen]);

    const onDatesChange = (date) => {
      if (handleDateChange) {
        handleDateChange(date);
      } else {
        setSelectedDate(date);
      }
      closeOnDateSelect && setIsOpen(false);
    };

    // Compute error state if selectedDate is out of range
    const computedIsError = useMemo(
      () =>
        Boolean(isError || (selectedDate && isOutsideRange?.(selectedDate))),
      [isError, selectedDate],
    );

    return (
      <div
        className={`impact-datepicker-main-container ${
          labelOrientation === "left" ? "label-flex-row" : "label-flex-column"
        } ${fullWidth ? "impact-datepicker-full-width-main-container" : ""}`}
      >
        {label && (
          <div className="datePicker-label">
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </div>
        )}
        <div className="datePicker-container" ref={datePickerMainContainerRef}>
          <DatePickerInput
            readOnly={args?.readOnly}
            dateString={inputValue}
            placeholder={placeholder}
            isError={computedIsError}
            isDisabled={isDisabled}
            inputContainerRef={inputContainerRef}
            selectedDate={selectedDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            ref={ref}
            inputProps={inputProps}
            displayFormat={displayFormat}
            onDateStringChange={handleDateStringChange}
            minDate={minDate}
            maxDate={maxDate}
            onCancel={cancelTrigger}
          />
          {isOpen && (
            <DatePickerDropdown
              {...args}
              onDatesChange={onDatesChange}
              focused={focused}
              setFocused={setFocused}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              showWeekNumbers={showWeekNumbers}
              primaryButtonProps={primaryButtonProps}
              secondaryButtonProps={secondaryButtonProps}
              tertiaryButtonProps={tertiaryButtonProps}
              onPrimaryButtonClick={onPrimaryButtonClick}
              onSecondaryButtonClick={handleCancel}
              onTertiaryButtonClick={handleClear}
              setIsOpen={setIsOpen}
              withPortal={withPortal}
              portalContainer={portalContainer}
              containerRef={datePickerMainContainerRef}
              showMonthYearSelect={showMonthYearSelect}
              customYears={customYears}
              minDate={minDate}
              maxDate={maxDate}
              isOutsideRange={isOutsideRange}
            />
          )}
        </div>
      </div>
    );
  },
);
