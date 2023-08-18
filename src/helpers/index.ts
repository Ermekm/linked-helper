import { Condition, Template } from "../types"

function createId(): number {
    return Date.now() + Math.random()
}

export function createTemplate(): Template {
    const newTemplate = {
        id: createId(),
        text: "",
        condition: []
    }
    return newTemplate
}

export function createCondition(): Condition {
    const newCondition = {
        id: createId(),
        if: "",
        then: {
            id: createId(),
            text: "",
            condition: []
        },
        else: {
            id: createId(),
            text: "",
            condition: []
        },
        additionalText: ""
    }
    return newCondition
}