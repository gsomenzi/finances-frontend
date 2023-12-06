'use client';

import withViewModel from '@/hooks/withViewModel';

import DashboardView from './page.view';
import DashboardViewModel from './page.model';

export default withViewModel(DashboardView, DashboardViewModel);
