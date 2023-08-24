import { ChangeEvent, FC } from "react"
import { Condition, T, Template, TemplateElement } from "../../types"
import { TextareaAutosize } from "../TextareaAutosize/TextareaAutosize"
import cls from "./IfThenElse.module.css"
import { classNames } from "../../helpers/className"

interface IfThenElseProps {
    template: Template,
    id: number,
    nestingLvl: number,
    label?: string | null,
    setActiveElementId: (id: number) => void,
    setRef: (ref: HTMLTextAreaElement) => void,
    editTemplateEl: (templateEl: TemplateElement) => void,
    setAdditionalTextId: (index: number | null) => void
    setIfId: (index: number | null) => void
    deleteConditionById: (id: number, elementId: number) => void
}

const IfThenElse: FC<IfThenElseProps> = (props) => {
    const {
        template,
        id,
        nestingLvl,
        label,
        setActiveElementId,
        setIfId,
        setRef,
        editTemplateEl,
        setAdditionalTextId,
        deleteConditionById
    } = props
    const indentation = nestingLvl * 20
    const element = template[id]

    const onTemplateElChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newTemplateEl: TemplateElement = { ...element, text: e.target.value }
        editTemplateEl(newTemplateEl)
    }

    const onConditionChange = (e: ChangeEvent<HTMLTextAreaElement>, condition: Condition, key: T) => {
        const newCondition: Condition = { ...condition, [key]: e.target.value }
        const newTemplateEl = { ...element }
        newTemplateEl.conditions = newTemplateEl.conditions.map((cond) => cond.id === newCondition.id ? newCondition : cond)
        editTemplateEl(newTemplateEl)
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
                        // setActiveInputTemplate(template)
                        // setAdditionalTextId(null)
                        // setIfId(null)
                    }}
                    rows={1}
                />
            </div>
            {element.conditions && element.conditions.map((cond) =>
                <div
                    key={cond.id} style={{ marginLeft: `${indentation}px` }}
                >
                    <button
                        onClick={() => deleteConditionById(cond.id, element.id)}
                        className={classNames(cls.deleteBtn, {}, [cls.btn])}
                    >Delete</button>
                    <div className={cls.textareaWrapper}>
                        <label className={classNames(cls.label, {}, [cls.if])}>if</label>
                        <TextareaAutosize
                            className={cls.textarea}
                            value={cond.if}
                            name="if"
                            data-condition-id={cond.id}
                            onChange={(e) => onConditionChange(e, cond, 'if')}
                            onFocus={(e) => {
                                setRef(e.target)
                                setActiveElementId(element.id)
                                // setActiveInputTemplate(template)
                                // setAdditionalTextId(null)
                                // setIfId(el.id)
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
                        setIfId={setIfId}
                        setAdditionalTextId={setAdditionalTextId}
                        deleteConditionById={deleteConditionById} />
                    <IfThenElse
                        template={template}
                        id={cond.else}
                        label={"else"}
                        nestingLvl={nestingLvl + 1}
                        editTemplateEl={editTemplateEl}
                        setRef={setRef}
                        setActiveElementId={setActiveElementId}
                        setIfId={setIfId}
                        setAdditionalTextId={setAdditionalTextId}
                        deleteConditionById={deleteConditionById}
                    />
                    <TextareaAutosize
                        className={cls.textarea}
                        value={cond.additionalText}
                        onChange={(e) => onConditionChange(e, cond, 'additionalText')}
                        name="additionalText"
                        data-condition-id={cond.id}
                        onFocus={(e) => {
                            setRef(e.target)
                            setActiveElementId(element.id)
                            // setActiveInputTemplate(JSON.parse(JSON.stringify(template)))
                            // setAdditionalTextId(el.id)
                            // setIfId(null)
                        }}
                        rows={1}
                    />
                </div>
            )}
        </div>
    )
}

export default IfThenElse