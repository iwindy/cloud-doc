import React, { useState } from "react";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import SimpleMDE from "react-simplemde-editor";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";
import FileSearch from "./components/FilelSearch";
import FileList from "./components/FileList";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import defaultFiles from "./utlis/defaultFiles";

function App() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileId, setActiveFileId] = useState("");
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const openedFiles = openedFileIDs.map((openID) => {
    return files.find((file) => file.id === openID);
  });
  const fileClick = (fileID) => {
    setActiveFileId(fileID);
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };

  const tabClick = (fileID) => {
    setActiveFileId(fileID);
  };

  const closeTab = (id) => {
    const tabsWithout = openedFileIDs.filter((fileID) => fileID !== id);
    setOpenedFileIDs(tabsWithout);
    let tabLen = tabsWithout.length;
    if (tabLen > 0) {
      id === activeFileId && setActiveFileId(tabsWithout[tabLen - 1]);
    } else {
      setActiveFileId("");
    }
  };

  const fileChange = (id, value) => {
    const newFile = files.map((file) => {
      if (file.id === id) {
        file.body = value;
      }
      return file;
    });
    setFiles(newFile);
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };

  const activeFile = files.find((file) => file.id === activeFileId);
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch
            title="我的文档"
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={files}
            onFlieClick={fileClick}
            onFileDelete={(id) => {
              console.log("deleteing", id);
            }}
            onSaveEdit={(id, newValue) => {
              console.log(id, newValue);
            }}
          />
          <div className="row  no-gutters button-group">
            <div className="col">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {!activeFile && (
            <div className="start-page">选择或者创建新的Markdown文档。</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                unsaveIds={unsavedFileIDs}
                activeId={activeFileId}
                onTabClick={tabClick}
                onCloseTab={closeTab}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {
                  fileChange(activeFile.id, value);
                }}
                options={{
                  minHeight: "515px",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
