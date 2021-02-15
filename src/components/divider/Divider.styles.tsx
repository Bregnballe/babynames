import styled, {css} from "styled-components";
import { DividerProps } from './Divider.interface';

export const DividerStyled = styled.div<DividerProps>`

border-top: 0.167em solid ${props => props.theme.colors.neutral};


/*########### SIZE ###########*/
${props =>

props.componentSize === 'large' ? 
css`
font-size:          2rem;
`
: props.componentSize === 'medium' ?
css`
font-size:          1.5rem;
` 
: //  DEFAULT: props.componentSize === 'small' 
css `
font-size:          1rem;          
`    
}




/*########### FLUID ###########*/
${props =>

props.fluid ? 
    css`
    display: flex;
    width: 100%;
    `
:   css`
    display: inline-flex;
    `

}


/*########### PADDING ###########*/
${props =>


props.padding === 'small' ? 
    css`
    padding: 1em;
    `
: props.padding === 'medium' ? 
    css`
    padding: 1.5em;
    `
: props.padding === 'large' ? 
    css`
    padding: 2em;
    `
: 
    css`
    padding: 0em;
    `
}



/*########### MAX_WIDTH ###########*/
${props =>

props.maxWidth === 'small' ? 
    css`
    max-width: 320px;
    `
: props.maxWidth === 'medium' ? 
    css`
    max-width: 768px;
    `
: props.maxWidth === 'large' ? 
    css`
    max-width: 1024px;
    `
: 
    css`

    `
}

`