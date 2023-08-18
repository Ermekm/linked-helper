import { TextareaHTMLAttributes, useRef } from 'react'
import cls from './TextareaAutosize.module.css'
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';

interface TextareaAutosizeProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string
    className?: string
}

export const TextareaAutosize = ({ value, className, ...props }: TextareaAutosizeProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    useAutosizeTextArea(textareaRef.current, value)

    return (
        <textarea
            className={[cls.textarea, className].join(' ')}
            value={value}
            ref={textareaRef}
            rows={1}
            {...props}
        >

        </textarea>
    )
}