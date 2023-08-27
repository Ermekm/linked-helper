import { useState } from 'react';
import MsgTemplateEditor from './components/MsgTemplateEditor/MsgTemplateEditor';
import { Drawer } from './components/Drawer/Drawer';
import { Template } from './types';
import useModal from './hooks/useModal';
import { ModalContext } from './context/modalContext';
import './App.css';


function App() {
  const [msgTemplateEditorActive, setMsgTemplateEditorActive] = useState<boolean>(false)
  const modal = useModal();
  const arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ["firstname", "lastname", "company", "position"];
  const template = localStorage.template ? JSON.parse(localStorage.template) : null

  const callbackSave = (template: Template) => {
    localStorage.setItem("template", JSON.stringify(template))
  }

  return (
    <ModalContext.Provider value={{ ...modal }}>
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
    </ModalContext.Provider>
  );
}

export default App;
