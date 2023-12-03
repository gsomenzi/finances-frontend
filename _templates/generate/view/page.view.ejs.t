---
to: src/app/<%= h.changeCase.lower(route) %>/page.view.tsx
---

import React from 'react';
import { <%= h.changeCase.pascal(name) %>ViewProps } from './types';

export default function <%= h.changeCase.pascal(name) %>View(props: <%= h.changeCase.pascal(name) %>ViewProps) {
    return (
        <div>
           <span><%= h.changeCase.pascal(name) %>View</span>
        </div>
    );
}
