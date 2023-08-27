export type ConditionTextFields = 'if' | 'additionalText'

export interface Template {
    arrVarNames: string[]
    elements: {
        [key: string]: TemplateElement;
    }
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

export interface IModalContext {
    start: () => void,
    destroy: () => void,
    setContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
    content: JSX.Element | null,
    isActive: boolean,
}
