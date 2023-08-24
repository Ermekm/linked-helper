export type T = 'if' | 'additionalText'

export interface Template {
    [key: string]: TemplateElement
}

export interface TemplateElement {
    id: number;
    text: string;
    conditions: Condition[]
}

export interface Condition {
    id: number;
    if: string;
    then: number;  //id of the template element
    else: number;  //id of the template element
    additionalText: string;
}

// export interface Template {
//     id: number,
//     text: string;
//     condition: {
//         id: number,
//         if: string;
//         then: Template;
//         else: Template;
//         additionalText: string;
//     }[]
// }

// export interface Condition {
//     id: number
//     if: string;
//     then: Template;
//     else: Template;
//     additionalText: string;
// }
