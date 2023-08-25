import { Template, TemplateElement } from "../../types";

// Takes string as an argument and inserts values in the string
export function insertValues(str: string, values: any): string {
    let ans = str
    const regex = /\{.*?\}/gm
    for (const key in values) {
        ans = ans.replaceAll("{" + key + "}", values[key])
    }
    ans = ans.replaceAll(regex, "")
    return ans
}

function generateMsg(template: Template, id: number, values: object): string {
    const element: TemplateElement = template[id]
    let str = insertValues(element.text, values);
    element.conditions.forEach(cond => {
        if (insertValues(cond.if, values)) {
            str += generateMsg(template, cond.then, values)
        } else {
            str += generateMsg(template, cond.else, values)
        }
        str += cond.additionalText ? " " + cond.additionalText : ""
    })

    return " " + str;
}

export function msgGenerator(template: Template, values: object): string {
    return generateMsg(template, 0, values).trim()
}

