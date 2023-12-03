---
to: src/app/<%= h.changeCase.lower(route) %>/types.ts
---

export type <%= h.changeCase.pascal(name) %>ViewProps = {
    loading: boolean;
};

