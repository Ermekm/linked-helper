import { FC, useRef, useState } from 'react'
import IfThenElse from '../IfThenElse/IfThenElse';
import { T, Template, TemplateElement } from '../../types';
import { Modal } from '../Modal/Modal';
import { TemplatePreview } from '../TemplatePreview/TemplatePreview';
import { createCondition, createTemplate } from '../../helpers';
import { classNames } from '../../helpers/className';

import cls from './MsgTemplateEditor.module.css'

interface MsgTemplateEditorProps {
    arrVarNames: string[],
    initialTemplate?: Template | null,
    callbackSave: (template: Template) => void,
    onClose?: () => void
}

const MsgTemplateEditor: FC<MsgTemplateEditorProps> = ({ arrVarNames, initialTemplate, callbackSave, onClose }) => {
    const [template, setTemplate] = useState<Template>(initialTemplate || createTemplate()) // If the template from the props is null create empty template
    const [activeElementId, setActiveElementId] = useState<number>(0)
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false)

    // Function that inserts variable name in the text input
    const insertVarNameInInput = (value: string): void => {
        const elementId = template[activeElementId] ? activeElementId : 0
        const conditionId = inputRef.current?.dataset?.conditionId
        const cursorPosition = inputRef.current?.selectionStart || 0;
        const valueToInput = "{" + value + "}"
        if (conditionId) {
            if (!inputRef.current?.name) return
            const key = inputRef.current?.name as T
            const conditionToEdit = template[elementId].conditions.find(cond => cond.id === parseInt(conditionId))
            if (!conditionToEdit) return
            const elementValue = conditionToEdit[key]
            const textToInput = elementValue.slice(0, cursorPosition) + valueToInput + elementValue.slice(cursorPosition)
            setTemplate((prev) => {
                const templateCopy = {
                    ...prev,
                    [elementId]: {
                        ...prev[elementId],
                        conditions: prev[elementId].conditions.map(cond => {
                            return cond.id === parseInt(conditionId)
                                ? { ...cond, [key]: textToInput }
                                : cond
                        }
                        )
                    }
                }
                return templateCopy
            })
        } else {
            const elementValue = template[elementId].text;
            const textToInput = elementValue.slice(0, cursorPosition) + valueToInput + elementValue.slice(cursorPosition)
            setTemplate((prev) => {
                const templateCopy = { ...prev, [elementId]: { ...prev[elementId], text: textToInput } }
                return templateCopy
            })
        }
    };


    const addNewCondition = (): void => {
        const [newCondition, newThenTemplateEl, newElseTemplateEl] = createCondition()
        const elementId = template[activeElementId] ? activeElementId : 0  // if activeElement was deleted insert condition in root element
        const templateCopy: Template = {
            ...template,
            [elementId]: {
                ...template[elementId],
                conditions: [
                    newCondition,
                    ...template[elementId].conditions
                ]
            },
            [newThenTemplateEl.id]: newThenTemplateEl,
            [newElseTemplateEl.id]: newElseTemplateEl
        }
        setTemplate(templateCopy)
    }


    // Deletes condition by id
    const deleteConditionById = (conditionId: number, elementId: number): void => {
        const conditionToDelete = template[elementId].conditions.find(cond => cond.id === conditionId)
        if (!conditionToDelete) return
        deleteAllChildren(conditionToDelete.then)
        deleteAllChildren(conditionToDelete.else)
        function deleteAllChildren(elementId: number) {
            const element = template[elementId]
            element.conditions.forEach((cond) => {
                deleteAllChildren(cond.then)
                deleteAllChildren(cond.else)
            })
            setTemplate((prev) => {
                const templateCopy = { ...prev }
                delete templateCopy[elementId]
                return templateCopy
            })
        }
        setTemplate((prev) => {
            const newConditions = prev[elementId].conditions.filter(cond => cond.id !== conditionId)
            const templateCopy = { ...prev, [elementId]: { ...prev[elementId], conditions: newConditions } }
            return templateCopy
        })
    }

    // Takes id of template that needs to be updated and updatedTemplate. 
    // Looks for template with the same id as the id from the arguments and changes it to the updatedTemplate from the arguments.
    const editTemplateEl = (templateEl: TemplateElement): void => {
        setTemplate((prev) => {
            const newTemplate: Template = { ...prev };
            newTemplate[templateEl.id] = templateEl
            return newTemplate
        })
    }

    const handleSave = () => {
        try {
            callbackSave(template)
        } catch (error) {
            console.log(error)
        }
    }

    const setRef = (ref: HTMLTextAreaElement) => {
        inputRef.current = ref
    }


    return (
        <div>
            <h3>Message Template Editor</h3>
            <div className={cls.varNames}>
                {arrVarNames.map(varName =>
                    <button
                        onClick={() => insertVarNameInInput(varName)}
                        key={varName}
                        className={classNames(cls.varNameBtn, {}, [])}
                    >
                        &#123;{varName}&#125;
                    </button>
                )}
            </div>
            <button
                className={classNames(cls.conditionBtn, {}, [cls.btn])}
                onClick={addNewCondition}
            >if | then | else</button>
            <IfThenElse
                template={template}
                nestingLvl={0}
                id={0}
                editTemplateEl={editTemplateEl}
                setRef={setRef}
                setActiveElementId={setActiveElementId}
                deleteConditionById={deleteConditionById}
            />
            <button
                onClick={() => setModalActive(true)}
                className={classNames(cls.previewBtn, {}, [cls.btn])}
            >Preview</button>
            <button
                onClick={handleSave}
                className={classNames(cls.saveBtn, {}, [cls.btn])}
            >Save</button>
            <button
                onClick={onClose}
                className={classNames(cls.closeBtn, {}, [cls.btn])}
            >Close</button>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <TemplatePreview arrVarNames={arrVarNames} template={template} onClose={() => setModalActive(false)} ></TemplatePreview>
            </Modal>
        </div>
    )
}

export default MsgTemplateEditor