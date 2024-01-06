import React, { useEffect, useState } from 'react';
import { DashboardViewProps } from './types';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import AnalyticModel from '@/models/AnalyticModel';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

export default function DashboardViewModel(): DashboardViewProps {
    const analyticModel = new AnalyticModel();
    const { logout } = useAuth();
    const router = useRouter();
    const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');

    const { data: expenseByCategoryData, isLoading: gettingExpenseByCategory } = useQuery(
        ['analytic', 'expenseByCategory', startOfMonth, endOfMonth],
        () => analyticModel.getExpenseByCategory(startOfMonth, endOfMonth),
    );

    const { data: expenseByTagData, isLoading: gettingExpenseByTag } = useQuery(
        ['analytic', 'expenseByTag', startOfMonth, endOfMonth],
        () => analyticModel.getExpenseByTag(startOfMonth, endOfMonth),
    );

    const { data: expenseByDateData, isLoading: gettingExpenseByDate } = useQuery(
        ['analytic', 'expenseByDate', startOfMonth, endOfMonth],
        () => analyticModel.getExpenseByDate(startOfMonth, endOfMonth),
    );

    function handleLogout() {
        logout();
        router.push('/auth/login');
    }

    return {
        expenseByCategoryData,
        gettingExpenseByCategory,
        expenseByTagData,
        gettingExpenseByTag,
        expenseByDateData,
        gettingExpenseByDate,
        handleLogout,
    };
}
