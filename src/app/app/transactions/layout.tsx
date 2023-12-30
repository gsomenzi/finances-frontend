'use client';

import React from 'react';
import TransactionProvider from './providers/TransactionProvider';

export default function TransactionsLayout({ children }: { children: React.ReactNode }) {
    return <TransactionProvider>{children}</TransactionProvider>;
}
