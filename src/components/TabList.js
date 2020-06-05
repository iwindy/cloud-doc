import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  return (
    <ul className="nav nav-pills">
      {files.map((file) => {
        const fClassName = classNames({
          "nav-link": true,
          active: file.id === activeId,
        });
        return (
          <li className="nav-item" key={file.id}>
            <a
              className={fClassName}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span className="ml-2">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
