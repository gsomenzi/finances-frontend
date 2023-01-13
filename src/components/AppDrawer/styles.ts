import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { grey } from '@mui/material/colors'
import styled from 'styled-components';

export const Wrapper = styled(Box).attrs({
} as BoxProps)`
    width: 540px;
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const DrawerHeader = styled(Box).attrs({
    paddingY: 1,
    paddingX: 2,
    borderBottom: 1,
    borderColor: grey[300],
    display: 'flex',
    alignItems: 'center'
} as BoxProps)``

export const DrawerContent = styled(Box).attrs({
    paddingY: 2,
    paddingX: 2,
    flexGrow: 1
} as BoxProps)``

export const DrawerFooter = styled(Box).attrs({
    paddingY: 2,
    paddingX: 2,
    borderTop: 1,
    borderColor: grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
} as BoxProps)``

export const DrawerTitle = styled(Typography).attrs({
    variant: 'h4',
    marginBottom: 0,
    flexGrow: 1
} as TypographyProps)``;

export const CloseBtnWrapper = styled.a`
    cursor: pointer;
    color: ${grey[500]}
`