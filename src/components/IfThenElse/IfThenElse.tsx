import { ChangeEvent, FC } from "react"
import { Condition, ConditionTextFields, Template, TemplateElement } from "../../types"
import { TextareaAutosize } from "../TextareaAutosize/TextareaAutosize"
import cls from "./IfThenElse.module.css"
import { classNames } from "../../helpers/className"

interface IfThenElseProps {
    template: Template,
    id: number,
    nestingLvl: number,
    label?: string | null,
    setActiveElementId: (id: number) => void,
    setRef: (ref: HTMLTextAreaElement | null) => void,
    editTemplateEl: (templateEl: TemplateElement) => void,
    deleteConditionById: (id: number, elementId: number) => void
}

// Recursive component that renders if then else block
const IfThenElse: FC<IfThenElseProps> = (props) => {
    const {
        template,
        id,
        nestingLvl,
        label,
        setActiveElementId,
        setRef,
        editTemplateEl,
        deleteConditionById
    } = props
    // Identation variable is used for margins of conditions
    const indentation = nestingLvl * 20
    const element = template.elements[id]

    const onTemplateElChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newTemplateEl: TemplateElement = { ...element, text: e.target.value }
        editTemplateEl(newTemplateEl)
    }

    const onConditionChange = (e: ChangeEvent<HTMLTextAreaElement>, condition: Condition, key: ConditionTextFields) => {
        const newCondition: Condition = { ...condition, [key]: e.target.value }
        const newTemplateEl = { ...element }
        newTemplateEl.conditions = newTemplateEl.conditions.map((cond) => cond.id === newCondition.id ? newCondition : cond)
        editTemplateEl(newTemplateEl)
    }

    const onDelete = (conditionId: number, elementId: number): void => {
        deleteConditionById(conditionId, elementId)
        setRef(null)
    }

    if (!element) return null

    return (
        <div>
            <div className={cls.textareaWrapper}>
                {label && <label className={classNames(cls.label, {}, [cls[label]])}>{label}</label>}
                <TextareaAutosize
                    className={cls.textarea}
                    value={element.text}
                    name="text"
                    onChange={onTemplateElChange}
                    onFocus={(e) => {
                        setActiveElementId(element.id)
                        setRef(e.target)
                    }}
                />
            </div>
            {element.conditions && element.conditions.map((cond) =>
                <div
                    key={cond.id} style={{ marginLeft: `${indentation}px` }}
                >
                    <button
                        onClick={() => onDelete(cond.id, element.id)}
                        className={classNames(cls.deleteBtn, {}, [cls.btn])}
                    >Delete</button>
                    <div className={cls.textareaWrapper}>
                        <label className={classNames(cls.label, {}, [cls.if])}>if</label>
                        <TextareaAutosize
                            className={cls.textarea}
                            value={cond.if}
                            name="if" //name is used to determine which field (if or additionalText) of condition to insert varName into
                            data-condition-id={cond.id} // is used to determine id of condition to inster varName
                            onChange={(e) => onConditionChange(e, cond, 'if')}
                            onFocus={(e) => {
                                setRef(e.target)
                                setActiveElementId(element.id)
                            }}
                            rows={1}
                        />
                    </div>
                    <IfThenElse
                        template={template}
                        id={cond.then}
                        label={"then"}
                        nestingLvl={nestingLvl + 1}
                        editTemplateEl={editTemplateEl}
                        setRef={setRef}
                        setActiveElementId={setActiveElementId}
                        deleteConditionById={deleteConditionById} />
                    <IfThenElse
                        template={template}
                        id={cond.else}
                        label={"else"}
                        nestingLvl={nestingLvl + 1}
                        editTemplateEl={editTemplateEl}
                        setRef={setRef}
                        setActiveElementId={setActiveElementId}
                        deleteConditionById={deleteConditionById}
                    />
                    <TextareaAutosize
                        className={cls.textarea}
                        value={cond.additionalText}
                        onChange={(e) => onConditionChange(e, cond, 'additionalText')}
                        name="additionalText" //name is used to determine which field (if or additionalText) of condition to insert varName into
                        data-condition-id={cond.id} // is used to determine id of condition to inster varName
                        onFocus={(e) => {
                            setRef(e.target)
                            setActiveElementId(element.id)
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default IfThenElse