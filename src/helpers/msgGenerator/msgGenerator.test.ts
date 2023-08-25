import { templateWithMultipleConditions, templateWithMultipleNestedConditions, templateWithOneCondition, templateWithOneNestedCondition, templateWithoutConditions } from "./data";
import { msgGenerator } from "./msgGenerator";

const filledValues = {
    firstname: "John",
    lastname: "Doe",
    company: "Google",
    position: "Hiring Recruiter",
}

const emptyValues = {
    firstname: "",
    lastname: "",
    company: "",
    position: "",
}

const oneFilledValue = {
    firstname: "John",
}

const twoFilledValues = {
    firstname: "John",
    lastname: "Doe",
}

const threeFilledValues = {
    firstname: "John",
    lastname: "Doe",
    company: "Google",
}


describe('Message Generator', () => {
    test('Without conditions, with filled values', () => {
        expect(msgGenerator(templateWithoutConditions, filledValues))
            .toBe("I'm writing to connect with you")
    })

    test('Without conditions, with empty values', () => {
        expect(msgGenerator(templateWithoutConditions, emptyValues))
            .toBe("I'm writing to connect with you")
    })

    test('With 1 true condition', () => {
        expect(msgGenerator(templateWithOneCondition, filledValues))
            .toBe("Hi, John, I'm writing to connect with you bye");
    });

    test('With 1 false condition', () => {
        expect(msgGenerator(templateWithOneCondition, emptyValues))
            .toBe("Hi, I'm writing to connect with you bye");
    });

    test('With 4 true conditions', () => {
        expect(msgGenerator(templateWithMultipleConditions, filledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from Google. Bye");
    })

    test('With 4 false conditions', () => {
        expect(msgGenerator(templateWithMultipleConditions, emptyValues))
            .toBe("Hi, You appeared in my 'You may know' list. I'm writing to connect with you. I'm hoping to expand my network with people from your company. Bye");
    })

    test('With 4 mixed conditions', () => {
        expect(msgGenerator(templateWithMultipleConditions, twoFilledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from your company. Bye");
    })

    test('With 1 nested true condition', () => {
        expect(msgGenerator(templateWithOneNestedCondition, filledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from Google with Hiring Recruiter position. Bye");
    })

    test('With 1 nested false condition', () => {
        expect(msgGenerator(templateWithOneNestedCondition, threeFilledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from Google with your position. Bye");
    })

    test('With 3 nested true conditions', () => {
        expect(msgGenerator(templateWithMultipleNestedConditions, filledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from Google with Hiring Recruiter position. Bye");
    })

    test('With 3 nested false conditions', () => {
        expect(msgGenerator(templateWithMultipleNestedConditions, oneFilledValue))
            .toBe("Hi, John, you appeared in my 'You may know' list. I'm writing to connect with you. I'm hoping to expand my network with people from your company with your position. Bye");
    })

    test('With 3 nested mixed conditions', () => {
        expect(msgGenerator(templateWithMultipleNestedConditions, twoFilledValues))
            .toBe("Hi, John, you appeared in my 'You may know' list. Doe, I'm writing to connect with you. I'm hoping to expand my network with people from your company with your position. Bye");
    })
});