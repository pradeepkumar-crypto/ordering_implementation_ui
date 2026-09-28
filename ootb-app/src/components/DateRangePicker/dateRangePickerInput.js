import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import calendarIcon from "../../assets/calendar.svg";
export default function DateRangePickerInput({
  inputContainerRef,
  startDateString,
  startDateInputRef,
  startDateInputProps,
  endDateString,
  endDateInputRef,
  endDateInputProps,
  isDisabled,
  isError,
  onStartDateFocus,
  onEndDateFocus,
  displayFormat = "DD-MM-YYYY",
  onStartDateStringChange,
  onEndDateStringChange,
  minDate,
  maxDate,
  readOnly,
}) {
  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [startErrorState, setStartErrorState] = useState(false);
  const [endErrorState, setEndErrorState] = useState(false);
  const [startPendingCursorPosition, setStartPendingCursorPosition] =
    useState(null);
  const [endPendingCursorPosition, setEndPendingCursorPosition] =
    useState(null);

  // Fixed positions for DD-MM-YYYY format
  const NUMBER_POSITIONS = [0, 1, 3, 4, 6, 7, 8, 9];

  // Handle cursor positioning after value updates
  useEffect(() => {
    if (startPendingCursorPosition !== null && startDateInputRef.current) {
      startDateInputRef.current.setSelectionRange(
        startPendingCursorPosition,
        startPendingCursorPosition
      );
      setStartPendingCursorPosition(null);
    }
  }, [startInputValue, startPendingCursorPosition]);

  useEffect(() => {
    if (endPendingCursorPosition !== null && endDateInputRef.current) {
      endDateInputRef.current.setSelectionRange(
        endPendingCursorPosition,
        endPendingCursorPosition
      );
      setEndPendingCursorPosition(null);
    }
  }, [endInputValue, endPendingCursorPosition]);

  useEffect(() => {
    if (startDateString) {
      setStartInputValue(startDateString);
    } else {
      setStartInputValue("");
    }
  }, [startDateString]);

  useEffect(() => {
    if (endDateString) {
      setEndInputValue(endDateString);
    } else {
      setEndInputValue("");
    }
  }, [endDateString]);

  const validateDate = (date, isStartDate) => {
    if (!date) return false;

    // Check if date is within min/max range
    if (minDate && moment(date).isBefore(minDate, "day")) {
      return false;
    }
    if (maxDate && moment(date).isAfter(maxDate, "day")) {
      return false;
    }

    // Get the day and month from the input value
    const inputValue = isStartDate ? startInputValue : endInputValue;
    const format = displayFormat || "DD-MM-YYYY";
    const formatMap = {
      "DD-MM-YYYY": { day: [0, 2], month: [3, 5], year: [6, 10] },
      "MM-DD-YYYY": { day: [3, 5], month: [0, 2], year: [6, 10] },
      "YYYY-MM-DD": { day: [8, 10], month: [5, 7], year: [0, 4] },
    };

    const formatInfo = formatMap[format] || formatMap["DD-MM-YYYY"];
    const day = parseInt(
      inputValue.substring(formatInfo.day[0], formatInfo.day[1])
    );
    const month = parseInt(
      inputValue.substring(formatInfo.month[0], formatInfo.month[1])
    );
    const year = parseInt(
      inputValue.substring(formatInfo.year[0], formatInfo.year[1])
    );

    // Validate month (1-12)
    if (month < 1 || month > 12) {
      return false;
    }

    // Get the last day of the month
    const lastDayOfMonth = moment(`${year}-${month}`, "YYYY-M").daysInMonth();

    // Validate day (1 to last day of month)
    if (day < 1 || day > lastDayOfMonth) {
      return false;
    }

    // Validate start date is before or equal to end date
    if (isStartDate && endInputValue) {
      const endDate = moment(endInputValue, displayFormat, true);
      if (endDate.isValid() && moment(date).isAfter(endDate, "day")) {
        return false;
      }
    }

    // Validate end date is after or equal to start date
    if (!isStartDate && startInputValue) {
      const startDate = moment(startInputValue, displayFormat, true);
      if (startDate.isValid() && moment(date).isBefore(startDate, "day")) {
        return false;
      }
    }

    return true;
  };

  const handleStartDateInputFocus = () => {
    if (!startInputValue) {
      setStartInputValue(displayFormat);
      // Use setTimeout to ensure the input is focused before setting selection
      setTimeout(() => {
        if (startDateInputRef.current) {
          startDateInputRef.current.setSelectionRange(0, 0);
        }
      }, 0);
    }
    onStartDateFocus();
  };

  const handleEndDateInputFocus = () => {
    if (!endInputValue) {
      setEndInputValue(displayFormat);
      // Use setTimeout to ensure the input is focused before setting selection
      setTimeout(() => {
        if (endDateInputRef.current) {
          endDateInputRef.current.setSelectionRange(0, 0);
        }
      }, 0);
    }
    onEndDateFocus();
  };

  const handleStartDateInputBlur = () => {
    const parsedDate = moment(startInputValue, displayFormat, true);
    if (parsedDate.isValid()) {
      const isValid = validateDate(parsedDate, true);
      setStartErrorState(!isValid);
      if (isValid) {
        onStartDateStringChange?.(parsedDate);
      }
    } else {
      setStartErrorState(true);
    }

    if (!startInputValue || startInputValue === displayFormat) {
      setStartInputValue("");
      setStartErrorState(false);
      onStartDateStringChange?.(null);
    }
  };

  const handleEndDateInputBlur = () => {
    const parsedDate = moment(endInputValue, displayFormat, true);
    if (parsedDate.isValid()) {
      const isValid = validateDate(parsedDate, false);
      setEndErrorState(!isValid);
      if (isValid) {
        onEndDateStringChange?.(parsedDate);
      }
    } else {
      setEndErrorState(true);
    }

    if (!endInputValue || endInputValue === displayFormat) {
      setEndInputValue("");
      setEndErrorState(false);
      onEndDateStringChange?.(null);
    }
  };

  const handleStartDateInputClick = () => {
    if (startDateInputRef.current) {
      const cursor = startDateInputRef.current.selectionStart;

      // Special case: clicking after last character
      if (cursor >= NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1) {
        startDateInputRef.current.setSelectionRange(
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1,
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1
        );
        return;
      }

      // If click lands on a non-digit position (i.e. separator)
      if (!NUMBER_POSITIONS.includes(cursor)) {
        // Find the next number position *after* the click
        const nextPos = NUMBER_POSITIONS.find((pos) => pos >= cursor);

        // Fallback: go to last number position
        const fallbackPos = NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1];

        startDateInputRef.current.setSelectionRange(
          nextPos !== undefined ? nextPos : fallbackPos,
          nextPos !== undefined ? nextPos : fallbackPos
        );
      }
      // Else: click landed on a number digit, let it be
    }
  };

  const handleEndDateInputClick = () => {
    if (endDateInputRef.current) {
      const cursor = endDateInputRef.current.selectionStart;

      // Special case: clicking after last character
      if (cursor >= NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1) {
        endDateInputRef.current.setSelectionRange(
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1,
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1
        );
        return;
      }

      // If click lands on a non-digit position (i.e. separator)
      if (!NUMBER_POSITIONS.includes(cursor)) {
        // Find the next number position *after* the click
        const nextPos = NUMBER_POSITIONS.find((pos) => pos >= cursor);

        // Fallback: go to last number position
        const fallbackPos = NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1];

        endDateInputRef.current.setSelectionRange(
          nextPos !== undefined ? nextPos : fallbackPos,
          nextPos !== undefined ? nextPos : fallbackPos
        );
      }
      // Else: click landed on a number digit, let it be
    }
  };

  const handleStartDateInputChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart;

    // Guard: invalid cursor
    if (cursorPosition == null || cursorPosition < 1) return;

    const newChar = value[cursorPosition - 1];
    if (!/^\d$/.test(newChar)) return;

    const pos = cursorPosition - 1;

    // Guard: only allow typing in number positions
    if (!NUMBER_POSITIONS.includes(pos)) {
      e.preventDefault?.();
      setStartPendingCursorPosition(
        NUMBER_POSITIONS.find((p) => p > pos) ??
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1]
      );
      return;
    }

    const newValue =
      startInputValue.slice(0, pos) + newChar + startInputValue.slice(pos + 1);

    if (newValue.length > displayFormat.length) return;
    setStartInputValue(newValue);
    onStartDateStringChange?.(newValue);

    const currentIndex = NUMBER_POSITIONS.indexOf(pos);
    if (currentIndex < NUMBER_POSITIONS.length - 1) {
      const nextPos = NUMBER_POSITIONS[currentIndex + 1];
      setStartPendingCursorPosition(nextPos);
    } else {
      const parsedDate = moment(newValue, displayFormat, true);
      const isValid = parsedDate.isValid() && validateDate(parsedDate, true);
      setStartErrorState(!isValid);
      onStartDateStringChange?.(isValid ? parsedDate : newValue);
    }
  };

  const handleEndDateInputChange = (e) => {
    const input = e.target;
    const value = input.value;
    const cursorPosition = input.selectionStart;

    // Guard: invalid cursor
    if (cursorPosition == null || cursorPosition < 1) return;

    const newChar = value[cursorPosition - 1];
    if (!/^\d$/.test(newChar)) return;

    const pos = cursorPosition - 1;

    // Guard: only allow typing in number positions
    if (!NUMBER_POSITIONS.includes(pos)) {
      e.preventDefault?.();
      setEndPendingCursorPosition(
        NUMBER_POSITIONS.find((p) => p > pos) ??
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1]
      );
      return;
    }

    const newValue =
      endInputValue.slice(0, pos) + newChar + endInputValue.slice(pos + 1);
    if (newValue.length > displayFormat.length) return;
    setEndInputValue(newValue);
    onEndDateStringChange?.(newValue);

    const currentIndex = NUMBER_POSITIONS.indexOf(pos);
    if (currentIndex < NUMBER_POSITIONS.length - 1) {
      const nextPos = NUMBER_POSITIONS[currentIndex + 1];
      setEndPendingCursorPosition(nextPos);
    } else {
      const parsedDate = moment(newValue, displayFormat, true);
      const isValid = parsedDate.isValid() && validateDate(parsedDate, false);
      setEndErrorState(!isValid);
      onEndDateStringChange?.(isValid ? parsedDate : newValue);
    }
  };

  const handleStartDateKeyDown = (e) => {
    // Allow navigation keys
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab") {
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      const caret = startDateInputRef.current.selectionStart;

      /* 1️⃣ figure out which digit we should delete */
      const deletePos = [...NUMBER_POSITIONS] // reverse‑scan
        .reverse()
        .find((p) => p < caret);

      if (deletePos == null) return; // nothing to delete

      /* 2️⃣ build a new masked value */
      const newValue =
        startInputValue.slice(0, deletePos) +
        displayFormat[deletePos] + // "D" | "M" | "Y"
        startInputValue.slice(deletePos + 1);

      setStartInputValue(newValue);
      onStartDateStringChange?.(newValue);

      /* 3️⃣ place caret so next Backspace hits the next digit */
      let nextCaret = deletePos; // start just after the reset char
      while (nextCaret > 0 && !NUMBER_POSITIONS.includes(nextCaret - 1)) {
        nextCaret--; // hop over separator(s)
      }
      setStartPendingCursorPosition(nextCaret);
      return;
    }

    // Only allow numbers
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleEndDateKeyDown = (e) => {
    // Allow navigation keys
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab") {
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      const caret = endDateInputRef.current.selectionStart;

      /* 1️⃣ figure out which digit we should delete */
      const deletePos = [...NUMBER_POSITIONS] // reverse‑scan
        .reverse()
        .find((p) => p < caret);

      if (deletePos == null) return; // nothing to delete

      /* 2️⃣ build a new masked value */
      const newValue =
        endInputValue.slice(0, deletePos) +
        displayFormat[deletePos] + // "D" | "M" | "Y"
        endInputValue.slice(deletePos + 1);

      setEndInputValue(newValue);
      onEndDateStringChange?.(newValue);

      /* 3️⃣ place caret so next Backspace hits the next digit */
      let nextCaret = deletePos; // start just after the reset char
      while (nextCaret > 0 && !NUMBER_POSITIONS.includes(nextCaret - 1)) {
        nextCaret--; // hop over separator(s)
      }
      setEndPendingCursorPosition(nextCaret);
      return;
    }

    // Only allow numbers
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`dateRangePicker-input-container ${
        isDisabled ? "dateRangePicker-input-disabled" : ""
      }
      ${
        isError || startErrorState || endErrorState
          ? "impact-dateRangePicker-error"
          : ""
      }`}
      ref={inputContainerRef}
    >
      <input
        type="text"
        placeholder="Start Date"
        value={startInputValue}
        onFocus={handleStartDateInputFocus}
        onBlur={handleStartDateInputBlur}
        onClick={handleStartDateInputClick}
        onChange={handleStartDateInputChange}
        onKeyDown={handleStartDateKeyDown}
        ref={startDateInputRef}
        readOnly={readOnly}
        {...startDateInputProps}
        className="dateRangePicker-input-start-date"
      />
      <input
        type="text"
        placeholder="End Date"
        value={endInputValue}
        onFocus={handleEndDateInputFocus}
        onBlur={handleEndDateInputBlur}
        onClick={handleEndDateInputClick}
        onChange={handleEndDateInputChange}
        onKeyDown={handleEndDateKeyDown}
        ref={endDateInputRef}
        readOnly={readOnly}
        {...endDateInputProps}
        className="dateRangePicker-input-end-date"
      />
      <span
        className="end-date-icon"
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          width: 14,
          height: 14,
          background: `url(${calendarIcon}) no-repeat center/contain`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (startDateInputRef.current) {
            startDateInputRef.current.focus();
          }
        }}
      />
    </div>
  );
}
