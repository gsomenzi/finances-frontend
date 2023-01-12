import Sidebar from 'components/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DefaultWrapper } from './styles';

export default function DefaultTemplate() {
    return (
        <DefaultWrapper>
            <Sidebar />
            <Outlet />
        </DefaultWrapper>
    );
}
