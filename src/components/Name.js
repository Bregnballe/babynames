import React from 'react'
import { NameStyled } from "./NameStyled"

export const Name = React.forwardRef(({children}, ref) => {
    return ref ? <NameStyled red={true} ref={ref}>{children}</NameStyled> : <NameStyled>{children}</NameStyled>
});