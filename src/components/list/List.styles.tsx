import styled from "styled-components";
import { ListProps } from './List.interface';
import {ContainerStyled } from '../container/Container.styles';

export const ListStyled = styled(ContainerStyled)<ListProps>`

    border: 2px solid ${props => props.theme.colors.neutral};

    & * li {
        border-radius: 0px;
    }

    & * li:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    & * li:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    & > li:not(:first-child) {
        border-top: 2px solid${props => props.theme.colors.neutral};
    }

    & li:not(:first-child):not(:last-child) {
        border-radius: 0;
    }
`;
