import { FC } from "react"
import { Template } from "../../types"
import { TextareaAutosize } from "../TextareaAutosize/TextareaAutosize"
import cls from "./IfThenElse.module.css"
import { classNames } from "../../helpers/className"

interface IfThenElseProps {
    template: Template,
    nestingLvl: number,
    label?: string | null,
    setActiveInputTemplate: (template: Template) => void,
    setRef: (ref: HTMLTextAreaElement) => void,
    editTemplateData: (updatedTemplate: Template) => void,
    setAdditionalTextId: (index: number | null) => void
    setIfId: (index: number | null) => void
    deleteTemplateById: (id: number) => void
}

const IfThenElse: FC<IfThenElseProps> = (props) => {
    const {
        template,
        nestingLvl,
        label,
        setActiveInputTemplate,
        setIfId,
        setRef,
        editTemplateData,
        setAdditionalTextId,
        deleteTemplateById
    } = props

    const indentation = nestingLvl * 20

    return (
        <div>
            <div className={cls.textareaWrapper}>
                {label && <label className={classNames(cls.label, {}, [cls[label]])}>{label}</label>}
                <TextareaAutosize
                    className={cls.textarea}
                    value={template.text}
                    name="text"
                    onChange={(e) => {
                        template.text = e.target.value
                        editTemplateData(template)
                    }}
                    onFocus={(e) => {
                        setRef(e.target)
                        setActiveInputTemplate(template)
                        setAdditionalTextId(null)
                        setIfId(null)
                    }}
                    rows={1}
                    autoFocus={nestingLvl === 0}
                />
            </div>
            {template.condition && template.condition.map((el, index) =>
                <div
                    key={el.id} style={{ marginLeft: `${indentation}px` }}
                >
                    <button
                        onClick={() => {
                            deleteTemplateById(el.id)
                        }}
                        className={classNames(cls.deleteBtn, {}, [cls.btn])}
                    >Delete</button>
                    <div className={cls.textareaWrapper}>
                        <label className={classNames(cls.label, {}, [cls.if])}>if</label>
                        <TextareaAutosize
                            className={cls.textarea}
                            value={template.condition[index].if}
                            name="if"
                            data-index={index}
                            onChange={(e) => {
                                if (!template.condition) return
                                template.condition[index].if = e.target.value
                                editTemplateData(template)
                            }}
                            onFocus={(e) => {
                                setRef(e.target)
                                setActiveInputTemplate(template)
                                setAdditionalTextId(null)
                                setIfId(el.id)
                            }}
                            rows={1}
                        />
                    </div>
                    <IfThenElse
                        template={el.then}
                        label={"then"}
                        nestingLvl={nestingLvl + 1}
                        editTemplateData={editTemplateData}
                        setRef={setRef}
                        setActiveInputTemplate={setActiveInputTemplate}
                        setIfId={setIfId}
                        setAdditionalTextId={setAdditionalTextId}
                        deleteTemplateById={deleteTemplateById} />
                    <IfThenElse
                        template={el.else}
                        label={"else"}
                        nestingLvl={nestingLvl + 1}
                        editTemplateData={editTemplateData}
                        setRef={setRef}
                        setActiveInputTemplate={setActiveInputTemplate}
                        setIfId={setIfId}
                        setAdditionalTextId={setAdditionalTextId}
                        deleteTemplateById={deleteTemplateById}
                    />
                    <TextareaAutosize
                        className={cls.textarea}
                        value={el.additionalText}
                        onChange={(e) => {
                            if (!template.condition) return
                            template.condition[index].additionalText = e.target.value
                            editTemplateData(template)
                        }}
                        name="additionalText"
                        onFocus={(e) => {
                            setRef(e.target)
                            setActiveInputTemplate(JSON.parse(JSON.stringify(template)))
                            setAdditionalTextId(el.id)
                            setIfId(null)
                        }}
                        rows={1}
                    />
                </div>
            )}
        </div>
    )
}

export default IfThenElse