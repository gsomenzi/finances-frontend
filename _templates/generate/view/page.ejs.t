---
to: src/app/<%= h.changeCase.lower(route) %>/page.tsx
---
'use client';

import withViewModel from '@/hooks/withViewModel';

import <%= h.changeCase.pascal(name) %>View from './page.view';
import <%= h.changeCase.pascal(name) %>ViewModel from './page.model';

export default withViewModel(<%= h.changeCase.pascal(name) %>View, <%= h.changeCase.pascal(name) %>ViewModel);
