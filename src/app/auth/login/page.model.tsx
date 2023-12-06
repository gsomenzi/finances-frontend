import React, { useEffect, useState } from 'react';
import { LoginViewProps } from './types';
import { useApi } from '@/providers/ApiProvider';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginViewModel(): LoginViewProps {
    const { authenticate, authenticating, errorMessage } = useAuth();

    return {
        authenticating,
        errorMessage,
        authenticate,
    };
}
