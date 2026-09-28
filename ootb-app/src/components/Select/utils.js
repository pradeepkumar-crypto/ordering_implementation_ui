export const handleSearch = ({
  isMulti,
  event,
  externalOnSearch,
  initialOptions,
  setCurrentOptions,
  setOpenToast,
  setToastMessage,
}) => {
  if (externalOnSearch) {
    externalOnSearch(event);
  } else {
    const isNonAlphaNumeric = (str) => /[^\w,]/.test(str);
    const options = [...initialOptions];
    // const searchTerm = isMulti
    //   ? event.target.value
    //       .trim()
    //       .toUpperCase()
    //       .replace(/\s/g, "")
    //       .split(",")
    //       .filter((item) => item != "")
    //   : event.target.value.trim().toUpperCase().replace(/\s/g, "");

    const searchTerm = event.target.value
      .trim()
      .split(",")
      .filter((item) => item !== "");

    if (searchTerm && searchTerm.length > 0) {
      const searchResults = options.filter((option) => {
        return searchTerm.some((term) => {
          return option.label
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase().trim());
        });
      });
      setCurrentOptions([...searchResults]);
    } else {
      setCurrentOptions(initialOptions);
    }
  }
};

/**
 * handle when select all option is passed through props
 */

export const handleSelectAll = ({
  event,
  externalOnSelectAll,
  setIsSelectAll,
  currentOptions,
  selectedOptions,
  setSelectedOptions,
  handleSelect,
}) => {
  if (externalOnSelectAll) {
    externalOnSelectAll(event);
  } else {
    if (event && event.target.checked) {
      setIsSelectAll(true);

      //currentOptions without selectedOptions
      const restCurrentOptions = currentOptions.filter(
        (option) =>
          !selectedOptions.find(
            (selectedOption) =>
              selectedOption.label === option.label &&
              option.value === selectedOption.value,
          ),
      );
      //console.log(selectedOptions, restCurrentOptions);
      setSelectedOptions([...selectedOptions, ...restCurrentOptions]);
      handleSelect([...selectedOptions, ...restCurrentOptions]);
    } else {
      setIsSelectAll(false);
      setSelectedOptions([]);
      handleSelect([]);
    }
  }
};

/**
 * select all options if we passed isWithSelectAll props
 */

export const handleSelectAllWhenCompLoads = ({
  currentOptions,
  selectedOptions,
  setSelectedOptions,
}) => {
  const restCurrentOptions = currentOptions.filter(
    (option) =>
      !selectedOptions.find(
        (selectedOption) =>
          selectedOption.label === option.label &&
          option.value === selectedOption.value,
      ),
  );
  setSelectedOptions([...selectedOptions, ...restCurrentOptions]);
};

/**
 * handle when handle clear all
 */

export const handleClearAll = ({
  externalOnClearAll,
  setSelectedOptions,
  setIsSelectAll,
  handleSelect,
  syncParentChildSelection,
}) => {
  if (externalOnClearAll) {
    externalOnClearAll();
  } else {
    setSelectedOptions([]);
    setIsSelectAll(false);
    handleSelect([]);
    syncParentChildSelection([]);
  }
};

/**
 * handle when handle select dropdown close
 */

export const handleDropdownClose = ({
  externalOnDropdownClose,
  setCurrentOptions,
  initialOptions,
  currentOptions,
  setIsOpen,
  onBlur,
  event,
}) => {
  setIsOpen((prev) => !prev);
  if (onBlur) {
    onBlur(event);
  }
  if (externalOnDropdownClose) {
    externalOnDropdownClose();
  } else {
    setCurrentOptions(
      initialOptions.length > 0 ? initialOptions : currentOptions,
    );
  }
};

/**
 * handle when handle select dropdown open
 */

export const handleDropdownOpen = ({
  externalOnDropdownOpen,
  isOpen,
  setIsOpen,
}) => {
  if (externalOnDropdownOpen) {
    externalOnDropdownOpen();
    setIsOpen(!isOpen);
  } else {
    setIsOpen(!isOpen);
  }
};

export const getPlaceholder = (
  isMulti,
  selectedOptions,
  placeholder,
  customPlaceholderAfterSelect = null,
) => {
  if (!isMulti && Object.entries(selectedOptions || {}).length > 0) {
    return typeof selectedOptions.value !== "undefined"
      ? selectedOptions.label
      : placeholder;
  } else if (isMulti && selectedOptions.length > 0) {
    return selectedOptions.length === 1
      ? selectedOptions[0].label
      : `Selected (${
          customPlaceholderAfterSelect
            ? customPlaceholderAfterSelect
            : selectedOptions.length
        })`;
  }
  return placeholder;
};

export const onKeyDown = ({ e, focusedIndex, currentOptions }) => {
  const searchResults = Array.from(
    document.getElementsByClassName("menulistScroll"),
  );

  if (e.keyCode === 40 && focusedIndex.current + 1 < currentOptions.length) {
    focusedIndex.current = focusedIndex.current + 1;
  }
  if (e.keyCode === 38 && focusedIndex.current - 1 >= 0) {
    focusedIndex.current = focusedIndex.current - 1;
  }

  searchResults.forEach((element, index) => {
    const classList = element.classList.value;
    if (index === focusedIndex.current) {
      element.className = "multi-select__option--is-focused " + classList;
    } else {
      element.classList.remove("multi-select__option--is-focused");
    }
  });

  if (e.keyCode === 13 && searchResults.length > 0) {
    //When a enter key is pressed, currently focused element would be selected
    if (focusedIndex.current > 0) {
      searchResults[focusedIndex.current].click();
    } else if (focusedIndex.current === 0) {
      searchResults[0].click();
    }
  }
};
export const flattenOptions = (options) => {
  if (!options || !Array.isArray(options)) return [];

  return options?.reduce((flatOptions, option) => {
    if (option.options) {
      return [...flatOptions, ...option.options];
    }
    return [...flatOptions, option];
  }, []);
};
