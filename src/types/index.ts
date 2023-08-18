export interface Template {
    id: number,
    text: string;
    condition: {
        id: number,
        if: string;
        then: Template;
        else: Template;
        additionalText: string;
    }[]
}

export interface Condition {
    id: number
    if: string;
    then: Template;
    else: Template;
    additionalText: string;
}
