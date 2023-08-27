import { FC, useContext, useEffect, useState } from 'react';
import cls from './TemplatePreview.module.css'
import { IModalContext, Template } from '../../types';
import { msgGenerator } from '../../helpers/msgGenerator/msgGenerator';
import { ModalContext } from '../../context/modalContext';

interface InputValues {
    [key: string]: string;
}

interface TemplatePreviewProps {
    arrVarNames: string[],
    template: Template,
}

export const TemplatePreview: FC<TemplatePreviewProps> = ({ arrVarNames, template }) => {
    const [inputValues, setInputValues] = useState<InputValues>(createObjectFromArray(arrVarNames));
    const [msg, setMsg] = useState<string>(msgGenerator(template, inputValues))
    const modal = useContext(ModalContext) as IModalContext

    useEffect(() => {
        setMsg(msgGenerator(template, inputValues))
    }, [inputValues, template])

    const handleInputChange = (placeholder: string, value: string) => {
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [placeholder]: value,
        }));
    };

    // create 'values' object with empty strings for msgGenerator() function
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
                onClick={modal.destroy}
            >close</button>
        </div>
    )
}