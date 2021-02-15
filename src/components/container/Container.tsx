import React from 'react'
import {ContainerStyled} from './Container.styles'
import { ContainerProps } from './Container.interface'

export const Container: React.FC<ContainerProps> = React.forwardRef(
    ({ children, ...rest }, ref) => {
        return (
            <ContainerStyled red={true} ref={ref} {...rest}>
                {children}
            </ContainerStyled>
        );
    }
);
