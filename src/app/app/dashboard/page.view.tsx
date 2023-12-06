'use client';

import React from 'react';
import { DashboardViewProps } from './types';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from 'antd';

export default function DashboardView(props: DashboardViewProps) {
    return (
        <div>
            <Button onClick={props.handleLogout}>Logout</Button>
        </div>
    );
}
