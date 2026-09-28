import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

export default function DatePickerInput({
  dateString,
  placeholder,
  isDisabled,
  isError,
  inputContainerRef,
  selectedDate,
  ref,
  inputProps,
  isOpen,
  setIsOpen,
  displayFormat = "DD-MM-YYYY",
  onDateStringChange,
  minDate,
  maxDate,
  onCancel,
  readOnly = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [errorState, setErrorState] = useState(false);
  const [pendingCursorPosition, setPendingCursorPosition] = useState(null);

  // Handle cancel action
  useEffect(() => {
    if (onCancel) {
      setErrorState(false);
      setInputValue("");
    }
  }, [onCancel]);

  // Fixed positions for DD-MM-YYYY format
  const NUMBER_POSITIONS = [0, 1, 3, 4, 6, 7, 8, 9];

  // Handle cursor positioning after value updates
  useEffect(() => {
    if (pendingCursorPosition !== null && inputRef.current) {
      inputRef.current.setSelectionRange(
        pendingCursorPosition,
        pendingCursorPosition
      );
      setPendingCursorPosition(null);
    }
  }, [inputValue, pendingCursorPosition]);

  useEffect(() => {
    if (dateString) {
      setInputValue(dateString);
    } else {
      setInputValue("");
    }
  }, [dateString]);

  useEffect(() => {
    if (readOnly) {
      setInputValue("");
      return;
    }
    if (!inputValue && isFocused) {
      setInputValue(displayFormat);
      setPendingCursorPosition(NUMBER_POSITIONS[0]);
    }
  }, [isFocused]);

  const handleDateInputFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    // If input is empty, show the format as placeholder
    if (!inputValue) {
      if (!readOnly) {
        setInputValue(displayFormat);
      }
      if (inputRef.current) {
        inputRef.current.setSelectionRange(0, 0);
      }
    }
  };

  const validateDate = (date) => {
    if (!date) return false;

    // Check if date is within min/max range
    if (minDate && moment(date).isBefore(minDate, "day")) {
      return false;
    }
    if (maxDate && moment(date).isAfter(maxDate, "day")) {
      return false;
    }

    // Get the day and month from the input value
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

    return true;
  };

  const handleDateInputBlur = () => {
    setIsFocused(false);

    // Validate date on blur
    const parsedDate = moment(inputValue, displayFormat, true);
    if (parsedDate.isValid()) {
      const isValid = validateDate(parsedDate);
      setErrorState(!isValid);
      if (isValid) {
        onDateStringChange?.(parsedDate);
      }
    } else {
      setErrorState(true);
    }

    // If input is empty or just the format, clear it
    if (!inputValue || inputValue === displayFormat) {
      setInputValue("");
      setErrorState(false);
      onDateStringChange?.(null);
    }
  };

  const handleInputClick = () => {
    setIsOpen(true);
    if (inputRef.current) {
      const cursor = inputRef.current.selectionStart;

      // Special case: clicking after last character
      if (cursor >= NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1] + 1) {
        inputRef.current.setSelectionRange(
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

        inputRef.current.setSelectionRange(
          nextPos !== undefined ? nextPos : fallbackPos,
          nextPos !== undefined ? nextPos : fallbackPos
        );
      }
      // Else: click landed on a number digit, let it be
    }
  };

  const handleInputChange = (e) => {
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
      setPendingCursorPosition(
        NUMBER_POSITIONS.find((p) => p > pos) ??
          NUMBER_POSITIONS[NUMBER_POSITIONS.length - 1]
      );
      return;
    }

    const newValue =
      inputValue.slice(0, pos) + newChar + inputValue.slice(pos + 1);

    if (newValue.length > displayFormat.length) return;
    setInputValue(newValue);
    onDateStringChange?.(newValue);

    const currentIndex = NUMBER_POSITIONS.indexOf(pos);
    if (currentIndex < NUMBER_POSITIONS.length - 1) {
      const nextPos = NUMBER_POSITIONS[currentIndex + 1];
      setPendingCursorPosition(nextPos);
    } else {
      const parsedDate = moment(newValue, displayFormat, true);
      const isValid = parsedDate.isValid() && validateDate(parsedDate);
      setErrorState(!isValid);
      onDateStringChange?.(isValid ? parsedDate : newValue);
    }
  };

  const handleKeyDown = (e) => {
    // Allow navigation keys
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Tab") {
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      const caret = inputRef.current.selectionStart;

      /* 1️⃣ figure out which digit we should delete */
      const deletePos = [...NUMBER_POSITIONS] // reverse‑scan
        .reverse()
        .find((p) => p < caret);

      if (deletePos == null) return; // nothing to delete

      /* 2️⃣ build a new masked value */
      const newValue =
        inputValue.slice(0, deletePos) +
        displayFormat[deletePos] + // "D" | "M" | "Y"
        inputValue.slice(deletePos + 1);

      setInputValue(newValue);
      onDateStringChange?.(newValue);

      /* 3️⃣ place caret so next Backspace hits the next digit */
      let nextCaret = deletePos; // start just after the reset char
      while (nextCaret > 0 && !NUMBER_POSITIONS.includes(nextCaret - 1)) {
        nextCaret--; // hop over separator(s)
      }
      setPendingCursorPosition(nextCaret);
      return;
    }
    // Only allow numbers
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`datePicker-input-container ${
        isDisabled ? "datePicker-input-disabled" : null
      }
      ${isError || errorState ? "impact-datePicker-error" : null}`}
      ref={inputContainerRef}
    >
      <input
        type="text"
        placeholder={
          readOnly ? placeholder : isFocused ? placeholder || displayFormat : ""
        }
        value={inputValue}
        onFocus={handleDateInputFocus}
        onBlur={handleDateInputBlur}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={(node) => {
          inputRef.current = node;
          if (ref?.inputRef) {
            ref.inputRef.current = node;
          }
        }}
        {...inputProps}
        readOnly={readOnly}
        className="impact-datepicker-date-input"
      />
    </div>
  );
}
