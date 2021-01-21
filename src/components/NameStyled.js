import styled from "styled-components"

export const NameStyled = styled.li`
    background-color: ${props => props.red ? "red" : "white"};
    list-style: none;
    padding: 8px 16px;
    border-color: grey;
    border-style: solid;
    border-width: 1px 1px 0px 1px;
`