import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
) => {
    useEffect(() => {
        if (textAreaRef) {
            // Reseting the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight + 2;
            // Setting new height
            textAreaRef.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
