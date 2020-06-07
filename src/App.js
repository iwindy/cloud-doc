import React from "react";
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
            files={defaultFiles}
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
          <div className="row  no-gutters">
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
          <TabList
            files={defaultFiles}
            unsaveIds={["1", "2"]}
            activeId="1"
            onTabClick={(id) => {
              console.log(id);
            }}
            onCloseTab={(id) => {
              console.log("closing ", id);
            }}
          />
          <SimpleMDE
            value={defaultFiles[1].body}
            onChange={(value) => {
              console.log(value);
            }}
            options={{
              minHeight: "515px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
