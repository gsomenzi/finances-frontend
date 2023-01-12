import { Box, BoxProps } from '@mui/material';
import styled from 'styled-components';

export const AuthWrapper = styled(Box).attrs({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
} as BoxProps)``;

export const DefaultWrapper = styled(Box).attrs({
    width: '100vw',
    height: '100vh',
} as BoxProps)`
    padding-left: 280px;
    transition: all 150ms;
`;