import React, { useMemo } from "react";
import { Modal } from "../Modal";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";
import { useState, useEffect } from "react";
import { AddOutlined } from "@mui/icons-material";
import { Toast } from "../Toast";
import AdvanceSearchModalItem from "./AdvanceSearchModalItem";
import { useForm, useFieldArray } from "react-hook-form";
import {
  convertToOptions,
  hasDuplicateColumns,
  NON_TEXT_FILTER_OPTIONS,
  TEXT_FILTER_OPTIONS,
} from "../../utils/helper";

export default function AdvanceSearchModal({
  isAdvanceSearch,
  toggleAdvanceSearch,
  colDefs,
  actualRef,
  currentColumnId,
  savedAdvanceSearchConfig,
  setInitialFilters,
  initialFilters = [{ column: null, operation: null, value: "" }],
  selectedThirdOptionDropdownValue,
  setSelectedThirdOptionDropdownValue,
  ...args
}) {
  const [activeOption, setActiveOption] = useState("advanceSearch");
  const [initialDataSet, setInitialDataSet] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const [isClearAll, setIsClearAll] = useState(false);
  const [
    toShowDuplicateColumnInAdvanceSearch,
    setToShowDuplicateColumnInAdvanceSearch,
  ] = useState(false);

  const filteredColumnsInitialOptions = useMemo(
    () => convertToOptions(colDefs || []),
    [colDefs]
  );

  const formMethods =
    activeOption == "advanceSearch"
      ? useForm({
          defaultValues: {
            filters: initialFilters,
          },
          rules: {
            required: true,
          },
        })
      : useForm({
          defaultValues: {
            filters: [{ column: null, operation: null, value: null }],
          },
          rules: {
            required: true,
          },
        });
  const { control, handleSubmit, reset, getValues, watch, setValue } =
    formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "filters",
  });

  // Set initial form values from filter model
  useEffect(() => {
    if (
      !initialDataSet &&
      actualRef?.current?.api &&
      actualRef?.current?.api?.getFilterModel()
    ) {
      const filterModel = actualRef.current.api?.getFilterModel();
      if (Object.keys(filterModel)?.length > 0) {
        const formattedFilters = Object.entries(filterModel)?.map(
          ([field, filterData]) => {
            // Find the column definition to get the label
            const columnOption = filteredColumnsInitialOptions?.find(
              (opt) => opt?.value === field
            );

            const columnsOptionsInfo = colDefs?.find(
              (col) => col?.field === field
            );
            const isThirdOptionDropdown =
              columnsOptionsInfo?.thirdOptionAsDropdown;

            const getThirdOptionDropdownValue = (filterData) => {
              if (isThirdOptionDropdown) {
                return columnsOptionsInfo?.thirdOptionDropdownOptions?.find(
                  (item) => item?.value === filterData
                );
              }
              return filterData;
            };

            const filterValue = getThirdOptionDropdownValue(filterData?.filter);

            // Find the operation option
            const operationOption =
              filterData.filterType === "number"
                ? NON_TEXT_FILTER_OPTIONS?.find(
                    (opt) => opt?.value === filterData?.type
                  )
                : TEXT_FILTER_OPTIONS?.find(
                    (opt) => opt?.value === filterData?.type
                  );
            return {
              column: columnOption,
              operation: operationOption,
              value: filterValue,
            };
          }
        );
        const updatedInitialFilters = initialFilters.map((filter) => {
          if (
            formattedFilters.find((f) => f.column.value === filter.column.value)
          ) {
            return formattedFilters.find(
              (f) => f.column.value === filter.column.value
            );
          }
          return filter;
        });
        reset({ filters: updatedInitialFilters });
        setInitialDataSet(true);
      }
    } else if (initialFilters?.length > 0 && !initialDataSet) {
      reset({ filters: initialFilters });
    }
  }, [
    actualRef,
    filteredColumnsInitialOptions,
    initialDataSet,
    initialFilters,
  ]);

  const onSubmit = (data) => {
    console.log("[data]", data);
  };

  const handleClearAll = () => {
    reset({
      filters: [{ column: null, operation: null, value: "" }],
    });
    setInitialFilters([]);
    actualRef?.current?.api?.setFilterModel(null);
    args?.onClearAllClick?.();
    if (args?.onFilterChanged) {
      args?.onFilterChanged?.(args);
    }
    setIsClearAll(true); // To prevent the setting the initial column options
  };
  const handleClearAllValues = () => {
    const updatedFilters = getValues()
      ?.filters.filter((filter) => filter.column !== "") // remove filters with empty column
      .map((filter) => ({
        ...filter,
        value: "",
      }));

    setValue(
      "filters",
      updatedFilters.length > 0
        ? updatedFilters
        : [{ column: null, operation: null, value: "" }]
    );
  };

  const watchedFilters = watch("filters");
  const watchedColumns = watchedFilters.map((filter) => filter?.column?.value);
  useEffect(() => {
    const hasDuplicates = hasDuplicateColumns(watchedColumns);
    setIsFormValid(!hasDuplicates && watchedColumns?.length > 0);
  }, [watchedColumns]);

  useEffect(() => {
    if (!isFormValid) {
      setOpenToast(true);
    }
  }, [isFormValid]);

  return (
    <Modal
      className="ia-table-search-modal"
      onClose={toggleAdvanceSearch}
      onPrimaryButtonClick={() => {
        args.onSearchApplyClick(getValues()?.filters);
      }}
      onSecondaryButtonClick={(e) => {
        e.preventDefault();
        args?.onSearchSaveClick();
      }}
      primaryButtonProps={{
        type: "submit",
        disabled: !isFormValid && !toShowDuplicateColumnInAdvanceSearch,
      }}
      primaryButtonLabel="Apply"
      secondaryButtonLabel={args?.onSearchSaveClick ? "Save search" : null}
      size="small"
      title="Search"
      width={850}
      height={400}
      open={isAdvanceSearch}
    >
      <div className="ia-table-search-header">
        <ButtonGroup
          options={[
            {
              label: "Search",
              value: "search",
            },
            {
              label: "Advance Search",
              value: "advanceSearch",
            },
          ]}
          selectedOption={activeOption}
          onChange={(e, val) => {
            e.preventDefault();
            setActiveOption(val);
            reset({ filters: [{ column: "", operation: "", value: "" }] });
            actualRef?.current?.api?.destroyFilter(null);
          }}
        />

        <Button
          variant="url"
          size="small"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleClearAll();
          }}
        >
          Clear all
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="ia-table-search-content"
      >
        <div className="ia-table-search-content-title">
          Match all of the following rules
        </div>
        {(savedAdvanceSearchConfig?.length > 0
          ? savedAdvanceSearchConfig
          : fields
        ).map((field, index) => (
          <AdvanceSearchModalItem
            key={field.id}
            colDefs={colDefs}
            control={control}
            index={index}
            filteredColumnsInitialOptions={filteredColumnsInitialOptions}
            onDelete={() => {
              remove(index);
              setInitialFilters((prev) =>
                prev.filter(
                  (filter) => filter.column.value !== field.column.value
                )
              );
              if (args?.onFilterChanged) {
                args?.onFilterChanged?.(args);
              }
              actualRef?.current?.api?.destroyFilter(field.column.value);
            }}
            totalColumns={fields.length}
            currentColumnId={currentColumnId}
            activeOption={activeOption}
            getValues={getValues}
            addNewColumn={append}
            isClearAll={isClearAll}
            setToShowDuplicateColumnInAdvanceSearch={
              setToShowDuplicateColumnInAdvanceSearch
            }
            selectedThirdOptionDropdownValue={selectedThirdOptionDropdownValue}
            setSelectedThirdOptionDropdownValue={
              setSelectedThirdOptionDropdownValue
            }
            {...args}
          />
        ))}
        {!isFormValid && !toShowDuplicateColumnInAdvanceSearch && (
          <Toast
            isOpen={openToast}
            message="Please select an unselected column "
            onClose={() => setOpenToast(!openToast)}
            position="top-right"
            variant="warning"
          />
        )}
        <div className="ia-table-search-content-footer">
          <Button
            variant="secondary"
            size="large"
            onClick={handleClearAllValues}
            type="button"
            disabled={filteredColumnsInitialOptions?.length === 1}
          >
            Clear values
          </Button>
          <Button
            variant="tertiary"
            size="large"
            type="button"
            onClick={() => {
              append({ column: "", operation: "", value: "" });
              savedAdvanceSearchConfig.push({
                column: "",
                operation: "",
                value: "",
              });
            }}
            disabled={filteredColumnsInitialOptions?.length === fields?.length}
            icon={<AddOutlined />}
          >
            Add attribute
          </Button>
        </div>
      </form>
    </Modal>
  );
}
