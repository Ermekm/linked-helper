import { Template, TemplateElement } from "../../types";
import * as Constants from "../../constansts/index"

// Takes string as an argument and inserts values in the string
function insertValues(str: string, values: Record<string, string>, arrVarNames: string[]): string {
    let ans = str;

    const placeholderPattern = /\{(\w+)\}/g;

    // Replace placeholders with corresponding values
    ans = ans.replace(placeholderPattern, (match, key) => {
        if (values.hasOwnProperty(key)) {
            return values[key];
        }
        return match; // Keep unmatched placeholders
    });

    // Remove placeholders corresponding to variable names
    arrVarNames.forEach((varName) => {
        if (!values.hasOwnProperty(varName)) {
            const varPlaceholder = "{" + varName + "}";
            ans = ans.split(varPlaceholder).join('');
        }
    });

    return ans;
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

