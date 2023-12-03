---
to: src/app/<%= h.changeCase.lower(route) %>/page.model.tsx
---

import React, { useEffect, useState } from 'react';
import { <%= h.changeCase.pascal(name) %>ViewProps } from './types';

export default function <%= h.changeCase.pascal(name) %>ViewModel(): <%= h.changeCase.pascal(name) %>ViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
