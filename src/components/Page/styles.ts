import { Box, BoxProps, LinearProgress, LinearProgressProps } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled(Box).attrs({
    bgcolor: 'white'
} as BoxProps)``;

export const Content = styled(Box).attrs({
    padding: 2,
    textAlign: 'left'
} as BoxProps)``;

export const Loader = styled(LinearProgress).attrs({
    color: 'secondary',
    position: 'absolute',
    width: '100%'
} as LinearProgressProps)``;