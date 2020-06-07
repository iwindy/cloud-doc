import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({ files, onFlieClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeSearch = () => {
    setEditStatus(false);
    setValue("");
  };
  useEffect(() => {
    if (enterPressed && editStatus) {
      const editItem = files.find((file) => file.id === editStatus);
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue("");
    }

    if (escPressed && editStatus) {
      closeSearch();
    }
    /* const handleInputEven = (event) => {
      const { keyCode } = event;
      if (keyCode === 13 && editStatus) {
        const editItem = files.find((file) => file.id === editStatus);
        onSaveEdit(editItem.id, value);
        setEditStatus(false);
        setValue("");
      } else if (keyCode === 27 && editStatus) {
        closeSearch(event);
      }
    };
    document.addEventListener("keyup", handleInputEven);
    return () => {
      document.removeEventListener("keyup", handleInputEven);
    }; */
  });
  return (
    <ul className="list-group list-group-flush">
      {files.map((file) => (
        <li className="list-group-item bg-light row d-flex mx-0" key={file.id}>
          {file.id !== editStatus && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => {
                  onFlieClick(file.id);
                }}
              >
                {file.title}
              </span>
              <span className="icon-button col-2">
                <FontAwesomeIcon
                  title="编辑"
                  onClick={() => {
                    setEditStatus(file.id);
                    setValue(file.title);
                  }}
                  size="lg"
                  icon={faEdit}
                />
              </span>
              <span className="icon-button col-2">
                <FontAwesomeIcon
                  title="删除"
                  onClick={() => {
                    onFileDelete(file.id);
                  }}
                  size="lg"
                  icon={faTrash}
                />
              </span>
            </>
          )}
          {file.id === editStatus && (
            <>
              <input
                type="text"
                className="form-control col-10"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={closeSearch}
              >
                <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

FileList.propTypes = {
  files: PropTypes.array,
  onFlieClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
};

export default FileList;
