import React, { useEffect, useState } from 'react';
import { TesteViewProps } from './types';

export default function TesteViewModel(): TesteViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
