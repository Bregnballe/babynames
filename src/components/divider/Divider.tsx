import React from 'react'
import {DividerStyled} from './Divider.styles'
import {DividerProps} from './Divider.interface'

export const Divider: React.FC<DividerProps> = (props, { children }) => {
    return (
        <DividerStyled {...props}>
            {children}
        </DividerStyled>
    );
};
