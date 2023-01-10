import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthWrapper } from './styles';

export default function AuthTemplate() {
    return (
        <AuthWrapper>
            <Outlet />
        </AuthWrapper>
    );
}
