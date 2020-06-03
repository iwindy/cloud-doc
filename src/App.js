import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FilelSearch";
import FileList from "./components/FileList";
import defaultFiles from "./utlis/defaultFiles";

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
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
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>this right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
