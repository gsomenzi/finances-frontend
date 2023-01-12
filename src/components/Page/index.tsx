import React, { ReactNode } from 'react';
import { Content, Wrapper } from './styles';

type Props = {
    HeaderComponent?: ReactNode;
    children: ReactNode;
};

export function Page({ HeaderComponent, children }: Props) {
    return (
        <Wrapper>
            {HeaderComponent}
            <Content>{children}</Content>
        </Wrapper>
    );
}
