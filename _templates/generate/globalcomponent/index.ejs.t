---
to: src/components/<%= h.changeCase.pascal(name) %>/index.tsx
---

import React from 'react';
import { Wrapper } from './styles';
import { <%= h.changeCase.pascal(name) %>Props } from './types';
import { Alert } from 'antd';

export default function <%= h.changeCase.pascal(name) %>(props: <%= h.changeCase.pascal(name) %>AlertProps) {
    const { } = props;
    return (
        <Wrapper><%= h.changeCase.pascal(name) %></Wrapper>
    );
}
