import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types"

const FileList = ({ files, onFliesClick, onSaveEdit, onFileDelete }) => {
    return (
        <ul className="list-group list-group-flush row">
            {
                files.map(file => (
                    <li className="list-group-item bg-light d-flex" key={file.id}>
                        <span className="col-2"><FontAwesomeIcon size="lg" icon={faMarkdown} /></span>
                        <span className="col-8">{file.title}</span>
                        <span className="icon-button col-1"><FontAwesomeIcon title="编辑" size="lg" icon={faEdit} /></span>
                        <span className="icon-button col-1"><FontAwesomeIcon title="删除" size="lg" icon={faTrash} /></span>
                    </li>
                ))
            }

        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array
}

export default FileList