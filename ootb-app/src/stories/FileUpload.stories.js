import React, { useState } from "react";
import { FileUpload as FileUploadComponent } from "../components/FileUpload";
import { fn } from "@storybook/test";

export default {
  title: "Components/File Upload",
  component: FileUploadComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    validFileTypes: {
      options: ["xlsx", "csv"],
      control: { type: "check" },
      description: `An array of objects that accept the following props:
        <ul>
        <li>fileType: string</li>
        <li>templateDownloader: func (Optional)</li>
        <li>typeOverride: bool (Optional); when true, fileType compares directly to file.type</li>
        <li>Note:- Allowded filetype: [pdf, image, xls, xlsx, csv, text, html, audio, video, zip]</li>
        `,
      mapping: {
        xlsx: {
          templateDownloader: () => {},
          typeOverride: false,
          fileType: "xlsx",
        },
        csv: {
          templateDownloader: () => {},
          typeOverride: false,
          fileType: "csv",
        },
      },
    },
    fileList: {
      control: {
        type: "array",
      },
      description: `An array of objects with the following keys:
      <ul>
      <li>file: file object</li>
      <li>progress: number (Optional) (from 0 to 100)</li>
      <li>failed: bool (Optional) (when an upload fails)</li>
      <li>isUploadRunning: bool (Optional) (when an upload is in progress)</li>
      <li>timeRemaining: number (Optional) (in seconds)</li>
      <li>onPause: func (Optional) (when you want to be able to pause the upload)</li>
      <li>onRetry: func (Optional) (when failed is true and you want to retry)</li>`,
    },
    onFileListChange: {
      control: {
        type: "function",
      },
      description: "onFileListChange has only one prop: fileList",
    },
    primaryButtonLabel: {
      description:
        "Label of the Primary button, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonProps: {
      description: "You can pass Primary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label of the Secondary button of the Prompt, If not passed does not display secondary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonProps: {
      description: "You can pass Secondary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    onPrimaryButtonClick: {
      description:
        "Function handles the event, when primary button is clicked.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description:
        "Function handles the event, when secondary button is clicked.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    fileList: [],
    onFileListChange: fn(),
    numberOfFiles: 1,
    validFileTypes: [
      { fileType: "xlsx", templateDownloader: undefined, typeOverride: false },
    ],
    disabled: false,
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
  },
};

const FileUpload = ({ ...args }) => {
  const [fileList, setFileList] = useState(args.fileList || []);
  const onFileListChange = (newList) => {
    setFileList(newList);
  };

  return (
    <FileUploadComponent
      {...args}
      fileList={fileList}
      onFileListChange={onFileListChange}
      numberOfFiles={args.numberOfFiles}
      validFileTypes={args.validFileTypes}
      disabled={args.disabled}
      onCancelClick={args.onCancelClick}
      onNextClick={args.onNextClick}
    />
  );
};
export const Default = ({ ...args }) => <FileUpload {...args} />;

Default.args = {
  validFileTypes: [
    { fileType: "xlsx", templateDownloader: undefined, typeOverride: false },
  ],
  primaryButtonLabel: "Next",
  primaryButtonProps: {
    disabled: true,
  },
  secondaryButtonLabel: "Cancel",
};
