import { Template } from "../../types";

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

// function generateMsg(template: Template, values: object): string {
//     let str = insertValues(template.text, values);
//     template.condition.forEach(cond => {
//         if (insertValues(cond.if, values)) {
//             str += generateMsg(cond.then, values)
//         } else {
//             str += generateMsg(cond.else, values)
//         }
//         str += cond.additionalText ? " " + cond.additionalText : ""
//     })

//     return " " + str;
// }

// export function msgGenerator(template: Template, values: object): string {
//     return generateMsg(template, values).trim()
// }

export function msgGenerator(template: Template, values: object): string {
    return ""
}

