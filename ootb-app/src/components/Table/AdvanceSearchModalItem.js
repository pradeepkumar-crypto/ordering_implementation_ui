import React, { useEffect, useState } from "react";
import { Select } from "../Select";
import { Input } from "../Input";
import { Button } from "../Button";
import { useController, useForm } from "react-hook-form";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  NON_TEXT_FILTER_OPTIONS,
  TEXT_FILTER_OPTIONS,
} from "../../utils/helper";

const AdvanceSearchModalItem = ({
  colDefs,
  control,
  index,
  onDelete,
  filteredColumnsInitialOptions,
  totalColumns,
  currentColumnId,
  activeOption,
  getValues,
  addNewColumn,
  setToShowDuplicateColumnInAdvanceSearch,
  selectedThirdOptionDropdownValue,
  setSelectedThirdOptionDropdownValue,
  isClearAll,
}) => {
  const [isColumnOptionsOpen, setIsColumnOptionsOpen] = useState(false);
  const [isOperationOptionsOpen, setIsOperationOptionsOpen] = useState(false);
  const [isThirdOptionDropdownOpen, setIsThirdOptionDropdownOpen] =
    useState(false);
  const [currentOperationOptions, setCurrentOperationOptions] = useState([]);

  const [
    currentThirdOptionDropdownOptions,
    setCurrentThirdOptionDropdownOptions,
  ] = useState([]);
  const [currentColumnDef, setCurrentColumnDef] = useState(null);
  const [
    currentFilteredColumnsInitialOptions,
    setCurrentFilteredColumnsInitialOptions,
  ] = useState(filteredColumnsInitialOptions);
  // Column field controller
  const { field: columnField } = useController({
    name: `filters.${index}.column`,
    control,
    rules: {
      required: true,
    },
  });

  const { unregister } = useForm();
  useEffect(() => {
    if (activeOption !== "advanceSearch") {
      unregister(`filters.${index}.operation`); // Completely removes field from form state
    }
  }, [activeOption, index, unregister]);

  const { field: operationField, fieldState: operationFieldState } =
    useController({
      name: `filters.${index}.operation`,
      control,
      rules: { required: activeOption !== "advanceSearch" && true },
    });

  // Value field controller
  const { field: valueField } = useController({
    name: `filters.${index}.value`,
    control,
    rules: {
      required: true,
    },
  });

  useEffect(() => {
    if (columnField?.value) {
      // Recursively find the column definition
      const findColumnDef = (cols, field) => {
        for (const col of cols) {
          if (col.children) {
            const found = findColumnDef(col.children, field);
            if (found) return found;
          }
          if (col.toShowDuplicateColumnInAdvanceSearch) {
            const index = col.columnFieldsInAdvanceSearch?.indexOf(field);
            if (index !== -1) {
              return {
                ...col,
                currentColumnField: `${field}${index + 1}`, // add index + 1
              };
            }
          } else if (col.field === field) {
            return col;
          }
        }
        return null;
      };

      const columnDef = findColumnDef(colDefs, columnField.value.value);
      setCurrentColumnDef(columnDef);
      const operatorList = columnDef?.operationFilterOptions
        ? columnDef.operationFilterOptions
        : columnDef?.filter === "agNumberColumnFilter"
        ? NON_TEXT_FILTER_OPTIONS
        : TEXT_FILTER_OPTIONS;
      setCurrentOperationOptions(operatorList);
    }
  }, [columnField?.value, colDefs]);

  useEffect(() => {
    if (currentColumnDef?.thirdOptionAsDropdown && operationField?.value) {
      if (currentColumnDef?.toShowDuplicateColumnInAdvanceSearch) {
        const currentOptions = currentColumnDef.currentColumnField.endsWith("1")
          ? currentColumnDef?.thirdOptionDropdownOptions1
          : currentColumnDef?.thirdOptionDropdownOptions2;
        setCurrentThirdOptionDropdownOptions(currentOptions);
      } else {
        setCurrentThirdOptionDropdownOptions(
          currentColumnDef?.thirdOptionDropdownOptions
        );
      }
    }
    setToShowDuplicateColumnInAdvanceSearch(
      currentColumnDef?.toShowDuplicateColumnInAdvanceSearch
    );
  }, [currentColumnDef, operationField]);

  // useEffect(() => {
  //   // Case: When we click on icon to open advance filter
  //   if (
  //     currentColumnId &&
  //     !columnField.value &&
  //     columnField.value !== currentColumnId &&
  //     filteredColumnsInitialOptions?.length > 0 &&
  //     !isClearAll
  //   ) {
  //     const columnOption = filteredColumnsInitialOptions?.find(
  //       (opt) => opt.value === currentColumnId
  //     );
  //     const isColumnExists = getValues()
  //       ?.filters?.map((filter) => filter?.column?.value)
  //       ?.includes(currentColumnId);

  //     // set the column value such as make ,modal etc
  //     if (!isColumnExists) {
  //       columnField?.onChange?.(columnOption);
  //     }
  //   }
  //   // // Case where only one column is available
  //   // if (filteredColumnsInitialOptions.length === 1 && !columnField.value) {
  //   //   columnField.onChange(filteredColumnsInitialOptions[0]);
  //   // }
  // }, [filteredColumnsInitialOptions, currentColumnId]);

  const handleClickOutside = (event) => {
    if (
      isColumnOptionsOpen ||
      isThirdOptionDropdownOpen ||
      (isOperationOptionsOpen &&
        !event.target.closest(".ia-table-search-content-body"))
    ) {
      setIsColumnOptionsOpen(false);
      setIsThirdOptionDropdownOpen(false);
      setIsOperationOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isColumnOptionsOpen, isThirdOptionDropdownOpen, isOperationOptionsOpen]);

  return (
    <div className="ia-table-search-content-body">
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Select
          name={`filters.${index}.column`}
          placeholder="Select"
          isOpen={isColumnOptionsOpen}
          setIsOpen={(val) => {
            setIsColumnOptionsOpen(val);
          }}
          currentOptions={currentFilteredColumnsInitialOptions}
          setCurrentOptions={setCurrentFilteredColumnsInitialOptions}
          selectedOptions={columnField.value ? columnField.value : null}
          setSelectedOptions={(option) => {
            columnField.onChange(option);
            // Reset operation and value when column changes
            operationField.onChange(null);
            valueField.onChange("");
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          initialOptions={filteredColumnsInitialOptions}
          minWidth={activeOption !== "advanceSearch" ? 400 : undefined}
          withPortal={true}
        />
      </div>
      {activeOption == "advanceSearch" && (
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Select
            name={`filters.${index}.operation`}
            placeholder="Select"
            isOpen={isOperationOptionsOpen}
            setIsOpen={(val) => {
              setIsOperationOptionsOpen(val);
            }}
            currentOptions={currentOperationOptions}
            setCurrentOptions={setCurrentOperationOptions}
            selectedOptions={operationField.value ? operationField.value : null}
            setSelectedOptions={(option) => {
              operationField.onChange(option);
            }}
            initialOptions={currentOperationOptions}
            disabled={!columnField.value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            withPortal={true}
            isDisabled={!columnField.value}
          />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {currentColumnDef?.thirdOptionAsDropdown &&
        currentThirdOptionDropdownOptions?.length > 0 ? (
          <Select
            name={`filters.${index}.value`}
            placeholder="Select value"
            isOpen={isThirdOptionDropdownOpen}
            setIsOpen={setIsThirdOptionDropdownOpen}
            initialOptions={currentThirdOptionDropdownOptions}
            currentOptions={currentThirdOptionDropdownOptions}
            setCurrentOptions={setCurrentThirdOptionDropdownOptions}
            selectedOptions={valueField.value ? valueField.value : null}
            setSelectedOptions={(option) => {
              // setSelectedThirdOptionDropdownValue(option);
              valueField.onChange(option);
            }}
            minWidth={activeOption !== "advanceSearch" ? 344 : undefined}
            withPortal={true}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            isDisabled={!operationField.value}
          />
        ) : (
          <Input
            placeholder="Enter text"
            name={`filters.${index}.value`}
            value={valueField.value}
            onChange={(e) => {
              e.preventDefault();
              valueField.onChange(e.target.value);
            }}
            isDisabled={
              activeOption == "advanceSearch" && !operationField.value
            }
          />
        )}
      </div>
      <Button
        variant="tertiary"
        size="large"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        type="button"
        disabled={totalColumns == 1}
      >
        <DeleteOutlineOutlinedIcon />
      </Button>
    </div>
  );
};

export default AdvanceSearchModalItem;
