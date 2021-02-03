import styled, {css} from "styled-components";
import { ContainerProps } from './Container.interface';

export const ContainerStyled = styled.div<ContainerProps>`

flex-basis: 100%;

/*########### FLUID ###########*/
${props =>

props.fluid ? 
    css`
    display: flex;
    `
:   css`
    display: inline-flex;
    `

}

/*########### LAYOUT ###########*/
${props =>

props.layout === 'column' ? 
    css`
    flex-direction: column;
    flex-wrap: wrap;
    `
:   css`
    flex-direction: row;
    flex-wrap: wrap;
    `

}

/*########### PADDING ###########*/
${props =>

props.padding === 'small' ? 
    css`
    padding: 1em
    `
: props.padding === 'medium' ? 
    css`
    padding: 1.5em
    `
: props.padding === 'large' ? 
    css`
    padding: 2em
    `
: 
    css`
    padding: 0em
    `
}

`


