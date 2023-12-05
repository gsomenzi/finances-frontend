import React, { useEffect, useState } from 'react';
import { LoginViewProps } from './types';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginViewModel(): LoginViewProps {
    const { authenticate, authenticating, errorMessage } = useAuth();

    return {
        authenticating,
        errorMessage,
        authenticate,
    };
}
