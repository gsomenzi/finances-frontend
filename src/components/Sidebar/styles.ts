import { Box, BoxProps, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import styled from 'styled-components';


export const Wrapper = styled(Box).attrs({
    display: 'flex',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
} as BoxProps)``;

export const Panel = styled(Box).attrs({
    bgcolor: 'white',
    width: 280,
    height: '100vh',
    boxShadow: 2
} as BoxProps)``;

export const Menu = styled(Stack)``;

export const MenuItem = styled(Box).attrs({
    paddingY: 2,
    paddingX: 2,
    boxShadow: 1,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
} as BoxProps)`
border-left: 4px solid transparent;
    transition: all 150ms;
    &:hover {
        border-left: 4px solid ${blue[500]};
    }
`;