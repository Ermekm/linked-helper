import { Condition, Template, TemplateElement } from "../types"
import * as Constants from '../constansts/index'

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function createId(): number {
    return Date.now() + getRandomInt(1000)
}

export function createTemplate(arrVarNames: string[]): Template {
    const newTemplate = {
        arrVarNames,
        elements: {
            [Constants.ROOT_ELEMENT_ID]: {
                id: Constants.ROOT_ELEMENT_ID,
                text: "",
                conditions: []
            }
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

// createCondition() returns array of condition and two template elements
// Ids of template elements will be saved in then else fields of condition
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