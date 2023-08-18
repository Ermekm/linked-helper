import { Template } from "../../types";

export const templateWithoutConditions: Template = {
    id: 1,
    text: "I'm writing to connect with you",
    condition: []
}

export const templateWithOneCondition: Template = {
    id: 1,
    text: "Hi,",
    condition: [
        {
            id: 2,
            if: "{firstname}",
            then: {
                id: 3,
                text: "{firstname}, I'm writing to connect with you",
                condition: []
            },
            else: {
                id: 4,
                text: "I'm writing to connect with you",
                condition: []
            },
            additionalText: "bye"
        }
    ]
}

export const templateWithMultipleConditions: Template = {
    id: 1,
    text: "Hi,",
    condition: [
        {
            id: 2,
            if: "{firstname}",
            then: {
                id: 3,
                text: "{firstname}, you appeared in my 'You may know' list.",
                condition: []
            },
            else: {
                id: 4,
                text: "You appeared in my 'You may know' list.",
                condition: []
            },
            additionalText: ""
        },
        {
            id: 5,
            if: "{lastname}",
            then: {
                id: 6,
                text: "{lastname}, I'm writing to connect with you.",
                condition: []
            },
            else: {
                id: 7,
                text: "I'm writing to connect with you.",
                condition: []
            },
            additionalText: ""
        },
        {
            id: 8,
            if: "{company}",
            then: {
                id: 9,
                text: "I'm hoping to expand my network with people from {company}.",
                condition: []
            },
            else: {
                id: 10,
                text: "I'm hoping to expand my network with people from your company.",
                condition: []
            },
            additionalText: "Bye"
        },
    ]
}

export const templateWithOneNestedCondition: Template = {
    id: 1,
    text: "Hi,",
    condition: [
        {
            id: 2,
            if: "{firstname}",
            then: {
                id: 3,
                text: "{firstname}, you appeared in my 'You may know' list.",
                condition: []
            },
            else: {
                id: 4,
                text: "You appeared in my 'You may know' list.",
                condition: []
            },
            additionalText: ""
        },
        {
            id: 5,
            if: "{lastname}",
            then: {
                id: 6,
                text: "{lastname}, I'm writing to connect with you.",
                condition: []
            },
            else: {
                id: 7,
                text: "I'm writing to connect with you.",
                condition: []
            },
            additionalText: ""
        },
        {
            id: 8,
            if: "{company}",
            then: {
                id: 9,
                text: "I'm hoping to expand my network with people from {company}",
                condition: [
                    {
                        id: 11,
                        if: "{position}",
                        then: {
                            id: 12,
                            text: "with {position} position.",
                            condition: []
                        },
                        else: {
                            id: 13,
                            text: "with your position.",
                            condition: []
                        },
                        additionalText: ""
                    }
                ]
            },
            else: {
                id: 10,
                text: "I'm hoping to expand my network with people from your company.",
                condition: []
            },
            additionalText: "Bye"
        },
    ]
}

export const templateWithMultipleNestedConditions: Template = {
    id: 1,
    text: "Hi,",
    condition: [
        {
            id: 2,
            if: "{firstname}",
            then: {
                id: 3,
                text: "{firstname}, you appeared in my 'You may know' list.",
                condition: [
                    {
                        id: 4,
                        if: "{lastname}",
                        then: {
                            id: 5,
                            text: "{lastname}, I'm writing to connect with you.",
                            condition: []
                        },
                        else: {
                            id: 6,
                            text: "I'm writing to connect with you.",
                            condition: []
                        },
                        additionalText: ""
                    },
                    {
                        id: 7,
                        if: "{company}",
                        then: {
                            id: 8,
                            text: "I'm hoping to expand my network with people from {company}",
                            condition: []
                        },
                        else: {
                            id: 9,
                            text: "I'm hoping to expand my network with people from your company",
                            condition: []
                        },
                        additionalText: ""
                    },
                    {
                        id: 10,
                        if: "{position}",
                        then: {
                            id: 1,
                            text: "with {position} position.",
                            condition: []
                        },
                        else: {
                            id: 12,
                            text: "with your position.",
                            condition: []
                        },
                        additionalText: ""
                    }
                ]
            },
            else: {
                id: 13,
                text: "You appeared in my 'You may know' list. I'd like to connect.",
                condition: []
            },
            additionalText: "Bye"
        },
    ]
}