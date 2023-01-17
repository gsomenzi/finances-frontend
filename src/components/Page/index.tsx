import { LinearProgress } from '@mui/material';
import React, { ReactNode } from 'react';
import { Content, Loader, Wrapper } from './styles';

type Props = {
    HeaderComponent?: ReactNode;
    children: ReactNode;
    isLoading?: boolean;
};

export function Page({ isLoading, HeaderComponent, children }: Props) {
    return (
        <Wrapper>
            {isLoading ? <Loader /> : null}
            {HeaderComponent}
            <Content>{children}</Content>
        </Wrapper>
    );
}
