import React, { FC, useState } from 'react';
import { InputProps } from './Input.interface';
import { InputStyled } from './Input.styled';
import { LabelStyled } from './Input.styled';
import { DivStyled } from './Input.styled';


    /*########### COMPONENT ###########*/
export const Input: FC<InputProps> = ({autoFocus, mx, maxWidth, textPlaceholder, textAlign, fluid, id, componentSize, hasLabel, ...rest}) => {
    const [inputState, setInputState] = useState<string>("");



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputState(e.currentTarget.value);

        rest.handleChange && rest.handleChange(e.currentTarget.value)
        // if a parent has sent a handle change callback function, update state of parent
        };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === 'Enter') {
            console.log(inputState);
        }
    };

    return (
        <DivStyled mx={mx} fluid={fluid} maxWidth={maxWidth} componentSize={componentSize}>
        <InputStyled aria-invalid={false} aria-labelledby={id} autoFocus={autoFocus} value={inputState} textAlign={textAlign} fluid={fluid} componentSize={componentSize} placeholder={textPlaceholder} onKeyDown={handleKeyDown} onChange={handleChange}  />
        {hasLabel && <LabelStyled id={id} textAlign={textAlign}>Type something</LabelStyled>}
        </DivStyled>
    );
};
