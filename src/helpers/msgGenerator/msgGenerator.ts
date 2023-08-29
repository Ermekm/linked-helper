import { Template, TemplateElement } from "../../types";
import * as Constants from "../../constansts/index"

// Takes string as an argument and inserts values in the string
function insertValues(str: string, values: { [key: string]: string }, arrVarNames: string[]): string {
    let ans = str
    for (const key in values) {
        ans = ans.replaceAll("{" + key + "}", values[key])
    }
    arrVarNames.forEach((varName) => {
        ans = ans.replaceAll("{" + varName + "}", '')
    })
    return ans
}

// Takes a template, an element ID, and variable values. 
// Recursively generates a message and returns the resulting message string
function generateMsg(template: Template, id: number, values: { [key: string]: string }): string {
    const element: TemplateElement = template.elements[id]
    let str = insertValues(element.text, values, template.arrVarNames);
    element.conditions.forEach(cond => {
        if (insertValues(cond.if, values, template.arrVarNames)) {
            str += generateMsg(template, cond.then, values)
        } else {
            str += generateMsg(template, cond.else, values)
        }
        const additionalText = insertValues(cond.additionalText, values, template.arrVarNames)
        str += additionalText
    })

    return str;
}

export function msgGenerator(template: Template, values: { [key: string]: string }): string {
    return generateMsg(template, Constants.ROOT_ELEMENT_ID, values)
}

