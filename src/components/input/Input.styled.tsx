import styled, {css} from "styled-components";
import { InputProps } from './Input.interface';
import { lighten, darken } from 'polished'

export const InputStyled = styled.input<InputProps>`


/*########### DEFAULT ###########*/
display: inline-flex;
border-style: solid;
border-color: ${props => props.theme.colors.neutral};
padding: 1em;
font-weight: 500;
border-radius: ${props => props.theme.borderRadius};
border-width: ${props => props.theme.borderWidth};
text-align: ${props => props.textAlign};
transition: box-shadow 0.2s, border-color 0.2s;
font-size: 1em;

&:focus {
    outline: none; 
    z-index: 1;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.25em ${props => lighten(0.1, props.theme.colors.primary)};
}

&:not(:placeholder-shown) + label {
    top: -0.667em;
    background-color: white;
    color: ${props => darken(0.3, props.theme.colors.neutral)};
}


/*########### FLUID ###########*/
${props =>

props.fluid && 
css`
width:              100%;
`
}



`;


export const LabelStyled = styled.label<InputProps>`
position: absolute;
padding: 0 0.333em;
top: 1.167em;
pointer-events: none;
color: ${props => darken(0.3, props.theme.colors.neutral)};
white-space: nowrap;
transition: top 0.2s, left 0.2s, color 0.2s, padding 0.2s, background-color 0.2s;


/*########### Text-Align ###########*/
${props =>
    props.textAlign === 'right' ? 
    css`
        right: 0.833em;
        text-align: right;
    `
    : props.textAlign === 'center' ?
    css`
        left:  50%;
        text-align: center;
        transform: translateX(-50%);
    ` 
    : 
    css `
        left: 0.833em;
    `    
}




`

export const DivStyled = styled.div<InputProps>`
position: relative;
display: inline-block;

&:focus-within {

    label {
        padding: 0 0.333em;
        top: -0.667em;
        background-color: white;
        color: ${props => props.theme.colors.primary};


    }

}

/*########### SIZE ###########*/
${props =>
    props.componentSize === 'large' ? 
    css`
        font-size: 2rem;
    `
    : props.componentSize === 'medium' ?
    css`
        font-size: 1.5rem;
    ` 
    : 
    css `
        font-size: 1rem;
    `    
}

/*########### FLUID ###########*/
${props =>

props.fluid && 
css`
width:              100%;
`
}


`