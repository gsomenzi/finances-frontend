import React, { useEffect, useState } from 'react';
import { RegisterViewProps } from './types';
import { useAuth } from '@/providers/AuthProvider';

export default function RegisterViewModel(): RegisterViewProps {
    const { register, registering, errorMessage } = useAuth();

    return {
        registering,
        errorMessage,
        register,
    };
}
