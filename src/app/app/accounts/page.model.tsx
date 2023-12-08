import React, { useEffect, useState } from 'react';
import { AccountsViewProps } from './types';

export default function AccountsViewModel(): AccountsViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
