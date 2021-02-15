import React from 'react'
import {ListProps} from './List.interface'
import { ListStyled } from './List.styles'

export const List: React.FC<ListProps> = ({ children, ...rest }) => {
    return <ListStyled {...rest}>{children}</ListStyled>;
};  