import React, { useRef, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import SyncIcon from "@mui/icons-material/Sync";
import { Button } from "../Button";
import { ProgressBar } from "../ProgressBar";
import "./FileUpload.styles.scss";

export const sizeConventions = [
  "B",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB",
];

const fileTypes = {
  pdf: ["application/pdf"],
  image: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/svg+xml",
    "image/tiff",
  ],
  xls: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  xlsx: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  csv: ["text/csv"],
  text: ["text/plain"],
  html: ["text/html"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
  video: ["video/mp4", "video/webm", "video/ogg"],
  zip: ["application/x-zip-compressed", "application/zip"],

  default: ["application/octet-stream"],
};

export const FileUpload = ({
  fileList,
  onFileListChange,
  disabled = false,
  numberOfFiles: numFiles = 1,
  validFileTypes = [
    { fileType: "xlsx", templateDownloader: undefined, typeOverride: false },
  ],
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  primaryButtonProps,
  onSecondaryButtonClick,
  secondaryButtonProps,
}) => {
  const wrapperRef = useRef(null);
  const fileUploadRef = useRef(null);
  const hiddenFileUploadRef = useRef(null);
  const containerRef = useRef(null);
  const [currentFileType, setCurrentFileType] = useState(
    validFileTypes[0].fileType,
  );
  const [isError, setIsError] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const numberOfFiles = numFiles >= 1 ? Math.floor(numFiles) : 1;

  useEffect(() => {
    const fileType = validFileTypes.map((file) => fileTypes[file.fileType]);
    setCurrentFileType(fileType.join(","));
  }, [validFileTypes]);

  const onDragEnter = () => {
    setIsDraggedOver(true);
    wrapperRef.current.classList.add("ia-fileUpload-dragOver");
  };

  const onDragLeave = () => {
    setIsDraggedOver(false);
    wrapperRef.current.classList.remove("ia-fileUpload-dragOver");
  };

  const onDrop = () => {
    setIsDraggedOver(false);
    wrapperRef.current.classList.remove("ia-fileUpload-dragOver");
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];

    if (!newFile) return;
    if (
      !validFileTypes.find((vft) =>
        vft.typeOverride
          ? vft.fileType === newFile.type
          : fileTypes[vft.fileType]?.includes(newFile.type),
      )
    ) {
      setIsError(true);
      return;
    }

    if (
      fileList.length >= numberOfFiles ||
      fileList.find(
        (f) => f.file.name === newFile.name && f.file.size === newFile.size,
      )
    ) {
      return;
    }

    setIsError(false);
    const updatedList = [
      ...fileList,
      {
        file: newFile,
        progress: 0,
        isUploadRunning: false,
        failed: false,
      },
    ];

    onFileListChange(updatedList);
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];

    updatedList.splice(fileList.indexOf(file), 1);

    onFileListChange(updatedList);
  };

  const onUploadClick = () => {
    hiddenFileUploadRef.current.click();
  };

  const templateDownloader = useMemo(() => {
    if (!Array.isArray(validFileTypes)) return null;
    return validFileTypes.find((vft) => vft.templateDownloader);
  }, [validFileTypes]);

  return (
    <div ref={containerRef} className="ia-fileUpload-container">
      <input
        ref={hiddenFileUploadRef}
        type="file"
        onChange={onFileDrop}
        style={{ display: "none" }}
        accept={currentFileType}
        value=""
      />
      {disabled || fileList.length >= numberOfFiles ? null : (
        <button
          ref={wrapperRef}
          className={`ia-styles ia-fileUpload ${
            isError ? "ia-fileUpload-error" : ""
          }`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) => e.preventDefault()}
        >
          <div className="ia-fileUpload-label">
            <div className="ia-fileUpload-label-primary">
              {isError ? (
                "File type not supported"
              ) : (
                <p className="ia-fileUpload-label">Drag your files here or</p>
              )}
              <input
                ref={fileUploadRef}
                type="file"
                onChange={onFileDrop}
                value=""
                accept={currentFileType}
                title={fileList[0]?.file.name}
              />
              <Button
                onClick={onUploadClick}
                variant="url"
                label="Browse Files"
                onDragEnter={onDragEnter}
                disabled={isDraggedOver}
              >
                Choose File
              </Button>
            </div>

            <p className="ia-fileUpload-label-secondary">
              supports {validFileTypes.map((vft) => vft.fileType).join(",")}
            </p>
          </div>
          {/* <span className="ia-fileUpload-hr">OR</span> */}
        </button>
      )}

      {templateDownloader ? (
        <div className="ia-fileUpload-validFileType">
          <p className="ia-fileUpload-label-secondary">Simplify your upload!</p>{" "}
          <Button
            data-fileUpload="templateDownload"
            variant="url"
            onClick={templateDownloader.templateDownloader}
          >
            Get the template
          </Button>
        </div>
      ) : null}

      {fileList.map((item) => {
        let fileSize = item.file.size;

        let i = 0;
        while (fileSize > 1024) {
          fileSize = fileSize / 1024;
          i += 1;
        }

        return (
          <div key={item.file.name} className="ia-fileUpload-previewItem">
            <div className="ia-fileUpload-previewItem-exceptProgress">
              <div className="ia-fileUpload-previewItem-details">
                {item.isUploadRunning ? null : (
                  <div
                    className={`ia-fileUpload-previewItemIcon ${Object.keys(
                      fileTypes,
                    ).find((key) => fileTypes[key].includes(item.file.type))}`}
                  />
                )}

                <div className="ia-fileUpload-previewItem-info">
                  <span className="ia-fileUpload-previewItem-name">
                    {item.file.name}
                  </span>

                  <span
                    className={`ia-fileUpload-previewItem-size ${
                      item.failed ? "uploadFailed" : ""
                    } ${item.isUploadRunning ? "uploading" : ""}`}
                  >
                    {item.failed
                      ? "Failed"
                      : fileSize.toFixed(0) + sizeConventions[i]}
                  </span>
                </div>
              </div>

              <div className="ia-fileUpload-previewItem-actions">
                {item.failed ? (
                  <>
                    <DeleteOutlineIcon
                      className="ia-fileUpload-previewItem-action removeIcon"
                      onClick={() => fileRemove(item)}
                    />
                    {item.onRetry ? (
                      <SyncIcon
                        className="ia-fileUpload-previewItem-action"
                        onClick={item.onRetry}
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    {item.onPause ? (
                      <PauseCircleOutlineIcon
                        className="ia-fileUpload-previewItem-action"
                        onClick={item.onPause}
                      />
                    ) : null}
                    <ClearIcon
                      className="ia-fileUpload-previewItem-action removeIcon"
                      onClick={() => fileRemove(item)}
                    />
                  </>
                )}
              </div>
            </div>

            {item.isUploadRunning ? (
              <div className="ia-fileUpload-progress">
                <ProgressBar
                  showTime={item.timeRemaining}
                  time={item.timeRemaining}
                  value={item.progress}
                />
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="ia-fileUpload-actions">
        {secondaryButtonLabel && (
          <Button
            variant="tertiary"
            onClick={onSecondaryButtonClick}
            {...secondaryButtonProps}
          >
            {secondaryButtonLabel}
          </Button>
        )}
        {primaryButtonLabel && (
          <Button
            variant="primary"
            onClick={onPrimaryButtonClick}
            disabled={fileList.length === 0}
            {...primaryButtonProps}
          >
            {primaryButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  fileList: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.object,
      progress: PropTypes.number,
      failed: PropTypes.bool,
      isUploadRunning: PropTypes.bool,
      timeRemaining: PropTypes.number,
      onPause: PropTypes.func,
      onRetry: PropTypes.func,
    }),
  ),
  numberOfFiles: PropTypes.number,
  disabled: PropTypes.bool,
  validFileTypes: PropTypes.arrayOf(
    PropTypes.shape({
      fileType: PropTypes.string,
      templateDownloader: PropTypes.func,
      typeOverride: PropTypes.bool,
    }),
  ),
  onFileListChange: PropTypes.func,
};
