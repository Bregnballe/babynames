import styled, {css} from "styled-components";
import { space, background } from 'styled-system'
import { ContainerProps } from './Container.interface';

export const ContainerStyled = styled.div<ContainerProps>`

/*########### STYLED SYSTEM ###########*/
${space}
${background}


flex-basis: 100%;


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



/*########### FIXED ###########*/
${props =>

props.fixed === 'right' ? 
    css`
    position: fixed;
    right: 0;
    `
: props.fixed === 'left' ? 
    css`
    position: fixed;
    left: 0;
    ` 
: props.fixed === 'bottom' ? 
    css`
    position: fixed;
    bottom: 0;
    `   
: props.fixed === 'top' ?
    css`
    position: fixed;
    top: 0;
    ` 
:   css`

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


