import { useState } from 'react';
import './App.css';
import MsgTemplateEditor from './components/MsgTemplateEditor/MsgTemplateEditor';
import { Drawer } from './components/Drawer/Drawer';
import { Template } from './types';

const arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ["firstname", "lastname", "company", "position"];
// const template = localStorage.template ? JSON.parse(localStorage.template) : null
const template: Template = {
  0: {
    id: 0,
    text: "text1",
    conditions: [
      {
        id: 10,
        if: "if",
        then: 3,
        else: 5,
        additionalText: "additionalText"
      }
    ]
  },
  3: {
    id: 3,
    text: "text3",
    conditions: [
      {
        id: 11,
        if: "if",
        then: 6,
        else: 7,
        additionalText: "additionalText"
      }
    ]
  },
  5: {
    id: 5,
    text: "text5",
    conditions: []
  },
  6: {
    id: 6,
    text: "text6",
    conditions: []
  },
  7: {
    id: 7,
    text: "text7",
    conditions: []
  }
}

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
          initialTemplate={template}
          callbackSave={callbackSave}
          onClose={() => setMsgTemplateEditorActive(false)} />
      </Drawer>
    </div>
  );
}

export default App;
