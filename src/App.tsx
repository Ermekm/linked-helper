import { useEffect, useRef, useState } from 'react';
import './App.css';
import MsgTemplateEditor from './components/MsgTemplateEditor/MsgTemplateEditor';
import { Drawer } from './components/Drawer/Drawer';
import { Template } from './types';

const arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ["firstname", "lastname", "company", "position"];
const template = localStorage.template ? JSON.parse(localStorage.template) : null

function App() {
  const [msgTemplateEditorActive, setMsgTemplateEditorActive] = useState<boolean>(false)

  const callbackSave = (template: Template) => {
    localStorage.setItem("template", JSON.stringify(template))
  }

  return (
    <div className="App">
      <button
        onClick={() => setMsgTemplateEditorActive(true)}
        className="editMsgBtn"
      >Message Editor</button>
      <Drawer isActive={msgTemplateEditorActive} onClose={() => setMsgTemplateEditorActive(false)}>
        <MsgTemplateEditor
          arrVarNames={arrVarNames}
          template={template}
          callbackSave={callbackSave}
          onClose={() => setMsgTemplateEditorActive(false)} />
      </Drawer>
    </div>
  );
}

export default App;
