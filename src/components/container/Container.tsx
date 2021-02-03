import React from 'react'
import {ContainerStyled} from './Container.styles'
import { ContainerProps } from './Container.interface'

export const Container: React.FC<ContainerProps> = 
({
    children, 
    ...rest
}) => {
    
    return (
    <ContainerStyled
        {...rest}
    >
        {children}
    </ContainerStyled>
    )
}
