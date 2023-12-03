import React, { useEffect, useState } from 'react';
import { LoginViewProps } from './types';

export default function LoginViewModel(): LoginViewProps {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return {
        loading,
    };
}
