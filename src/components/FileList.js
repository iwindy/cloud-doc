import React, { useState, useEffect, useRef } from "react";
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
  const node = useRef(null);

  const closeSearch = (editItem) => {
    setEditStatus(false);
    setValue("");

    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };
  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() !== "") {
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue("");
    }

    if (escPressed && editStatus) {
      closeSearch(editItem);
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

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  useEffect(() => {
    if (editStatus) {
      node.current.focus();
    }
  }, [editStatus]);

  return (
    <ul className="list-group list-group-flush">
      {files.map((file) => (
        <li className="list-group-item bg-light row d-flex mx-0" key={file.id}>
          {file.id !== editStatus && !file.isNew && (
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
          {(file.id === editStatus || file.isNew) && (
            <>
              <input
                ref={node}
                type="text"
                placeholder="请输入文件名称"
                className="form-control col-10"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => closeSearch(file)}
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
