---
to: src/app/app/<%= h.changeCase.pascal(route) %>/components/<%= h.changeCase.pascal(name) %>/index.tsx
---

import React from 'react';
import { Wrapper } from './styles';
import { <%= h.changeCase.pascal(name) %>Props } from './types';

export default function <%= h.changeCase.pascal(name) %>(props: <%= h.changeCase.pascal(name) %>Props) {
    const { } = props;
    return (
        <Wrapper><%= h.changeCase.pascal(name) %></Wrapper>
    );
}
