import { FC, useContext, useRef, useState } from 'react'
import IfThenElse from '../IfThenElse/IfThenElse';
import { ConditionTextFields, IModalContext, Template, TemplateElement } from '../../types';
import { Modal } from '../Modal/Modal';
import { TemplatePreview } from '../TemplatePreview/TemplatePreview';
import { createCondition, createTemplate } from '../../helpers';
import * as Constants from "../../constansts/index"
import { classNames } from '../../helpers/className';

import cls from './MsgTemplateEditor.module.css'
import { ModalContext } from '../../context/modalContext';

interface MsgTemplateEditorProps {
    arrVarNames: string[],
    initialTemplate?: Template | null,
    callbackSave: (template: Template) => void,
    onClose?: () => void
}

const MsgTemplateEditor: FC<MsgTemplateEditorProps> = ({ arrVarNames, initialTemplate, callbackSave, onClose }) => {
    const [template, setTemplate] = useState<Template>(initialTemplate || createTemplate(arrVarNames)) // If the template from the props is null create empty template
    const [activeElementId, setActiveElementId] = useState<number>(Constants.ROOT_ELEMENT_ID)
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const modal = useContext(ModalContext) as IModalContext


    // Function that inserts variable name in the text input
    const insertVarNameInInput = (value: string): void => {
        const elements = template.elements
        const elementId = elements[activeElementId] ? activeElementId : Constants.ROOT_ELEMENT_ID
        const conditionId = inputRef.current?.dataset?.conditionId // id of condition to instert text is saved in data-* attribute
        const conditionToEdit = elements[elementId].conditions.find(cond => cond.id === Number(conditionId))
        const cursorPosition = inputRef.current?.selectionStart || 0;
        const valueToInput = "{" + value + "}"
        if (conditionToEdit) {
            if (!inputRef.current?.name) return
            const key = inputRef.current?.name as ConditionTextFields // field of condition to insert text is saved in data-* attribute 
            if (!conditionToEdit) return
            const elementValue = conditionToEdit[key]
            const textToInput = elementValue.slice(0, cursorPosition) + valueToInput + elementValue.slice(cursorPosition)
            setTemplate((prev) => {
                const templateCopy = {
                    ...prev,
                    elements: {
                        ...prev.elements,
                        [elementId]: {
                            ...prev.elements[elementId],
                            conditions: prev.elements[elementId].conditions.map(cond => {
                                return cond.id === Number(conditionId)
                                    ? { ...cond, [key]: textToInput }
                                    : cond
                            }
                            )
                        }
                    }
                }
                return templateCopy
            })
        } else {
            const elementValue = elements[elementId].text;
            const textToInput = elementValue.slice(0, cursorPosition) + valueToInput + elementValue.slice(cursorPosition)
            setTemplate((prev) => {
                const templateCopy = { ...prev, elements: { ...prev.elements, [elementId]: { ...prev.elements[elementId], text: textToInput } } }
                return templateCopy
            })
        }
    };

    // Adds new condition to the template
    const addNewCondition = (): void => {
        // createCondition() function returns newCondition and template elements. 
        // Ids of template elements was saved in then, else fields of condition
        const [newCondition, newThenTemplateEl, newElseTemplateEl] = createCondition()
        const elementId = template.elements[activeElementId] ? activeElementId : Constants.ROOT_ELEMENT_ID  // if activeElement was deleted insert condition in root element
        const templateCopy: Template = {
            ...template,
            elements: {
                ...template.elements,
                [elementId]: {
                    ...template.elements[elementId],
                    conditions: [
                        newCondition,
                        ...template.elements[elementId].conditions
                    ]
                },
                [newThenTemplateEl.id]: newThenTemplateEl,
                [newElseTemplateEl.id]: newElseTemplateEl
            }
        }
        setTemplate(templateCopy)
    }


    // Deletes condition by id
    const deleteConditionById = (conditionId: number, elementId: number): void => {
        const conditionToDelete = template.elements[elementId].conditions.find(cond => cond.id === conditionId)
        if (!conditionToDelete) return
        deleteAllChildren(conditionToDelete.then)
        deleteAllChildren(conditionToDelete.else)
        function deleteAllChildren(elementId: number) {
            const element = template.elements[elementId]
            element.conditions.forEach((cond) => {
                deleteAllChildren(cond.then)
                deleteAllChildren(cond.else)
            })
            setTemplate((prev) => {
                const templateCopy = { ...prev, elements: { ...prev.elements } }
                delete templateCopy.elements[elementId]
                return templateCopy
            })
        }
        setTemplate((prev) => {
            const newConditions = prev.elements[elementId].conditions.filter(cond => cond.id !== conditionId)
            const templateCopy = { ...prev, elements: { ...prev.elements, [elementId]: { ...prev.elements[elementId], conditions: newConditions } } }
            return templateCopy
        })
    }

    // Takes updated template element as argument
    // changes old template element with the same id with the updated one
    const editTemplateEl = (templateEl: TemplateElement): void => {
        setTemplate((prev) => {
            const newTemplate: Template = { ...prev, elements: { ...prev.elements } };
            newTemplate.elements[templateEl.id] = templateEl
            return newTemplate
        })
    }

    const handleSave = () => {
        try {
            callbackSave(template)
            alert('Template has been saved')
        } catch (error) {
            alert('Something went wrong')
            console.log(error)
        }
    }

    const setRef = (ref: HTMLTextAreaElement) => {
        inputRef.current = ref
    }

    const openTemplatePreview = () => {
        modal.start()
        modal.setContent(<TemplatePreview arrVarNames={arrVarNames} template={template} />)
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
                id={Constants.ROOT_ELEMENT_ID}
                editTemplateEl={editTemplateEl}
                setRef={setRef}
                setActiveElementId={setActiveElementId}
                deleteConditionById={deleteConditionById}
            />
            <button
                onClick={openTemplatePreview}
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
            <Modal />
        </div>
    )
}

export default MsgTemplateEditor