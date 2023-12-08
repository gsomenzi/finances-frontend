import React, { useEffect, useState } from 'react';
import { TransactionsViewProps } from './types';

export default function TransactionsViewModel(): TransactionsViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
