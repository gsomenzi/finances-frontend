import React, { useEffect, useState } from 'react';
import { CreditCardsViewProps } from './types';

export default function CreditCardsViewModel(): CreditCardsViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
