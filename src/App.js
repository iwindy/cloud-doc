import React from "react";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
            onTabClick={(id) => {
              console.log(id);
            }}
            activeId="1"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
