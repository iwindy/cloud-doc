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
            onFlieClick={(id) => {
              console.log(id);
            }}
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
                files={defaultFiles}
                unsaveIds={unsavedFileIDs}
                activeId={activeFileId}
                onTabClick={(id) => {
                  console.log(id);
                }}
                onCloseTab={(id) => {
                  console.log("closing ", id);
                }}
              />
              <SimpleMDE
                value={activeFile}
                onChange={(value) => {
                  console.log(value);
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
