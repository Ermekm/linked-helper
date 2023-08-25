import { Template } from "../../types";

export const templateWithoutConditions: Template = {
    0: {
        id: 0,
        text: "I'm writing to connect with you",
        conditions: []
    }
}

export const templateWithOneCondition: Template = {
    0: {
        id: 0,
        text: "Hi,",
        conditions: [
            {
                id: 2,
                if: "{firstname}",
                then: 3,
                else: 4,
                additionalText: "bye"
            }
        ]
    },
    3: {
        id: 3,
        text: "{firstname}, I'm writing to connect with you",
        conditions: []
    },
    4: {
        id: 4,
        text: "I'm writing to connect with you",
        conditions: []
    }
}

export const templateWithMultipleConditions: Template = {
    0: {
        id: 0,
        text: "Hi,",
        conditions: [
            {
                id: 2,
                if: "{firstname}",
                then: 3,
                else: 4,
                additionalText: ""
            },
            {
                id: 5,
                if: "{lastname}",
                then: 6,
                else: 7,
                additionalText: ""
            },
            {
                id: 8,
                if: "{company}",
                then: 9,
                else: 10,
                additionalText: "Bye"
            },
        ]
    },
    3: {
        id: 3,
        text: "{firstname}, you appeared in my 'You may know' list.",
        conditions: []
    },
    4: {
        id: 4,
        text: "You appeared in my 'You may know' list.",
        conditions: []
    },
    6: {
        id: 6,
        text: "{lastname}, I'm writing to connect with you.",
        conditions: []
    },
    7: {
        id: 7,
        text: "I'm writing to connect with you.",
        conditions: []
    },
    9: {
        id: 9,
        text: "I'm hoping to expand my network with people from {company}.",
        conditions: []
    },
    10: {
        id: 10,
        text: "I'm hoping to expand my network with people from your company.",
        conditions: []
    }
}

export const templateWithOneNestedCondition: Template = {
    0: {
        id: 0,
        text: "Hi,",
        conditions: [
            {
                id: 2,
                if: "{firstname}",
                then: 3,
                else: 4,
                additionalText: ""
            },
            {
                id: 5,
                if: "{lastname}",
                then: 6,
                else: 7,
                additionalText: ""
            },
            {
                id: 8,
                if: "{company}",
                then: 9,
                else: 10,
                additionalText: "Bye"
            },
        ]
    },
    3: {
        id: 3,
        text: "{firstname}, you appeared in my 'You may know' list.",
        conditions: []
    },
    4: {
        id: 4,
        text: "You appeared in my 'You may know' list.",
        conditions: []
    },
    6: {
        id: 6,
        text: "{lastname}, I'm writing to connect with you.",
        conditions: []
    },
    7: {
        id: 7,
        text: "I'm writing to connect with you.",
        conditions: []
    },
    9: {
        id: 9,
        text: "I'm hoping to expand my network with people from {company}",
        conditions: [
            {
                id: 11,
                if: "{position}",
                then: 12,
                else: 13,
                additionalText: ""
            }
        ]
    },
    10: {
        id: 10,
        text: "I'm hoping to expand my network with people from your company.",
        conditions: []
    },
    12: {
        id: 12,
        text: "with {position} position.",
        conditions: []
    },
    13: {
        id: 13,
        text: "with your position.",
        conditions: []
    }
}

export const templateWithMultipleNestedConditions: Template = {
    0: {
        id: 0,
        text: "Hi,",
        conditions: [
            {
                id: 2,
                if: "{firstname}",
                then: 3,
                else: 13,
                additionalText: "Bye"
            },
        ]
    },
    3: {
        id: 3,
        text: "{firstname}, you appeared in my 'You may know' list.",
        conditions: [
            {
                id: 4,
                if: "{lastname}",
                then: 5,
                else: 6,
                additionalText: ""
            },
            {
                id: 7,
                if: "{company}",
                then: 8,
                else: 9,
                additionalText: ""
            },
            {
                id: 10,
                if: "{position}",
                then: 1,
                else: 12,
                additionalText: ""
            }
        ]
    },
    13: {
        id: 13,
        text: "You appeared in my 'You may know' list. I'd like to connect.",
        conditions: []
    },
    5: {
        id: 5,
        text: "{lastname}, I'm writing to connect with you.",
        conditions: []
    },
    6: {
        id: 6,
        text: "I'm writing to connect with you.",
        conditions: []
    },
    8: {
        id: 8,
        text: "I'm hoping to expand my network with people from {company}",
        conditions: []
    },
    9: {
        id: 9,
        text: "I'm hoping to expand my network with people from your company",
        conditions: []
    },
    1: {
        id: 1,
        text: "with {position} position.",
        conditions: []
    },
    12: {
        id: 12,
        text: "with your position.",
        conditions: []
    }
}