import { Condition, Template, TemplateElement } from "../types"

function createId(): number {
    return Date.now() + Math.random()
}

export function createTemplate(): Template {
    const newTemplate = {
        0: {
            id: 0,
            text: "",
            conditions: []
        }
    }
    return newTemplate
}

export function createTemplateElement(): TemplateElement {
    const newTemplateEl = {
        id: createId(),
        text: "",
        conditions: []
    }
    return newTemplateEl
}

export function createCondition(): [Condition, TemplateElement, TemplateElement] {
    const newThenTemplateEl = createTemplateElement()
    const newElseTemplateEl = createTemplateElement()

    const newCondition = {
        id: createId(),
        if: "",
        then: newThenTemplateEl.id,
        else: newElseTemplateEl.id,
        additionalText: ""
    }
    return [newCondition, newThenTemplateEl, newElseTemplateEl]
}