import { FC, useEffect, useRef, useState } from 'react'
import IfThenElse from '../IfThenElse/IfThenElse';
import { Condition, Template } from '../../types';
import { Modal } from '../Modal/Modal';
import { TemplatePreview } from '../TemplatePreview/TemplatePreview';
import { createCondition, createTemplate } from '../../helpers';
import { classNames } from '../../helpers/className';

import cls from './MsgTemplateEditor.module.css'

interface MsgTemplateEditorProps {
    arrVarNames: string[],
    template?: Template | null,
    callbackSave: (template: Template) => void,
    onClose?: () => void
}

const MsgTemplateEditor: FC<MsgTemplateEditorProps> = ({ arrVarNames, template, callbackSave, onClose }) => {
    const [templateData, setTemplateData] = useState<Template>(template || createTemplate()) // If the template from the props is null create empty template
    const [activeInputTemplate, setActiveInputTemplate] = useState<Template>(JSON.parse(JSON.stringify(templateData)))
    const [additionalTextIndex, setAdditionalTextIndex] = useState<number | null>(null)
    const [ifIndex, setIfIndex] = useState<number | null>(null)
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false)

    useEffect(() => {
        console.log(templateData)
    }, [templateData])


    // Function that inserts variable name in the text input
    const insertVarNameInInput = (value: string): void => {
        const inputValue = inputRef.current?.value || "";
        const cursorPosition = inputRef.current?.selectionStart || 0;
        const valueToInput = "{" + value + "}"
        const activeInputTemplateCopy = JSON.parse(JSON.stringify(activeInputTemplate))

        // Update the input value by inserting the new text at the cursor position
        if (additionalTextIndex !== null) {
            if (activeInputTemplateCopy.condition) {
                let templateCopy = JSON.parse(JSON.stringify(activeInputTemplate))
                let condition = templateCopy.condition[additionalTextIndex]
                condition.additionalText = inputValue.slice(0, cursorPosition) + valueToInput + condition.additionalText.slice(cursorPosition)

                const updateTemplate = (object: Template, id: number, newData: Template): Template => {
                    if (object.id === id) {
                        return { ...object, ...newData };
                    }
                    if (object.condition) {
                        const updatedConditions = object.condition.map(condition => ({
                            ...condition,
                            then: condition.then && updateTemplate(condition.then, id, newData),
                            else: condition.else && updateTemplate(condition.else, id, newData)
                        }));
                        return { ...object, condition: updatedConditions };
                    }

                    return object;
                };

                setTemplateData((prev) => {
                    const newCopy = JSON.parse(JSON.stringify(updateTemplate(prev, activeInputTemplate.id, templateCopy)))
                    console.log(newCopy.condition[0].additionalText)
                    return newCopy
                })

                // let condition = activeInputTemplate.condition[additionalTextIndex]
                // condition.additionalText = inputValue.slice(0, cursorPosition) + valueToInput + condition.additionalText.slice(cursorPosition)
            }
        } else if (ifIndex !== null) {
            if (activeInputTemplate.condition) {
                let condition = activeInputTemplate.condition[ifIndex]
                condition.if = inputValue.slice(0, cursorPosition) + valueToInput + condition.if.slice(cursorPosition)
            }
        }
        else {
            activeInputTemplate.text = inputValue.slice(0, cursorPosition) + valueToInput + activeInputTemplate.text.slice(cursorPosition)
        }
        // editTemplateData(activeInputTemplate.id, activeInputTemplate)

        // Move the cursor to the end of the textarea
        if (inputRef.current) inputRef.current.focus()
    };


    const addNewCondition = (): void => {
        // Recursive function that takes template and id of template to which condition needs to be added as an argument ans returns updated template
        const updateTemplate = (template: Template, id: number): Template => {
            const newCondition: Condition = createCondition()
            if (template.id === id) {
                const newConditions = [...template.condition]
                newConditions.unshift(newCondition)
                return { ...template, condition: newConditions };
            }
            if (template.condition) {
                const updatedConditions = template.condition.map(condition => ({
                    ...condition,
                    then: condition.then && updateTemplate(condition.then, id),
                    else: condition.else && updateTemplate(condition.else, id)
                }));
                return { ...template, condition: updatedConditions };
            }
            return JSON.parse(JSON.stringify(template));
        };

        setTemplateData(prev => {
            if (!prev) return prev
            return updateTemplate(prev, activeInputTemplate?.id)
        })
    }


    // Takes id of template that needs to be updated and updatedTemplate. 
    // Looks for template with the same id as the id from the arguments and changes it to the updatedTemplate from the arguments.
    const editTemplateData = (id: number, updatedTemplate: Template): void => {

        // Recursive function that performs edition of template
        const updateTemplate = (object: Template, id: number, newData: Template): Template => {
            if (object.id === id) {
                return { ...object, ...newData };
            }
            if (object.condition) {
                const updatedConditions = object.condition.map(condition => ({
                    ...condition,
                    then: condition.then && updateTemplate(condition.then, id, newData),
                    else: condition.else && updateTemplate(condition.else, id, newData)
                }));
                return { ...object, condition: updatedConditions };
            }

            return object;
        };

        setTemplateData((prev) => {
            if (!prev) return prev;
            return updateTemplate(prev, id, updatedTemplate)
        })
    }


    // Deletes condition by id
    const deleteConditionById = (conditionId: number) => {

        // Recursive function that performes deletion
        function updateTemplate(template: Template, conditionIdToDelete: number): Template {
            const newTemplate: Template = {
                id: template.id,
                text: template.text,
                condition: template.condition.map((condition) => {
                    if (condition.id === conditionIdToDelete) {
                        return undefined; // Mark the condition to be removed
                    }

                    const newCondition: Condition = {
                        ...condition,
                    };

                    if (condition.then) {
                        newCondition.then = updateTemplate(condition.then, conditionIdToDelete); // Recurse into "then" template
                    }

                    if (condition.else) {
                        newCondition.else = updateTemplate(condition.else, conditionIdToDelete); // Recurse into "else" template
                    }

                    return newCondition;
                }).filter(Boolean) as Condition[], // Remove undefined conditions
            };

            return newTemplate;
        }

        const updatedTemplate = updateTemplate(templateData, conditionId)
        setTemplateData({ ...updatedTemplate })
        setActiveInputTemplate({ ...updatedTemplate })
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
                template={templateData}
                nestingLvl={0}
                editTemplateData={editTemplateData}
                setRef={setRef}
                setActiveInputTemplate={setActiveInputTemplate}
                setIfIndex={setIfIndex}
                setAdditionalTextIndex={setAdditionalTextIndex}
                deleteTemplateById={deleteConditionById}
            />
            <button
                onClick={() => setModalActive(true)}
                className={classNames(cls.previewBtn, {}, [cls.btn])}
            >Preview</button>
            <button
                onClick={() => callbackSave(templateData)}
                className={classNames(cls.saveBtn, {}, [cls.btn])}
            >Save</button>
            <button
                onClick={onClose}
                className={classNames(cls.closeBtn, {}, [cls.btn])}
            >Close</button>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <TemplatePreview arrVarNames={arrVarNames} template={templateData} onClose={() => setModalActive(false)} ></TemplatePreview>
            </Modal>
        </div>
    )
}

export default MsgTemplateEditor