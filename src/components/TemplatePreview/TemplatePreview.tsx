import { FC, useEffect, useState } from 'react';
import cls from './TemplatePreview.module.css'
import { Template } from '../../types';
import { msgGenerator } from '../../helpers/msgGenerator/msgGenerator';

interface InputValues {
    [key: string]: string;
}

interface TemplatePreviewProps {
    arrVarNames: string[],
    template: Template,
    onClose: () => void
}

export const TemplatePreview: FC<TemplatePreviewProps> = ({ arrVarNames, template, onClose }) => {
    const [inputValues, setInputValues] = useState<InputValues>(createObjectFromArray(arrVarNames));
    const [msg, setMsg] = useState<string>(msgGenerator(template, inputValues))

    useEffect(() => {
        setMsg(msgGenerator(template, inputValues))
    }, [inputValues, template])

    const handleInputChange = (placeholder: string, value: string) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [placeholder]: value,
        }));
    };

    function createObjectFromArray(array: string[]): { [key: string]: string } {
        const result: InputValues = {};
        for (const item of array) {
            result[item] = '';
        }
        return result;
    }

    return (
        <div className={cls.preview}>
            <h2>Message Preview</h2>
            <div className={cls.preview__text}>{msg}</div>
            <h3>Variables</h3>
            <div className={cls.preview__vars}>
                {arrVarNames.map((el, index) =>
                    <input type="text"
                        className={cls.preview__var}
                        key={index}
                        placeholder={el}
                        value={inputValues[el]}
                        onChange={(e) => handleInputChange(el, e.target.value)}
                    />
                )}
            </div>
            <button
                className={cls.preview__close}
                onClick={onClose}
            >close</button>
        </div>
    )
}